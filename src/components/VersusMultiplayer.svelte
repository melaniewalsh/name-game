<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { base } from "$app/paths";
	import { database } from "$lib/firebase";
	import { ref, set, onValue, push, update, off } from "firebase/database";
	import Versus from "$components/Versus.svelte";

	const { id = "multiplayer-versus-game" } = $props();

	// Game state
	let gameMode = $state("menu"); // 'menu' | 'host' | 'player'
	let roomCode = $state("");
	let roomCodeInput = $state("");
	let playerName = $state("");
	let playerNameInput = $state("");
	let gameState = $state(null);
	let players = $state([]);
	let roomRef = null;
	let playersRef = null;
	let playerId = $state("");
	let hostChartElement = $state(null);
	let playerChartElement = $state(null);
	let playerLastGuessResult = $state(null); // 'correct' | 'incorrect' | null
	let lastSubmittedGuess = $state(""); // Track last submitted guess to prevent duplicates

	// Game configuration
	let maxAttempts = $state(3);
	let correctPoints = $state(1);
	let incorrectPoints = $state(0);

	// Sorted players list (derived from players)
	let sortedPlayers = $derived(
		players.slice().sort((a, b) => {
			// Keep host at the top
			if (a.id === gameState?.host) return -1;
			if (b.id === gameState?.host) return 1;
			// Sort others by score (descending)
			return (b.score || 0) - (a.score || 0);
		})
	);

	// Generate a random 6-character room code
	function generateRoomCode() {
		return Math.random().toString(36).substring(2, 8).toUpperCase();
	}

	// Create a new game room
	async function createRoom() {
		if (!browser || !database) {
			alert("Firebase is not initialized. Please refresh the page.");
			return;
		}
		if (!playerNameInput.trim()) {
			alert("Please enter your name");
			return;
		}

		playerName = playerNameInput.trim();
		roomCode = generateRoomCode();
		playerId = push(ref(database)).key;

		// Create room in Firebase
		roomRef = ref(database, `versus-rooms/${roomCode}`);
		await set(roomRef, {
			host: playerId,
			hostName: playerName,
			name1: "",
			name2: "",
			isHidden: false,
			createdAt: Date.now(),
			gameStarted: false,
			maxAttempts: maxAttempts,
			correctPoints: correctPoints,
			incorrectPoints: incorrectPoints
		});

		// Add host as first player
		const playerRef = ref(
			database,
			`versus-rooms/${roomCode}/players/${playerId}`
		);
		await set(playerRef, {
			name: playerName,
			score: 0,
			lastGuess1: "",
			lastGuess2: "",
			isCorrect: false,
			attemptCount: 0,
			joinedAt: Date.now()
		});

		gameMode = "host";
		updateURL();
		listenToRoom();
	}

	// Join an existing room
	async function joinRoom() {
		if (!browser || !database) {
			alert("Firebase is not initialized. Please refresh the page.");
			return;
		}
		if (!playerNameInput.trim()) {
			alert("Please enter your name");
			return;
		}
		if (!roomCodeInput.trim()) {
			alert("Please enter a room code");
			return;
		}

		playerName = playerNameInput.trim();
		roomCode = roomCodeInput.trim().toUpperCase();
		playerId = push(ref(database)).key;

		// Check if room exists
		roomRef = ref(database, `versus-rooms/${roomCode}`);

		// Add player to room
		const playerRef = ref(
			database,
			`versus-rooms/${roomCode}/players/${playerId}`
		);
		await set(playerRef, {
			name: playerName,
			score: 0,
			lastGuess1: "",
			lastGuess2: "",
			isCorrect: false,
			attemptCount: 0,
			joinedAt: Date.now()
		});

		gameMode = "player";
		updateURL();
		listenToRoom();
	}

	// Listen to room updates
	function listenToRoom() {
		// Listen to game state
		roomRef = ref(database, `versus-rooms/${roomCode}`);
		onValue(roomRef, (snapshot) => {
			if (snapshot.exists()) {
				gameState = snapshot.val();
			}
		});

		// Listen to players
		playersRef = ref(database, `versus-rooms/${roomCode}/players`);
		onValue(playersRef, (snapshot) => {
			if (snapshot.exists()) {
				const playersData = snapshot.val();
				players = Object.entries(playersData).map(([id, data]) => ({
					id,
					...data
				}));
			}
		});
	}

	// Host controls
	async function updateGameState(updates) {
		if (gameMode === "host" && roomRef) {
			await update(roomRef, updates);
		}
	}

	// Track the last known names before hiding
	let lastKnownName1 = $state("");
	let lastKnownName2 = $state("");
	let lastIsHidden = $state(false);

	// Reset all players' attempt counts for a new round
	async function resetAllPlayersAttempts() {
		if (gameMode === "host" && players.length > 0) {
			console.log(
				"[VersusMultiplayer] Resetting all players attempt counts for",
				players.length,
				"players"
			);
			// Update each player's attempt count and isCorrect flag
			const updatePromises = players.map((player) => {
				const playerRef = ref(
					database,
					`versus-rooms/${roomCode}/players/${player.id}`
				);
				console.log(
					"[VersusMultiplayer] Resetting attemptCount and isCorrect for player:",
					player.name
				);
				return update(playerRef, {
					attemptCount: 0,
					isCorrect: false
				});
			});
			await Promise.all(updatePromises);
			console.log("[VersusMultiplayer] All attempt counts reset");
		}
	}

	// Monitor host chart for state changes
	$effect(() => {
		if (gameMode === "host" && hostChartElement) {
			// Use MutationObserver to detect when hide/reveal happens
			const observer = new MutationObserver(() => {
				// Check if the chart is in hidden mode by looking for the draggable names
				const draggableNames =
					hostChartElement.querySelector(".draggable-names");
				const isHidden = !!draggableNames;

				console.log(
					"[VersusMultiplayer] MutationObserver fired - isHidden:",
					isHidden
				);

				// Try to get the current names from multiple sources
				// 1. From the .possible-names element (when hidden)
				const possibleNames = hostChartElement.querySelector(".possible-names");
				if (possibleNames) {
					const text = possibleNames.textContent.trim();
					const match = text.match(/(.+)\s+vs\.\s+(.+)/);
					if (match) {
						lastKnownName1 = match[1].trim();
						lastKnownName2 = match[2].trim();
						console.log(
							"[VersusMultiplayer] Found names from .possible-names:",
							lastKnownName1,
							lastKnownName2
						);
					}
				}

				// 2. From the .names-revealed element (when not hidden)
				if (!isHidden) {
					const namesRevealed =
						hostChartElement.querySelector(".names-revealed");
					if (namesRevealed) {
						const spans = namesRevealed.querySelectorAll("span");
						if (spans.length >= 3) {
							lastKnownName1 = spans[0].textContent.trim();
							lastKnownName2 = spans[2].textContent.trim();
							console.log(
								"[VersusMultiplayer] Found names from .names-revealed:",
								lastKnownName1,
								lastKnownName2
							);
						}
					}
				}

				// Update Firebase if state changed
				if (
					gameState &&
					(gameState.isHidden !== isHidden ||
						gameState.name1 !== lastKnownName1 ||
						gameState.name2 !== lastKnownName2)
				) {
					console.log("[VersusMultiplayer] Updating Firebase with:", {
						isHidden,
						name1: lastKnownName1,
						name2: lastKnownName2
					});

					// If transitioning from revealed to hidden (starting new round), reset attempts
					if (!lastIsHidden && isHidden) {
						console.log(
							"[VersusMultiplayer] New round starting, resetting attempts"
						);
						// Wait for attempts to be reset before updating game state
						resetAllPlayersAttempts().then(() => {
							updateGameState({
								isHidden,
								name1: lastKnownName1,
								name2: lastKnownName2
							});
						});
					} else {
						updateGameState({
							isHidden,
							name1: lastKnownName1,
							name2: lastKnownName2
						});
					}
					lastIsHidden = isHidden;
				} else {
					console.log(
						"[VersusMultiplayer] No Firebase update needed. Current state:",
						{
							isHidden,
							name1: lastKnownName1,
							name2: lastKnownName2,
							gameState
						}
					);
				}
			});

			observer.observe(hostChartElement, {
				childList: true,
				subtree: true,
				characterData: true
			});

			return () => observer.disconnect();
		}
	});

	// Handle player guess
	async function submitPlayerGuess(guess1, guess2) {
		if (!gameState || !gameState.isHidden || !guess1.trim() || !guess2.trim())
			return;

		const currentPlayer = players.find((p) => p.id === playerId);
		const currentAttemptCount = currentPlayer?.attemptCount || 0;
		const maxAttemptsAllowed = gameState.maxAttempts ?? 3;

		console.log(
			"[Attempt Check] Current attempts:",
			currentAttemptCount,
			"Max allowed:",
			maxAttemptsAllowed
		);

		// Check if player has exceeded max attempts
		if (currentAttemptCount >= maxAttemptsAllowed) {
			console.log("Max attempts reached - blocking submission");
			return;
		}

		const g1 = guess1.toLowerCase().trim();
		const g2 = guess2.toLowerCase().trim();

		// Create a unique key for this guess to prevent rapid duplicate submissions
		const guessKey = `${g1}|${g2}`;
		if (guessKey === lastSubmittedGuess) {
			console.log("Duplicate guess detected (same as last), skipping");
			return;
		}
		console.log("[Submitting Guess]", g1, "and", g2);
		lastSubmittedGuess = guessKey;

		// Clear the duplicate check after a short delay to allow retrying the same guess later
		setTimeout(() => {
			if (lastSubmittedGuess === guessKey) {
				lastSubmittedGuess = "";
			}
		}, 1000);

		const name1Lower = gameState.name1.toLowerCase().trim();
		const name2Lower = gameState.name2.toLowerCase().trim();

		// Order matters - must match name1 to position 1 and name2 to position 2
		const correct1 = g1 === name1Lower;
		const correct2 = g2 === name2Lower;
		const isCorrect = correct1 && correct2;

		console.log("Guess 1:", g1, "Guess 2:", g2);
		console.log("Name 1:", name1Lower, "Name 2:", name2Lower);
		console.log("Correct:", isCorrect);

		const currentScore = currentPlayer?.score || 0;

		// Use nullish coalescing to properly handle 0 and negative values
		const correctPts = gameState.correctPoints ?? 1;
		const incorrectPts = gameState.incorrectPoints ?? 0;
		const pointsToAdd = isCorrect ? correctPts : incorrectPts;
		const newScore = currentScore + pointsToAdd;
		const newAttemptCount = currentAttemptCount + 1;

		console.log(
			"GameState correctPoints:",
			gameState.correctPoints,
			"incorrectPoints:",
			gameState.incorrectPoints
		);
		console.log("Using correctPts:", correctPts, "incorrectPts:", incorrectPts);
		console.log(
			"Current score:",
			currentScore,
			"Points to add:",
			pointsToAdd,
			"New score:",
			newScore
		);
		console.log(
			"Attempt count:",
			currentAttemptCount,
			"New attempt count:",
			newAttemptCount
		);

		const playerRef = ref(
			database,
			`versus-rooms/${roomCode}/players/${playerId}`
		);
		await update(playerRef, {
			lastGuess1: guess1,
			lastGuess2: guess2,
			isCorrect,
			score: newScore,
			attemptCount: newAttemptCount,
			guessedAt: Date.now()
		});

		playerLastGuessResult = isCorrect ? "correct" : "incorrect";

		// Clear the result after 2 seconds
		setTimeout(() => {
			playerLastGuessResult = null;
		}, 2000);
	}

	// Monitor player chart for guesses via the built-in Versus component
	$effect(() => {
		if (gameMode === "player" && playerChartElement && gameState?.isHidden) {
			// Listen for drag-and-drop completion (auto-submit)
			const dropZones = playerChartElement.querySelectorAll(".chart-drop-zone");

			// Watch for changes in drop zones to detect when both names are dropped
			const observer = new MutationObserver(() => {
				const dropZone1 = playerChartElement.querySelector(
					".chart-drop-zone:nth-of-type(1) .drop-label"
				);
				const dropZone2 = playerChartElement.querySelector(
					".chart-drop-zone:nth-of-type(2) .drop-label"
				);

				if (dropZone1 && dropZone2) {
					const guess1 = dropZone1.textContent.trim();
					const guess2 = dropZone2.textContent.trim();

					// Check if both zones have names (not just arrows)
					if (guess1 && guess2 && guess1 !== "↓" && guess2 !== "↓") {
						// Submit after a short delay to allow the auto-submit to process
						setTimeout(() => {
							submitPlayerGuess(guess1, guess2);
						}, 200);
					}
				}
			});

			observer.observe(playerChartElement, {
				childList: true,
				subtree: true,
				characterData: true
			});

			return () => observer.disconnect();
		}
	});

	// Copy room code to clipboard
	let copyButtonText = $state("Copy");
	async function copyRoomCode() {
		try {
			await navigator.clipboard.writeText(roomCode);
			copyButtonText = "Copied!";
			setTimeout(() => {
				copyButtonText = "Copy";
			}, 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	}

	// Update URL with room code
	function updateURL() {
		if (browser && roomCode) {
			const url = new URL(window.location.href);
			url.searchParams.set("room", roomCode);
			window.history.pushState({}, "", url);
		}
	}

	// Get shareable link
	function getShareableLink() {
		if (browser && roomCode) {
			const url = new URL(window.location.href);
			url.searchParams.set("room", roomCode);
			return url.toString();
		}
		return "";
	}

	// Copy shareable link to clipboard
	let copyLinkText = $state("Copy Link");
	async function copyShareableLink() {
		try {
			const link = getShareableLink();
			await navigator.clipboard.writeText(link);
			copyLinkText = "Link Copied!";
			setTimeout(() => {
				copyLinkText = "Copy Link";
			}, 2000);
		} catch (err) {
			console.error("Failed to copy link:", err);
		}
	}

	// Leave room
	function leaveRoom() {
		if (roomRef) off(roomRef);
		if (playersRef) off(playersRef);
		gameMode = "menu";
		roomCode = "";
		roomCodeInput = "";
		gameState = null;
		players = [];
		copyButtonText = "Copy";
		copyLinkText = "Copy Link";
		lastSubmittedGuess = "";

		// Clear URL params
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.delete("room");
			window.history.pushState({}, "", url);
		}
	}

	// Check for room code in URL on mount
	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			const urlRoomCode = urlParams.get("room");
			if (urlRoomCode) {
				roomCodeInput = urlRoomCode.toUpperCase();
			}
		}
	});

	onDestroy(() => {
		if (roomRef) off(roomRef);
		if (playersRef) off(playersRef);
	});
