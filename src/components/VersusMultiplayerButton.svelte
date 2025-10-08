<script>
	import { base } from "$app/paths";
	import VersusMultiplayer from "./VersusMultiplayer.svelte";

	let showMultiplayer = $state(true);
</script>

<div class="multiplayer-container">
	<button
		class="toggle-multiplayer-btn"
		onclick={() => (showMultiplayer = !showMultiplayer)}
	>
		{showMultiplayer ? "−" : "+"} Multiplayer Mode
	</button>

	{#if showMultiplayer}
		<div class="multiplayer-box">
			<div class="multiplayer-header">
				<p class="multiplayer-description">
					Want to play with friends in real-time? One person becomes the host,
					picks two names, and players compete to guess which name is which by
					dragging names to the correct lines. Share a room code with friends!
				</p>
				<a href="{base}/versus-multiplayer" target="_blank" class="open-tab-btn">
					Open in New Tab →
				</a>
			</div>
			<VersusMultiplayer />
		</div>
	{/if}
</div>

<style>
	.multiplayer-container {
		margin: 20px 0;
		max-width: 900px;
	}

	.toggle-multiplayer-btn {
		width: 100%;
		padding: 10px 16px;
		font-size: 15px;
		font-weight: 600;
		background: #6b46c1;
		color: white;
		border: 2px solid #6b46c1;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		text-align: left;
	}

	.toggle-multiplayer-btn:hover {
		background: white;
		color: #6b46c1;
	}

	.multiplayer-box {
		margin-top: 12px;
		padding: 16px;
		border: 2px solid #6b46c1;
		border-radius: 6px;
		background: #f9f7fc;
	}

	.multiplayer-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;
	}

	.multiplayer-description {
		flex: 1;
		font-size: 14px;
		color: #333;
		margin: 0;
		line-height: 1.5;
	}

	.open-tab-btn {
		flex-shrink: 0;
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 600;
		background: #6b46c1;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.open-tab-btn:hover {
		background: #5a3aa8;
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		.multiplayer-header {
			flex-direction: column;
			align-items: stretch;
		}

		.open-tab-btn {
			text-align: center;
		}
	}
</style>
