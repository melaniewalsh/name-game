<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { base } from "$app/paths";
	import { database } from "$lib/firebase";
	import {
		ref,
		set,
		onValue,
		push,
		update,
		off,
		get,
		remove
	} from "firebase/database";
	import Versus from "$components/Versus.svelte";

	const { id = "multiplayer-versus-game" } = $props();

	// Room timeout (30 minutes of inactivity)
	const ROOM_TIMEOUT_MS = 30 * 60 * 1000;

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
	let hostLastGuessResult = $state(null); // 'correct' | 'incorrect' | null for host
	let isSubmittingGuess = $state(false); // Prevent concurrent submissions

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

	// Check if game is over and find winner(s)
	let isGameComplete = $derived(
		gameState &&
			(gameState.gameEnded ||
				(gameState.currentRound >= (gameState.maxRounds ?? 5) &&
					!gameState.isHidden &&
					gameState.gameStarted))
	);

	let winners = $derived.by(() => {
		if (!isGameComplete || players.length === 0) return [];
		const maxScore = Math.max(...players.map((p) => p.score || 0));
		return players.filter((p) => (p.score || 0) === maxScore);
	});

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
			lastActivity: Date.now(),
			gameStarted: false,
			gameEnded: false,
			maxAttempts: maxAttempts,
			correctPoints: correctPoints,
			incorrectPoints: incorrectPoints,
			maxRounds: maxRounds,
			currentRound: 1,
			announcement: ""
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
		startActivityHeartbeat();
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

		// Check if room exists and is still active
		roomRef = ref(database, `versus-rooms/${roomCode}`);
		const roomSnapshot = await get(roomRef);

		if (!roomSnapshot.exists()) {
			alert("Room not found. Please check the room code and try again.");
			return;
		}

		const roomData = roomSnapshot.val();
		const lastActivity = roomData.lastActivity || roomData.createdAt;
		const timeSinceActivity = Date.now() - lastActivity;

		if (timeSinceActivity > ROOM_TIMEOUT_MS) {
			alert(
				"This room has been inactive for too long and is no longer available."
			);
			// Clean up the expired room
			await remove(roomRef);
			return;
		}

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

		// Update room activity
		await update(roomRef, { lastActivity: Date.now() });

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

	// Handle host guess from Versus component callback
	function handleHostGuess(guess1, guess2, isCorrect) {
		console.log(
			"[handleHostGuess] Host made guess:",
			guess1,
			"vs",
			guess2,
			"Correct:",
			isCorrect
		);
		submitPlayerGuess(guess1, guess2);
	}

	// Handle player guess from Versus component callback
	function handlePlayerGuess(guess1, guess2, isCorrect) {
		console.log(
			"[handlePlayerGuess] Player made guess:",
			guess1,
			"vs",
			guess2,
			"Correct:",
			isCorrect
		);
		submitPlayerGuess(guess1, guess2);
	}

	// Track the last known names before hiding
	let lastKnownName1 = $state("");
	let lastKnownName2 = $state("");
	let lastIsHidden = $state(false);
	let hasStartedFirstRound = $state(false); // Track if we've started the first round yet

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
						name2: lastKnownName2,
						wasHidden: lastIsHidden
					});

					// If transitioning from revealed to hidden (starting new round), reset attempts and increment round
					if (!lastIsHidden && isHidden) {
						console.log(
							"[VersusMultiplayer] Transition to hidden detected. First round:",
							!hasStartedFirstRound
						);

						// Clear host feedback
						hostLastGuessResult = null;
						isSubmittingGuess = false;

						// Only increment round if this is NOT the first round starting
						if (hasStartedFirstRound) {
							console.log(
								"[VersusMultiplayer] Starting new round, resetting attempts"
							);
							// Increment round counter for subsequent rounds
							const newRound = (gameState?.currentRound ?? 1) + 1;
							// Wait for attempts to be reset before updating game state
							resetAllPlayersAttempts().then(() => {
								updateGameState({
									isHidden,
									name1: lastKnownName1,
									name2: lastKnownName2,
									currentRound: newRound,
									gameStarted: true
								});
							});
						} else {
							console.log(
								"[VersusMultiplayer] First round starting, not incrementing"
							);
							// First round - just update state, don't increment
							hasStartedFirstRound = true;
							// Still reset attempts in case there were any test guesses
							resetAllPlayersAttempts().then(() => {
								updateGameState({
									isHidden,
									name1: lastKnownName1,
									name2: lastKnownName2,
									gameStarted: true
									// Keep currentRound as is
								});
							});
						}
					}
					// If revealing names (hidden -> not hidden), just update state
					else if (lastIsHidden && !isHidden) {
						console.log("[VersusMultiplayer] Revealing names to players");
						updateGameState({
							isHidden,
							name1: lastKnownName1,
							name2: lastKnownName2,
							gameStarted: true
						});
					}
					// If names changed while not hidden (host is searching for new names), mark game as not started
					else if (
						!isHidden &&
						(gameState.name1 !== lastKnownName1 ||
							gameState.name2 !== lastKnownName2)
					) {
						console.log(
							"[VersusMultiplayer] Names changed while revealed - host is setting up"
						);
						updateGameState({
							isHidden,
							name1: lastKnownName1,
							name2: lastKnownName2,
							gameStarted: false
						});
					}
					// Otherwise just update normally
					else {
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

		// Prevent concurrent submissions
		if (isSubmittingGuess) {
			console.log("Already submitting a guess, skipping");
			return;
		}

		// Set flag immediately to block any concurrent calls
		isSubmittingGuess = true;

		try {
			// Read current player data from Firebase to avoid stale data from listener
			const playerRef = ref(
				database,
				`versus-rooms/${roomCode}/players/${playerId}`
			);
			const playerSnapshot = await get(playerRef);
			const currentPlayerData = playerSnapshot.val();

			if (!currentPlayerData) {
				console.error("Player data not found in Firebase");
				isSubmittingGuess = false;
				return;
			}

			const currentAttemptCount = currentPlayerData.attemptCount || 0;
			const currentScore = currentPlayerData.score ?? 0;
			const maxAttemptsAllowed = gameState.maxAttempts ?? 3;

			console.log(
				"[Attempt Check]",
				"Player name:",
				currentPlayerData.name,
				"| Player ID:",
				playerId,
				"| Mode:",
				gameMode,
				"| Current attempts:",
				currentAttemptCount,
				"| Current score:",
				currentScore,
				"| Max:",
				maxAttemptsAllowed
			);

			// Check if player has exceeded max attempts
			if (currentAttemptCount >= maxAttemptsAllowed) {
				console.log("Max attempts reached - blocking submission");
				isSubmittingGuess = false;
				return;
			}

			const g1 = guess1.toLowerCase().trim();
			const g2 = guess2.toLowerCase().trim();

			console.log("[Submitting Guess]", g1, "and", g2, "for", gameMode);

			const name1Lower = gameState.name1.toLowerCase().trim();
			const name2Lower = gameState.name2.toLowerCase().trim();

			// Order matters - must match name1 to position 1 and name2 to position 2
			const correct1 = g1 === name1Lower;
			const correct2 = g2 === name2Lower;
			const isCorrect = correct1 && correct2;

			console.log("Guess 1:", g1, "Guess 2:", g2);
			console.log("Name 1:", name1Lower, "Name 2:", name2Lower);
			console.log("Correct:", isCorrect);

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
			console.log(
				"Using correctPts:",
				correctPts,
				"incorrectPts:",
				incorrectPts
			);
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

			console.log(
				"[Updating Firebase]",
				"Player:",
				currentPlayerData.name,
				"| ID:",
				playerId,
				"| Path:",
				`versus-rooms/${roomCode}/players/${playerId}`,
				"| Old score:",
				currentScore,
				"| New score:",
				newScore,
				"| New attempts:",
				newAttemptCount,
				"(was",
				currentAttemptCount,
				") | Correct:",
				isCorrect
			);

			await update(playerRef, {
				lastGuess1: guess1,
				lastGuess2: guess2,
				isCorrect,
				score: newScore,
				attemptCount: newAttemptCount,
				guessedAt: Date.now()
			});

			// Update room activity timestamp
			if (gameMode === "host") {
				await updateGameState({ lastActivity: Date.now() });
			}

			console.log(
				"[Firebase Updated]",
				currentPlayerData.name,
				"score:",
				currentScore,
				"→",
				newScore,
				"| attempts:",
				currentAttemptCount,
				"→",
				newAttemptCount
			);

			// Set feedback for host or player
			if (gameMode === "host") {
				// Keep host feedback on screen until new round starts
				hostLastGuessResult = isCorrect ? "correct" : "incorrect";
			} else {
				playerLastGuessResult = isCorrect ? "correct" : "incorrect";
				setTimeout(() => {
					playerLastGuessResult = null;
				}, 2000);
			}
		} catch (error) {
			console.error("Error submitting guess:", error);
		} finally {
			// Clear submitting flag
			isSubmittingGuess = false;
			console.log("[Submission complete, flag cleared]");
		}
	}

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
		if (activityInterval) clearInterval(activityInterval);

		gameMode = "menu";
		roomCode = "";
		roomCodeInput = "";
		gameState = null;
		players = [];
		copyButtonText = "Copy";
		copyLinkText = "Copy Link";
		hasStartedFirstRound = false;
		isSubmittingGuess = false;

		// Clear URL params
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.delete("room");
			window.history.pushState({}, "", url);
		}
	}

	// End game and show winner announcement
	async function endGame() {
		if (gameMode !== "host" || !roomRef) return;

		console.log("[VersusMultiplayer] Ending game");

		await updateGameState({
			gameEnded: true,
			isHidden: false,
			lastActivity: Date.now()
		});

		console.log("[VersusMultiplayer] Game ended, showing winner");
	}

	// Restart game (reset scores and rounds but keep players)
	async function restartGame() {
		if (gameMode !== "host" || !roomRef) return;

		console.log("[VersusMultiplayer] Restarting game");

		// Reset all player scores and attempts
		const resetPromises = players.map((player) => {
			const playerRef = ref(
				database,
				`versus-rooms/${roomCode}/players/${player.id}`
			);
			return update(playerRef, {
				score: 0,
				attemptCount: 0,
				isCorrect: false,
				lastGuess1: "",
				lastGuess2: ""
			});
		});

		await Promise.all(resetPromises);

		// Reset game state
		await updateGameState({
			currentRound: 1,
			gameStarted: false,
			gameEnded: false,
			isHidden: false,
			name1: "",
			name2: "",
			lastActivity: Date.now()
		});

		// Reset local state
		hasStartedFirstRound = false;
		hostLastGuessResult = null;
		isSubmittingGuess = false;

		console.log("[VersusMultiplayer] Game restarted");
	}

	// Periodic activity heartbeat interval
	let activityInterval = null;

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
		if (activityInterval) clearInterval(activityInterval);
	});

	// Start periodic activity updates (every 5 minutes) to keep room alive
	function startActivityHeartbeat() {
		if (activityInterval) clearInterval(activityInterval);

		activityInterval = setInterval(
			async () => {
				if (gameMode === "host" && roomRef) {
					console.log("[Activity Heartbeat] Updating room activity");
					await update(roomRef, { lastActivity: Date.now() });
				}
			},
			5 * 60 * 1000
		); // Every 5 minutes
	}