</script>

{#if gameMode === "menu"}
	<div class="multiplayer-menu">
		<h2>Which Name Is Which? — Multiplayer Game</h2>

		<div class="menu-section">
			<h3>Enter Your Name</h3>
			<input
				type="text"
				bind:value={playerNameInput}
				placeholder="Your name"
				class="name-input"
			/>
		</div>

		<div class="menu-section">
			<h3>Join a Game</h3>
			<input
				type="text"
				bind:value={roomCodeInput}
				placeholder="Enter room code"
				class="room-code-input"
			/>
			<button class="join-btn" onclick={joinRoom}>Join Game</button>
		</div>

		<div class="menu-section">
			<h3>Create a New Game</h3>
			<button class="create-btn" onclick={createRoom}>Create New Game</button>
		</div>

		<div class="multiplayer-footer">
			<p><a href="{base}/" target="_blank">What's That Baby Name?</a> by Melanie Walsh. <a href="{base}/#origin-story" target="_blank">Read the backstory.</a></p>
		</div>
	</div>
{:else if gameMode === "host"}
	<div class="game-container">
		<div class="player-identity">
			<p>You are <strong>{playerName}</strong> (Host)</p>
		</div>
		<div class="game-header">
			<h2>
				Room Code: <span class="room-code">{roomCode}</span>
				<button
					class="copy-icon"
					onclick={copyRoomCode}
					title={copyButtonText === "Copied!" ? "Copied!" : "Copy to clipboard"}
				>
					{#if copyButtonText === "Copied!"}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M5 12l5 5l10 -10"></path>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<rect x="8" y="8" width="12" height="12" rx="2"></rect>
							<path
								d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
							></path>
						</svg>
					{/if}
				</button>
			</h2>
			<div class="header-actions">
				<button class="share-link-btn" onclick={copyShareableLink}
					>{copyLinkText}</button
				>
				<button class="leave-btn" onclick={leaveRoom}>Leave Room</button>
			</div>
		</div>

		<div class="players-panel">
			<h3>Players ({players.length})</h3>
			<ul class="players-list">
				{#each sortedPlayers as player}
					<li class="player-item">
						<span class="player-name">{player.name}</span>
						{#if player.id === gameState?.host}
							<span class="host-badge">Host</span>
						{:else}
							<span class="player-score">{player.score}</span>
							{#if player.isCorrect}
								<span class="correct-indicator">✓</span>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<div class="game-settings">
			<h3>Game Settings</h3>
			<div class="settings-row">
				<label>
					<span>Max Attempts:</span>
					<input
						type="number"
						min="1"
						max="10"
						bind:value={maxAttempts}
						onchange={() => updateGameState({ maxAttempts })}
						class="settings-input"
					/>
				</label>
				<label>
					<span>Points for Correct:</span>
					<input
						type="number"
						min="0"
						max="10"
						bind:value={correctPoints}
						onchange={() => updateGameState({ correctPoints })}
						class="settings-input"
					/>
				</label>
				<label>
					<span>Points for Incorrect:</span>
					<input
						type="number"
						min="-5"
						max="5"
						bind:value={incorrectPoints}
						onchange={() => updateGameState({ incorrectPoints })}
						class="settings-input"
					/>
				</label>
			</div>
		</div>

		<div class="game-area" bind:this={hostChartElement}>
			<Versus
				defaultName1="Charlotte"
				defaultName2="Isabella"
				startHidden={false}
				showControls={true}
				startYear={1920}
			/>
		</div>

		<div class="host-controls">
			<p class="hint">
				Use the chart controls above to choose two names. When ready, click "Set
				Names & Start" to begin the round.
			</p>
		</div>

		<div class="multiplayer-footer">
			<p><a href="{base}/" target="_blank">What's That Baby Name?</a> by Melanie Walsh. <a href="{base}/#origin-story" target="_blank">Read the backstory.</a></p>
		</div>
	</div>
{:else if gameMode === "player"}
	<div class="game-container">
		<div class="player-identity">
			<p>You are <strong>{playerName}</strong> (Player)</p>
		</div>
		<div class="game-header">
			<h2>
				Room Code: <span class="room-code">{roomCode}</span>
				<button
					class="copy-icon"
					onclick={copyRoomCode}
					title={copyButtonText === "Copied!" ? "Copied!" : "Copy to clipboard"}
				>
					{#if copyButtonText === "Copied!"}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M5 12l5 5l10 -10"></path>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<rect x="8" y="8" width="12" height="12" rx="2"></rect>
							<path
								d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
							></path>
						</svg>
					{/if}
				</button>
			</h2>
			<div class="header-actions">
				<button class="share-link-btn" onclick={copyShareableLink}
					>{copyLinkText}</button
				>
				<button class="leave-btn" onclick={leaveRoom}>Leave Room</button>
			</div>
		</div>

		<div class="players-panel">
			<h3>Players ({players.length})</h3>
			<ul class="players-list">
				{#each sortedPlayers as player}
					<li class="player-item">
						<span class="player-name">{player.name}</span>
						{#if player.id === gameState?.host}
							<span class="host-badge">Host</span>
						{:else}
							<span class="player-score">{player.score}</span>
							{#if player.isCorrect}
								<span class="correct-indicator">✓</span>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<div class="game-area" bind:this={playerChartElement}>
			{#if gameState && gameState.name1 && gameState.name2 && gameState.isHidden}
				{@const currentPlayer = players.find((p) => p.id === playerId)}

				{#if currentPlayer}
					{@const attemptsUsed = currentPlayer.attemptCount || 0}
					{@const maxAttemptsAllowed = gameState.maxAttempts ?? 1}
					{@const hasAttemptsRemaining = attemptsUsed < maxAttemptsAllowed}

					{@const playerGotItRight = currentPlayer.isCorrect}
					{@const isGameOver = !hasAttemptsRemaining || playerGotItRight}

					<div class="chart-container" class:disabled={isGameOver}>
						{#key `${gameState.name1}-${gameState.name2}-${gameState.isHidden}`}
							<Versus
								defaultName1={gameState.name1}
								defaultName2={gameState.name2}
								startHidden={gameState.isHidden}
								showControls={false}
								startYear={1920}
							/>
						{/key}
						{#if isGameOver}
							<div class="attempts-overlay">
								<div class="overlay-message">
									{#if playerGotItRight}
										<h3 style="color: #4caf50;">✓ Correct!</h3>
										<p>You got it right!</p>
										<p>Waiting for the host to start a new round...</p>
									{:else}
										<h3>No Attempts Remaining</h3>
										<p>
											You've used all {maxAttemptsAllowed} attempts for this round
										</p>
										<p>Waiting for the host to start a new round...</p>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<div class="waiting-message">
						<h3>Loading...</h3>
						<p>Connecting to game...</p>
					</div>
				{/if}
			{:else}
				<div class="waiting-message">
					<h3>Game Setup in Progress...</h3>
					<p>Waiting for the host to start the game</p>
				</div>
			{/if}
		</div>

		<div class="player-status">
			{#if gameState}
				{@const currentPlayer = players.find((p) => p.id === playerId)}
				{@const attemptsUsed = currentPlayer?.attemptCount || 0}
				{@const maxAttemptsAllowed = gameState.maxAttempts ?? 3}
				{@const attemptsRemaining = maxAttemptsAllowed - attemptsUsed}

				<p>Your score: {currentPlayer?.score || 0}</p>
				<p>Attempts remaining: {attemptsRemaining}/{maxAttemptsAllowed}</p>

				{#if attemptsRemaining <= 0}
					<p class="max-attempts-reached">No attempts remaining</p>
				{/if}

				{#if playerLastGuessResult === "correct"}
					<p class="result-correct">✓ Correct!</p>
				{:else if playerLastGuessResult === "incorrect"}
					<p class="result-incorrect">✗ Try again!</p>
				{/if}
			{/if}
		</div>

		<div class="multiplayer-footer">
			<p><a href="{base}/" target="_blank">What's That Baby Name?</a> by Melanie Walsh. <a href="{base}/#origin-story" target="_blank">Read the backstory.</a></p>
		</div>
	</div>
{/if}

<style>
	.multiplayer-menu {
		max-width: 600px;
		margin: 40px auto;
		padding: 30px;
	}

	.multiplayer-menu h2 {
		text-align: center;
		color: #6b46c1;
		margin-bottom: 30px;
		font-size: 32px;
		font-weight: 700;
	}

	.menu-section {
		margin-bottom: 30px;
	}

	.menu-section h3 {
		margin-bottom: 12px;
		color: #333;
		font-size: 20px;
		font-weight: 600;
	}

	.name-input,
	.room-code-input {
		width: 100%;
		padding: 12px;
		font-size: 16px;
		border: 2px solid #ddd;
		border-radius: 6px;
		margin-bottom: 12px;
		font-family: "Baloo Bhai 2", sans-serif;
	}

	.name-input:focus,
	.room-code-input:focus {
		outline: none;
		border-color: #6b46c1;
	}

	.create-btn,
	.join-btn {
		width: 100%;
		padding: 12px 20px;
		font-size: 16px;
		font-weight: 600;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		font-family: "Baloo Bhai 2", sans-serif;
	}

	.create-btn {
		background: #6b46c1;
	}

	.create-btn:hover {
		background: #5a3a9f;
	}

	.join-btn {
		background: #4caf50;
	}

	.join-btn:hover {
		background: #45a049;
	}

	.game-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 20px;
	}

	.player-identity {
		text-align: center;
		padding: 12px 20px;
		background: #f0f0f0;
		border-bottom: 2px solid #ddd;
	}

	.player-identity p {
		margin: 0;
		font-size: 16px;
		color: #333;
	}

	.player-identity strong {
		color: #6b46c1;
	}

	.game-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		padding: 15px;
		background: #f5f5f5;
		border-radius: 8px;
	}

	.game-header h2 {
		margin: 0;
		font-size: 20px;
		color: #333;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.room-code {
		color: #6b46c1;
		font-weight: 700;
		font-size: 24px;
		letter-spacing: 2px;
	}

	.copy-icon {
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		display: inline-flex;
		align-items: center;
		color: #6b46c1;
		transition: all 0.2s;
	}

	.copy-icon:hover {
		color: #5a3a9f;
	}

	.header-actions {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.share-link-btn {
		padding: 8px 16px;
		font-size: 14px;
		background: #6b46c1;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-family: "Baloo Bhai 2", sans-serif;
		transition: all 0.2s;
	}

	.share-link-btn:hover {
		background: #5a3a9f;
	}

	.leave-btn {
		padding: 8px 16px;
		font-size: 14px;
		background: #999;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-family: "Baloo Bhai 2", sans-serif;
	}

	.leave-btn:hover {
		background: #777;
	}

	.players-panel {
		background: white;
		border: 2px solid #ddd;
		border-radius: 8px;
		padding: 15px;
		margin-bottom: 15px;
	}

	.game-settings {
		background: white;
		border: 2px solid #ddd;
		border-radius: 8px;
		padding: 15px;
		margin-bottom: 20px;
	}

	.game-settings h3 {
		margin: 0 0 12px 0;
		font-size: 16px;
		color: #6b46c1;
	}

	.settings-row {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
	}

	.settings-row label {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
		min-width: 120px;
	}

	.settings-row label span {
		font-size: 13px;
		font-weight: 600;
		color: #333;
	}

	.settings-input {
		padding: 8px;
		font-size: 14px;
		border: 2px solid #ddd;
		border-radius: 4px;
		font-family: "Baloo Bhai 2", sans-serif;
		width: 100%;
	}

	.settings-input:focus {
		outline: none;
		border-color: #6b46c1;
	}

	.players-panel h3 {
		margin: 0 0 10px 0;
		font-size: 16px;
		color: #6b46c1;
	}

	.players-list {
		list-style: none;
		padding: 0;
		margin: 0;
		max-height: 200px;
		overflow-y: auto;
	}

	.players-list::-webkit-scrollbar {
		width: 8px;
	}

	.players-list::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 4px;
	}

	.players-list::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 4px;
	}

	.players-list::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	.player-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 6px 10px;
		background: #f5f5f5;
		border-radius: 4px;
		margin-bottom: 4px;
	}

	.player-name {
		font-weight: 600;
		color: #333;
		font-size: 14px;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.host-badge {
		background: #6b46c1;
		color: white;
		padding: 2px 8px;
		border-radius: 10px;
		font-size: 11px;
		font-weight: 600;
	}

	.player-score {
		color: #6b46c1;
		font-weight: 600;
		font-size: 14px;
		min-width: 20px;
		text-align: right;
	}

	.correct-indicator {
		color: #4caf50;
		font-weight: 600;
		font-size: 16px;
	}

	.guess-display {
		color: #999;
		font-size: 13px;
		font-style: italic;
	}

	.game-area {
		margin-bottom: 20px;
	}

	.chart-container {
		position: relative;
	}

	.chart-container.disabled {
		pointer-events: none;
	}

	.chart-container.disabled > :not(.attempts-overlay) {
		opacity: 0.6;
	}

	.attempts-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		pointer-events: none;
	}

	.overlay-message {
		text-align: center;
		padding: 30px 40px;
		background: white;
		border: 3px solid #6b46c1;
		border-radius: 12px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		pointer-events: auto;
	}

	.overlay-message h3 {
		color: #ff6b6b;
		margin: 0 0 12px 0;
		font-size: 20px;
	}

	.overlay-message p {
		color: #666;
		margin: 8px 0;
		font-size: 14px;
	}

	.host-controls {
		background: #f0e7ff;
		padding: 15px;
		border-radius: 8px;
		text-align: center;
	}

	.hint {
		margin: 0;
		color: #666;
		font-size: 14px;
	}

	.multiplayer-footer {
		margin-top: 30px;
		padding: 20px;
		text-align: center;
		border-top: 2px solid #ddd;
		background: #f9f9f9;
	}

	.multiplayer-footer p {
		margin: 0;
		font-size: 14px;
		color: #666;
	}

	.multiplayer-footer a {
		color: #6b46c1;
		text-decoration: none;
		font-weight: 600;
	}

	.multiplayer-footer a:hover {
		text-decoration: underline;
	}

	.waiting-message {
		text-align: center;
		padding: 60px 20px;
		background: #f5f5f5;
		border-radius: 8px;
	}

	.waiting-message h3 {
		color: #6b46c1;
		margin-bottom: 12px;
	}

	.waiting-message p {
		color: #666;
	}

	.player-status {
		background: #f5f5f5;
		padding: 15px;
		border-radius: 8px;
		text-align: center;
	}

	.player-status p {
		margin: 8px 0;
		font-weight: 600;
		font-size: 16px;
	}

	.result-correct {
		color: green;
		font-size: 18px;
	}

	.result-incorrect {
		color: #e85d75;
		font-size: 18px;
	}

	.max-attempts-reached {
		color: #ff6b6b;
		font-weight: 700;
		font-size: 16px;
	}

	@media (max-width: 768px) {
		.game-header {
			flex-direction: column;
			gap: 12px;
		}

		.game-header h2 {
			font-size: 16px;
			flex-direction: column;
		}

		.room-code {
			font-size: 20px;
		}
	}
</style>
