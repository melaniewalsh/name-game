<script>
	import { onMount, onDestroy } from "svelte";
	import { database } from "$lib/firebase";
	import { ref, set, onValue, push, update, off } from "firebase/database";
	import DotPlot from "$components/DotPlot.svelte";

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

	// Generate a random 6-character room code
	function generateRoomCode() {
		return Math.random().toString(36).substring(2, 8).toUpperCase();
	}

	// Create a new game room
	async function createRoom() {
		if (!playerNameInput.trim()) {
			alert("Please enter your name");
			return;
		}

		playerName = playerNameInput.trim();
		roomCode = generateRoomCode();
		playerId = push(ref(database)).key;

		// Create room in Firebase
		roomRef = ref(database, `rooms/${roomCode}`);
		await set(roomRef, {
			host: playerId,
			hostName: playerName,
			hiddenName: "",
			isHidden: false,
			nameOptions: [],
			createdAt: Date.now(),
			gameStarted: false
		});

		// Add host as first player
		const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
		await set(playerRef, {
			name: playerName,
			score: 0,
			lastGuess: "",
			isCorrect: false,
			joinedAt: Date.now()
		});

		gameMode = "host";
		listenToRoom();
	}

	// Join an existing room
	async function joinRoom() {
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
		roomRef = ref(database, `rooms/${roomCode}`);

		// Add player to room
		const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
		await set(playerRef, {
			name: playerName,
			score: 0,
			lastGuess: "",
			isCorrect: false,
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

	// Track the last known name before hiding
	let lastKnownName = $state("");

	// Monitor host chart for state changes
	$effect(() => {
		if (gameMode === "host" && hostChartElement) {
			// Use MutationObserver to detect when hide/reveal happens
			const observer = new MutationObserver(() => {
				// Check if the chart is in hidden mode
				const hiddenIndicator = hostChartElement.querySelector('.mode-indicator');
				if (hiddenIndicator) {
					const isHidden = hiddenIndicator.textContent.includes('GUESS MODE');

					// Get the current name from search mode or use the last known name
					let currentName = lastKnownName;
					if (!isHidden) {
						const nameMatch = hiddenIndicator.textContent.match(/FOR (.+)$/);
						if (nameMatch) {
							currentName = nameMatch[1];
							lastKnownName = currentName; // Store it for when we hide
						}
					}

					// Get name options from the DOM
					const optionChips = hostChartElement.querySelectorAll('.option-chip');
					const currentOptions = Array.from(optionChips).map(chip => chip.textContent.trim());

					// Update Firebase if state changed
					if (gameState && (
						gameState.isHidden !== isHidden ||
						gameState.hiddenName !== currentName ||
						JSON.stringify(gameState.nameOptions || []) !== JSON.stringify(currentOptions)
					)) {
						updateGameState({
							isHidden,
							hiddenName: currentName,
							nameOptions: currentOptions
						});
					}
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
	async function submitPlayerGuess(guessedName) {
		if (!gameState || !gameState.isHidden || !guessedName.trim()) return;

		const guess = guessedName.toLowerCase().trim();
		const answer = gameState.hiddenName.toLowerCase().trim();
		const isCorrect = guess === answer;

		console.log('Guess:', guess, 'Answer:', answer, 'Correct:', isCorrect);

		const currentPlayer = players.find(p => p.id === playerId);
		const currentScore = currentPlayer?.score || 0;
		const newScore = isCorrect ? currentScore + 1 : currentScore;

		console.log('Current score:', currentScore, 'New score:', newScore);

		const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
		await update(playerRef, {
			lastGuess: guessedName,
			isCorrect,
			score: newScore,
			guessedAt: Date.now()
		});

		playerLastGuessResult = isCorrect ? 'correct' : 'incorrect';

		// Clear the result after 2 seconds
		setTimeout(() => {
			playerLastGuessResult = null;
		}, 2000);
	}

	// Monitor player chart for guesses via the built-in DotPlot component
	$effect(() => {
		if (gameMode === "player" && playerChartElement && gameState?.isHidden) {
			// Listen for form submissions or guess button clicks
			const guessButton = playerChartElement.querySelector('.submit-btn');
			const guessInput = playerChartElement.querySelector('.name-input.guess-input');

			if (guessButton && guessInput) {
				const handleGuess = async () => {
					const guessValue = guessInput.value;
					if (guessValue.trim()) {
						await submitPlayerGuess(guessValue);
					}
				};

				guessButton.addEventListener('click', handleGuess);
				guessInput.addEventListener('keydown', (e) => {
					if (e.key === 'Enter') {
						handleGuess();
					}
				});

				return () => {
					guessButton.removeEventListener('click', handleGuess);
				};
			}
		}
	});

	// Leave room
	function leaveRoom() {
		if (roomRef) off(roomRef);
		if (playersRef) off(playersRef);
		gameMode = "menu";
		roomCode = "";
		roomCodeInput = "";
		gameState = null;
		players = [];
	}

	onDestroy(() => {
		if (roomRef) off(roomRef);
		if (playersRef) off(playersRef);
	});
</script>

{#if gameMode === "menu"}
	<div class="multiplayer-menu">
		<h2>Multiplayer Baby Name Game</h2>

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
			<h3>Create a New Game</h3>
			<button class="create-btn" onclick={createRoom}>Create Room</button>
		</div>

		<div class="menu-section">
			<h3>Join a Game</h3>
			<input
				type="text"
				bind:value={roomCodeInput}
				placeholder="Enter room code"
				class="room-code-input"
			/>
			<button class="join-btn" onclick={joinRoom}>Join Room</button>
		</div>
	</div>
{:else if gameMode === "host"}
	<div class="game-container">
		<div class="game-header">
			<h2>Room Code: <span class="room-code">{roomCode}</span></h2>
			<button class="leave-btn" onclick={leaveRoom}>Leave Room</button>
		</div>

		<div class="players-panel">
			<h3>Players ({players.length})</h3>
			<ul class="players-list">
				{#each players as player}
					<li class="player-item">
						<span class="player-name">{player.name}</span>
						<span class="player-score">Score: {player.score}</span>
						{#if player.isCorrect}
							<span class="correct-indicator">✓ Correct!</span>
						{:else if player.lastGuess}
							<span class="guess-display">Guessed: {player.lastGuess}</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<div class="game-area" bind:this={hostChartElement}>
			<DotPlot
				defaultName="Emma"
				startHidden={false}
				showControls={true}
			/>
		</div>

		<div class="host-controls">
			<p class="hint">Use the chart controls above to set up the game. When ready, click "Hide Name & Play" to start the round.</p>
		</div>
	</div>
{:else if gameMode === "player"}
	<div class="game-container">
		<div class="game-header">
			<h2>Room Code: <span class="room-code">{roomCode}</span></h2>
			<button class="leave-btn" onclick={leaveRoom}>Leave Room</button>
		</div>

		<div class="players-panel">
			<h3>Players ({players.length})</h3>
			<ul class="players-list">
				{#each players as player}
					<li class="player-item">
						<span class="player-name">{player.name}</span>
						<span class="player-score">Score: {player.score}</span>
						{#if player.isCorrect}
							<span class="correct-indicator">✓ Correct!</span>
						{:else if player.lastGuess}
							<span class="guess-display">Guessed: {player.lastGuess}</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<div class="game-area" bind:this={playerChartElement}>
			{#if gameState}
				{#key `${gameState.hiddenName}-${gameState.isHidden}`}
					<DotPlot
						defaultName={gameState.hiddenName || "Emma"}
						startHidden={gameState.isHidden}
						showControls={true}
						playerMode={true}
						externalNameOptions={gameState.nameOptions || []}
					/>
				{/key}
			{/if}
		</div>

		<div class="player-status">
			<p>Your score: {players.find(p => p.id === playerId)?.score || 0}</p>
		</div>
	</div>
{/if}

<style>
	.multiplayer-menu {
		max-width: 600px;
		margin: 40px auto;
		padding: 30px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.multiplayer-menu h2 {
		text-align: center;
		color: #6b46c1;
		margin-bottom: 30px;
	}

	.menu-section {
		margin-bottom: 30px;
	}

	.menu-section h3 {
		margin-bottom: 12px;
		color: #333;
	}

	.name-input,
	.room-code-input {
		width: 100%;
		padding: 12px;
		font-size: 16px;
		border: 2px solid #ddd;
		border-radius: 6px;
		margin-bottom: 12px;
	}

	.create-btn,
	.join-btn {
		width: 100%;
		padding: 12px 20px;
		font-size: 16px;
		font-weight: 600;
		background: #6b46c1;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.create-btn:hover,
	.join-btn:hover {
		background: #5a3aa8;
	}

	.game-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.game-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		padding: 20px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.room-code {
		color: #6b46c1;
		font-weight: 700;
		font-size: 24px;
		letter-spacing: 2px;
	}

	.leave-btn {
		padding: 8px 16px;
		background: #999;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.leave-btn:hover {
		background: #777;
	}

	.players-panel {
		background: white;
		border-radius: 8px;
		padding: 20px;
		margin-bottom: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.players-panel h3 {
		margin-bottom: 16px;
		color: #333;
	}

	.players-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.player-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
		background: #f5f5f5;
		border-radius: 6px;
		margin-bottom: 8px;
	}

	.player-name {
		font-weight: 600;
		color: #333;
	}

	.player-score {
		color: #666;
	}

	.correct-indicator {
		color: #4caf50;
		font-weight: 600;
	}

	.guess-display {
		color: #ff9800;
		font-size: 14px;
		font-style: italic;
	}

	.game-area {
		background: white;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.host-controls {
		margin-top: 20px;
		padding: 20px;
		background: #e8f5e9;
		border-radius: 8px;
	}

	.hint {
		margin: 0;
		color: #2e7d32;
	}

	.player-status {
		margin-top: 20px;
		padding: 20px;
		background: white;
		border-radius: 8px;
		text-align: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.player-status p {
		margin: 0;
		font-size: 18px;
		font-weight: 600;
		color: #6b46c1;
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
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
</style>