</script>

{#if gameMode === "menu"}
	<div class="multiplayer-menu">
		<h2>Which Name Is Which?</h2>

		<!-- <img src="{base}/assets/versus.png" /> -->

		<p class="explanation">
			Pick two names and challenge your friends to guess which is which. One
			person creates a game and becomes the host. Other players can join the
			same room with a code.
		</p>

		<p class="explanation">
			Data is drawn from the U.S. Social Security Admnistration.
		</p>

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
						{/if}
						<span class="player-score">{player.score}</span>
						{#if player.isCorrect}
							<span class="correct-indicator">✓</span>
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

		{#if isGameComplete}
			<div class="winner-banner">
				<h2>🎉 Game Over! 🎉</h2>
				{#if winners.length === 1}
					<p class="winner-text">
						Winner: <strong>{winners[0].name}</strong> with {winners[0].score ||
							0} points!
					</p>
				{:else if winners.length > 1}
					<p class="winner-text">
						It's a tie! Winners: <strong
							>{winners.map((w) => w.name).join(", ")}</strong
						>
						with {winners[0].score || 0} points each!
					</p>
				{/if}
			</div>
		{:else if gameState}
			<div class="round-indicator">
				Round {gameState.currentRound ?? 1} of {gameState.maxRounds ?? 5}
			</div>
		{/if}

		<div class="game-management-buttons">
			<button class="restart-game-btn" onclick={restartGame}>
				🔄 Restart Game
			</button>
			<button class="end-game-btn" onclick={endGame}> 🏁 End Game </button>
		</div>

		<div class="game-area" bind:this={hostChartElement}>
			<Versus
				defaultName1="Landon"
				defaultName2="Nora"
				startHidden={false}
				showControls={true}
				startYear={1920}
				disableAutoReveal={true}
				onGuessSubmit={handleHostGuess}
			/>
		</div>

		<div class="host-controls">
			<p class="hint">
				Use the chart controls above to choose two names. When ready, click "Set
				Names & Start" to begin the round.
			</p>
			{#if gameState?.name1 && gameState?.name2}
				{@const currentPlayer = players.find((p) => p.id === playerId)}
				{@const attemptsUsed = currentPlayer?.attemptCount || 0}
				{@const maxAttemptsAllowed = gameState.maxAttempts ?? 3}
				{@const attemptsRemaining = maxAttemptsAllowed - attemptsUsed}

				<div class="host-status">
					<p>Your score: {currentPlayer?.score || 0}</p>
					{#if gameState?.isHidden}
						<p>Attempts remaining: {attemptsRemaining}/{maxAttemptsAllowed}</p>

						{#if attemptsRemaining <= 0}
							<p class="max-attempts-reached">No attempts remaining</p>
						{/if}
					{/if}

					{#if hostLastGuessResult === "correct"}
						<p class="result-correct">✓ Correct!</p>
					{:else if hostLastGuessResult === "incorrect"}
						<p class="result-incorrect">✗ Try again!</p>
					{/if}
				</div>
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
						{/if}
						<span class="player-score">{player.score}</span>
						{#if player.isCorrect}
							<span class="correct-indicator">✓</span>
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

		{#if isGameComplete}
			<div class="winner-banner">
				<h2>🎉 Game Over! 🎉</h2>
				{#if winners.length === 1}
					<p class="winner-text">
						Winner: <strong>{winners[0].name}</strong> with {winners[0].score ||
							0} points!
					</p>
				{:else if winners.length > 1}
					<p class="winner-text">
						It's a tie! Winners: <strong
							>{winners.map((w) => w.name).join(", ")}</strong
						>
						with {winners[0].score || 0} points each!
					</p>
				{/if}
			</div>
		{:else if gameState}
			<div class="round-indicator">
				Round {gameState.currentRound ?? 1} of {gameState.maxRounds ?? 5}
			</div>
		{/if}

		<div class="game-area" bind:this={playerChartElement}>
			{#if gameState && gameState.name1 && gameState.name2 && gameState.gameStarted}
				{@const currentPlayer = players.find((p) => p.id === playerId)}

				{#if currentPlayer}
					{@const attemptsUsed = currentPlayer.attemptCount || 0}
					{@const maxAttemptsAllowed = gameState.maxAttempts ?? 1}
					{@const hasAttemptsRemaining = attemptsUsed < maxAttemptsAllowed}

					{@const playerGotItRight = currentPlayer.isCorrect}
					{@const isGameOver =
						gameState.isHidden && (!hasAttemptsRemaining || playerGotItRight)}

					<div class="chart-container" class:disabled={isGameOver}>
						{#key `${gameState.name1}-${gameState.name2}-${gameState.isHidden}`}
							<Versus
								defaultName1={gameState.name1}
								defaultName2={gameState.name2}
								startHidden={gameState.isHidden}
								showControls={false}
								startYear={1920}
								onGuessSubmit={handlePlayerGuess}
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
	.explanation {
		font-size: 18px;
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
		/* background: #f0e7ff; */
		padding: 15px;
		/* border-radius: 8px; */
		text-align: center;
	}

	.hint {
		margin: 0;
		color: #666;
		font-size: 14px;
	}

	.host-status {
		margin-top: 15px;
		padding: 15px;
		background: white;
		border-radius: 8px;
		border: 2px solid #6b46c1;
	}

	.host-status p {
		margin: 8px 0;
		font-weight: 600;
		font-size: 16px;
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

	.winner-banner {
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		color: white;
		padding: 25px 30px;
		border-radius: 12px;
		margin-bottom: 20px;
		text-align: center;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		border: 3px solid #ffd700;
		animation:
			slideDown 0.5s ease-out,
			pulse 2s ease-in-out infinite;
	}

	.winner-banner h2 {
		margin: 0 0 12px 0;
		font-size: 28px;
		font-weight: 800;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.winner-text {
		margin: 0;
		font-size: 20px;
		font-weight: 600;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
	}

	.winner-text strong {
		font-size: 22px;
		text-decoration: underline;
		text-decoration-color: #ffd700;
		text-decoration-thickness: 2px;
	}

	.game-management-buttons {
		display: flex;
		gap: 15px;
		justify-content: center;
		margin-bottom: 20px;
		padding: 15px;
		/* background: white;
		border: 2px solid #ddd;
		border-radius: 8px; */
	}

	.restart-game-btn,
	.end-game-btn {
		padding: 12px 24px;
		font-size: 16px;
		font-weight: 700;
		border: none;
		border-radius: 8px;
		background: red;

		cursor: pointer;
		font-family: "Baloo Bhai 2", sans-serif;
		transition: all 0.2s;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.restart-game-btn {
		background: #4caf50;
		color: white;
	}

	.restart-game-btn:hover {
		background: #45a049;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.end-game-btn {
		background: red;
		color: white;
	}

	.end-game-btn:hover {
		background: #dc0000;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.02);
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

		.game-management-buttons {
			flex-direction: column;
			gap: 10px;
		}

		.restart-game-btn,
		.end-game-btn {
			width: 100%;
		}
	}
</style>
