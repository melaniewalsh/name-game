<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { base } from "$app/paths";
	import { goto } from "$app/navigation";
	import { database } from "$lib/firebase";
	import { ref, set, onValue, push, update, off } from "firebase/database";
	import GuessLineChart from "$components/GuessLineChart.svelte";

	const { id = "multiplayer-game" } = $props();

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
	let dotPlotComponent = $state(null);
	let hostChartElement = $state(null);
	let playerChartElement = $state(null);
	let playerGuessInput = $state("");
	let playerLastGuessResult = $state(null); // 'correct' | 'incorrect' | null

	// Game configuration
	let maxAttempts = $state(3);
	let correctPoints = $state(1);
	let incorrectPoints = $state(0);
	let maxRounds = $state(5);
	let currentRound = $state(1);
	let hostAnnouncement = $state("");
	let announcementInput = $state("");

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
		console.log("[createRoom] Function called");
		console.trace("[createRoom] Call stack");
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
		console.log("[createRoom] Generated room code:", roomCode);
		playerId = push(ref(database)).key;

		// Update URL with the new room code
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.set("room", roomCode);
			goto(url.pathname + url.search, {
				replaceState: false,
				noScroll: true,
				keepFocus: true
			});
			console.log("[createRoom] Updated URL to:", url.toString());
		}

		// Create room in Firebase
		roomRef = ref(database, `rooms/${roomCode}`);
		await set(roomRef, {
			host: playerId,
			hostName: playerName,
			hiddenName: "",
			isHidden: false,
			nameOptions: [],
			lettersRevealed: 0,
			isRevealed: false,
			createdAt: Date.now(),
			gameStarted: false,
			maxAttempts: maxAttempts,
			correctPoints: correctPoints,
			incorrectPoints: incorrectPoints,
			maxRounds: maxRounds,
			currentRound: 1,
			announcement: ""
		});

		// Add host as first player
		const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
		await set(playerRef, {
			name: playerName,
			score: 0,
			lastGuess: "",
			isCorrect: false,
			attemptCount: 0,
			joinedAt: Date.now()
		});

		gameMode = "host";
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

		// Update URL with the room code
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.set("room", roomCode);
			goto(url.pathname + url.search, {
				replaceState: false,
				noScroll: true,
				keepFocus: true
			});
			console.log("[joinRoom] Updated URL to:", url.toString());
		}

		// Check if room exists
		roomRef = ref(database, `rooms/${roomCode}`);

		// Add player to room
		const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
		await set(playerRef, {
			name: playerName,
			score: 0,
			lastGuess: "",
			isCorrect: false,
			attemptCount: 0,
			joinedAt: Date.now()
		});

		gameMode = "player";
		listenToRoom();
	}

	// Listen to room updates
	function listenToRoom() {
		// Listen to game state
		roomRef = ref(database, `rooms/${roomCode}`);
		onValue(roomRef, (snapshot) => {
			if (snapshot.exists()) {
				gameState = snapshot.val();
				// Sync local state with Firebase
				if (gameMode === "host") {
					maxRounds = gameState.maxRounds ?? 5;
					currentRound = gameState.currentRound ?? 1;
					hostAnnouncement = gameState.announcement ?? "";
				} else {
					hostAnnouncement = gameState.announcement ?? "";
				}
			}
		});

		// Listen to players
		playersRef = ref(database, `rooms/${roomCode}/players`);
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

	// Send announcement
	async function sendAnnouncement() {
		if (gameMode === "host" && roomRef && announcementInput.trim()) {
			await updateGameState({ announcement: announcementInput.trim() });
			announcementInput = "";
		}
	}

	// Clear announcement
	async function clearAnnouncement() {
		if (gameMode === "host" && roomRef) {
			await updateGameState({ announcement: "" });
		}
	}

	// Increment round
	async function nextRound() {
		if (gameMode === "host" && roomRef) {
			const newRound = (gameState?.currentRound ?? 1) + 1;
			await updateGameState({ currentRound: newRound });
		}
	}

	// Track the last known game state from DotPlot
	let lastKnownName = $state("");
	let lastIsHidden = $state(false);

	// Handle state changes from DotPlot component
	function handleDotPlotStateChange(state) {
		console.log("[handleDotPlotStateChange] Received state:", state);

		if (gameMode === "host" && gameState) {
			const {
				name,
				isHidden,
				nameOptions: options,
				lettersRevealed: letters,
				isRevealed
			} = state;

			// Check if state actually changed
			if (
				gameState.isHidden !== isHidden ||
				gameState.hiddenName !== name ||
				JSON.stringify(gameState.nameOptions || []) !==
					JSON.stringify(options || []) ||
				gameState.lettersRevealed !== letters ||
				gameState.isRevealed !== isRevealed
			) {
				console.log(
					"[handleDotPlotStateChange] State changed, updating Firebase"
				);

				// If transitioning from revealed to hidden (starting new round), reset attempts
				if (!lastIsHidden && isHidden) {
					console.log(
						"[handleDotPlotStateChange] New round starting, resetting attempts"
					);
					// Increment round counter
					const newRound = (gameState?.currentRound ?? 1) + 1;
					resetAllPlayersAttempts().then(() => {
						updateGameState({
							isHidden,
							hiddenName: name,
							nameOptions: options || [],
							lettersRevealed: letters,
							isRevealed,
							currentRound: newRound
						});
					});
				} else {
					updateGameState({
						isHidden,
						hiddenName: name,
						nameOptions: options || [],
						lettersRevealed: letters,
						isRevealed
					});
				}
				lastIsHidden = isHidden;
			} else {
				console.log("[handleDotPlotStateChange] No state change");
			}
		}
	}

	// Track room code changes
	$effect(() => {
		console.log("[ROOM CODE CHANGED]", roomCode);
		console.trace("[ROOM CODE CHANGED] Stack trace");
	});

	// Reset all players' attempt counts for a new round
	async function resetAllPlayersAttempts() {
		if (gameMode === "host" && players.length > 0) {
			console.log(
				"[DotPlotMultiplayer] Resetting all players attempt counts for",
				players.length,
				"players"
			);
			// Update each player's attempt count and isCorrect flag
			const updatePromises = players.map((player) => {
				const playerRef = ref(
					database,
					`rooms/${roomCode}/players/${player.id}`
				);
				console.log(
					"[DotPlotMultiplayer] Resetting attemptCount and isCorrect for player:",
					player.name
				);
				return update(playerRef, {
					attemptCount: 0,
					isCorrect: false
				});
			});
			await Promise.all(updatePromises);
			console.log("[DotPlotMultiplayer] All attempt counts reset");
		}
	}

	// Handle player guess
	async function submitPlayerGuess(guessedName) {
		if (!gameState || !gameState.isHidden || !guessedName.trim()) return;

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

		console.log("[Submitting Guess]", guessedName);

		const guess = guessedName.toLowerCase().trim();
		const answer = gameState.hiddenName.toLowerCase().trim();
		const isCorrect = guess === answer;

		console.log("Guess:", guess, "Answer:", answer, "Correct:", isCorrect);

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

		const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
		await update(playerRef, {
			lastGuess: guessedName,
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

	// Monitor player chart for guesses via the built-in DotPlot component
	$effect(() => {
		if (gameMode === "player" && playerChartElement && gameState?.isHidden) {
			// Listen for form submissions or guess button clicks
			const guessButton = playerChartElement.querySelector(".submit-btn");
			const guessInput = playerChartElement.querySelector(
				".name-input.guess-input"
			);
			const optionChips = playerChartElement.querySelectorAll(".option-chip");

			const listeners = [];

			if (guessButton && guessInput) {
				const handleGuess = async () => {
					const guessValue = guessInput.value;
					if (guessValue.trim()) {
						await submitPlayerGuess(guessValue);
					}
				};

				guessButton.addEventListener("click", handleGuess);
				guessInput.addEventListener("keydown", (e) => {
					if (e.key === "Enter") {
						handleGuess();
					}
				});

				listeners.push({
					el: guessButton,
					event: "click",
					handler: handleGuess
				});
			}

			// Listen for option chip clicks
			if (optionChips.length > 0) {
				optionChips.forEach((chip) => {
					const handleChipClick = async () => {
						const guessValue = chip.textContent.trim();
						if (guessValue) {
							await submitPlayerGuess(guessValue);
						}
					};
					chip.addEventListener("click", handleChipClick);
					listeners.push({
						el: chip,
						event: "click",
						handler: handleChipClick
					});
				});
			}

			return () => {
				listeners.forEach(({ el, event, handler }) => {
					el.removeEventListener(event, handler);
				});
			};
		}
	});

	// Copy room code to clipboard
	let copyButtonText = $state("Copy");
	async function copyRoomCode() {
		try {
			console.log("[copyRoomCode] Copying room code:", roomCode);
			await navigator.clipboard.writeText(roomCode);
			copyButtonText = "Copied!";
			setTimeout(() => {
				copyButtonText = "Copy";
			}, 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	}

	// Get shareable link
	function getShareableLink() {
		if (browser && roomCode) {
			const url = new URL(window.location.href);
			url.searchParams.set("room", roomCode);
			const link = url.toString();
			console.log("[getShareableLink] Room code:", roomCode, "Link:", link);
			return link;
		}
		return "";
	}

	// Copy shareable link to clipboard
	let copyLinkText = $state("Copy Link");
	async function copyShareableLink() {
		try {
			const link = getShareableLink();
			console.log("[copyShareableLink] Copying link:", link);
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
	}

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
		<h2>What's That Baby Name?</h2>

		<!-- <img src="{base}/assets/book.png" /> -->

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
			<p>
				<a href="{base}/" target="_blank">What's That Baby Name?</a> by Melanie
				Walsh.
				<a href="{base}/#origin-story" target="_blank">Read the backstory.</a>
			</p>
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
					<span>Max Rounds:</span>
					<input
						type="number"
						min="1"
						max="20"
						bind:value={maxRounds}
						onchange={() => updateGameState({ maxRounds })}
						class="settings-input"
					/>
				</label>
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

		<div class="announcement-section">
			<h3>Host Announcements</h3>
			<div class="announcement-controls">
				<input
					type="text"
					bind:value={announcementInput}
					placeholder="Type announcement for players..."
					class="announcement-input"
					onkeydown={(e) => {
						if (e.key === "Enter") sendAnnouncement();
					}}
				/>
				<button class="send-announcement-btn" onclick={sendAnnouncement}
					>Send</button
				>
				{#if hostAnnouncement}
					<button class="clear-announcement-btn" onclick={clearAnnouncement}
						>Clear</button
					>
				{/if}
			</div>
		</div>

		{#if hostAnnouncement}
			<div class="announcement-banner">
				<strong>📢 Host:</strong>
				{hostAnnouncement}
			</div>
		{/if}

		{#if gameState}
			<div class="round-indicator">
				Round {gameState.currentRound ?? 1} of {gameState.maxRounds ?? 5}
			</div>
		{/if}

		<div class="game-area" bind:this={hostChartElement}>
			<GuessLineChart
				defaultName="Emma"
				startHidden={false}
				showControls={true}
				startYear={1920}
				hostMode={true}
				onStateChange={handleDotPlotStateChange}
			/>
		</div>

		<div class="host-controls">
			<!-- <p class="hint">
				Use the chart controls above to set up the game. When ready, click "Hide
				Name & Play" to start the round.
			</p> -->
		</div>

		<div class="multiplayer-footer">
			<p>
				<a href="{base}/" target="_blank">What's That Baby Name?</a> by Melanie
				Walsh.
				<a href="{base}/#origin-story" target="_blank">Read the backstory.</a>
			</p>
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

		{#if hostAnnouncement}
			<div class="announcement-banner">
				<strong>📢 Host:</strong>
				{hostAnnouncement}
			</div>
		{/if}

		{#if gameState}
			<div class="round-indicator">
				Round {gameState.currentRound ?? 1} of {gameState.maxRounds ?? 5}
			</div>
		{/if}

		<div class="game-area" bind:this={playerChartElement}>
			{#if gameState && gameState.hiddenName && (gameState.isHidden || gameState.isRevealed)}
				{@const currentPlayer = players.find((p) => p.id === playerId)}

				{#if currentPlayer}
					{@const attemptsUsed = currentPlayer.attemptCount || 0}
					{@const maxAttemptsAllowed = gameState.maxAttempts ?? 3}
					{@const hasAttemptsRemaining = attemptsUsed < maxAttemptsAllowed}

					{@const playerGotItRight = currentPlayer.isCorrect}
					{@const isGameOver = !hasAttemptsRemaining || playerGotItRight}

					<div
						class="chart-container"
						class:disabled={isGameOver && gameState.isHidden}
					>
						{#key `${gameState.hiddenName}-${gameState.isHidden}-${gameState.lettersRevealed}`}
							<GuessLineChart
								defaultName={gameState.hiddenName || "Emma"}
								startHidden={gameState.isHidden}
								showControls={true}
								playerMode={true}
								externalNameOptions={gameState.nameOptions || []}
								externalLettersRevealed={gameState.lettersRevealed || 0}
								startYear={1920}
							/>
						{/key}
						{#if isGameOver && gameState.isHidden}
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
						{:else if gameState.isRevealed}
							<div class="revealed-overlay">
								<div class="overlay-message">
									<h3 style="color: #6b46c1;">Answer Revealed!</h3>
									<p>The answer was <strong>{gameState.hiddenName}</strong></p>
									<p>Waiting for the host to start a new round...</p>
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
			<p>
				<a href="{base}/" target="_blank">What's That Baby Name?</a> by Melanie
				Walsh.
				<a href="{base}/#origin-story" target="_blank">Read the backstory.</a>
			</p>
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
		background: #5a3aa8;
	}

	.join-btn {
		background: #4caf50;
	}

	.join-btn:hover {
		background: #45a049;
	}

	.game-container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0px;
	}

	@media (max-width: 768px) {
		.game-container {
			max-width: 100%;
			padding: 0;
			margin: 0;
		}

		.multiplayer-menu {
			max-width: 100%;
			margin: 0;
			padding: 20px;
			border-radius: 0;
		}

		.game-header,
		.players-panel,
		.game-area,
		.host-controls,
		.player-status {
			border-radius: 0;
			margin-left: 0;
			margin-right: 0;
		}
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
		padding: 20px;
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
		margin-left: 8px;
		opacity: 0.5;
		transition: all 0.2s;
		vertical-align: middle;
		position: relative;
		top: -2px;
		color: #6b46c1;
		display: inline-flex;
		align-items: center;
	}

	.copy-icon:hover {
		opacity: 1;
		transform: scale(1.15);
	}

	.copy-icon svg {
		display: block;
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
		transition: all 0.2s;
	}

	.leave-btn:hover {
		background: #777;
	}

	.players-panel {
		padding: 15px;
		margin-bottom: 15px;
	}

	.players-panel h3 {
		margin-bottom: 10px;
		color: #333;
		font-size: 16px;
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

	.announcement-section {
		background: white;
		border: 2px solid #ddd;
		border-radius: 8px;
		padding: 15px;
		margin-bottom: 20px;
	}

	.announcement-section h3 {
		margin: 0 0 12px 0;
		font-size: 16px;
		color: #6b46c1;
	}

	.announcement-controls {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.announcement-input {
		flex: 1;
		padding: 10px;
		font-size: 14px;
		border: 2px solid #ddd;
		border-radius: 6px;
		font-family: "Baloo Bhai 2", sans-serif;
	}

	.announcement-input:focus {
		outline: none;
		border-color: #6b46c1;
	}

	.send-announcement-btn,
	.clear-announcement-btn {
		padding: 10px 16px;
		font-size: 14px;
		font-weight: 600;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-family: "Baloo Bhai 2", sans-serif;
		transition: all 0.2s;
	}

	.send-announcement-btn {
		background: #6b46c1;
		color: white;
	}

	.send-announcement-btn:hover {
		background: #5a3a9f;
	}

	.clear-announcement-btn {
		background: #999;
		color: white;
	}

	.clear-announcement-btn:hover {
		background: #777;
	}

	.announcement-banner {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 15px 20px;
		border-radius: 8px;
		margin-bottom: 15px;
		font-size: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.round-indicator {
		background: #f0e7ff;
		color: #6b46c1;
		padding: 12px 20px;
		border-radius: 8px;
		margin-bottom: 15px;
		text-align: center;
		font-size: 18px;
		font-weight: 700;
		border: 2px solid #6b46c1;
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
		justify-content: space-between;
		align-items: center;
		padding: 6px 10px;
		background: #f5f5f5;
		border-radius: 4px;
		margin-bottom: 4px;
		gap: 8px;
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

	.player-score {
		color: #6b46c1;
		font-weight: 600;
		font-size: 14px;
		min-width: 20px;
		text-align: right;
	}

	.host-badge {
		background: #6b46c1;
		color: white;
		padding: 2px 8px;
		border-radius: 10px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.correct-indicator {
		color: #4caf50;
		font-weight: 600;
		font-size: 16px;
	}

	.guess-display {
		color: #ff9800;
		font-size: 14px;
		font-style: italic;
	}

	.game-area {
		padding: 20px;
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

	.attempts-overlay,
	.revealed-overlay {
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

	.revealed-overlay .overlay-message {
		border-color: #6b46c1;
		background: #f9f7fc;
	}

	.host-controls {
		margin-top: 20px;
		padding: 20px;
	}

	.hint {
		margin: 0;
		color: #2e7d32;
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

	.player-status {
		margin-top: 20px;
		padding: 20px;
		text-align: center;
	}

	.player-status p {
		margin: 8px 0;
		font-size: 16px;
		font-weight: 600;
		color: #333;
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

	.guess-feedback {
		margin-top: 12px;
		padding: 16px 24px;
		border-radius: 6px;
		font-size: 18px;
		font-weight: 600;
		text-align: center;
	}

	.guess-feedback.correct {
		background: #4caf50;
		color: white;
	}

	.guess-feedback.incorrect {
		background: #f44336;
		color: white;
	}

	.name-options-display {
		margin-top: 20px;
		padding: 20px;
	}

	.name-options-display h4 {
		margin: 0 0 12px 0;
		color: #333;
	}

	.options-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.option-chip-player {
		display: inline-block;
		padding: 6px 12px;
		background: white;
		border: 2px solid #ffd700;
		border-radius: 16px;
		font-size: 14px;
		font-weight: 500;
		color: #333;
		cursor: pointer;
		transition: all 0.2s;
	}

	.option-chip-player:hover {
		background: #ffd700;
		color: #000;
		transform: scale(1.05);
	}

	.option-chip-player:active {
		transform: scale(0.98);
	}

	.waiting-message {
		text-align: center;
		padding: 60px 20px;
		color: #666;
	}

	.waiting-message h3 {
		color: #6b46c1;
		margin-bottom: 12px;
		font-size: 24px;
	}

	.waiting-message p {
		margin: 0;
		font-size: 16px;
	}
</style>
