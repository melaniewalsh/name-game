<script>
	import { base } from "$app/paths";
</script>

<div class="multiplayer-button-container">
	<a href="{base}/multiplayer" target="_blank" class="multiplayer-button">
		🎮 Open Multiplayer Game in New Tab
	</a>
</div>

<style>
	.multiplayer-button-container {
		margin: 30px 0;
		text-align: center;
	}

	.multiplayer-button {
		display: inline-block;
		padding: 16px 32px;
		font-size: 18px;
		font-weight: 600;
		background: #6b46c1;
		color: white;
		text-decoration: none;
		border-radius: 8px;
		transition: all 0.2s;
		box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
	}

	.multiplayer-button:hover {
		background: #5a3aa8;
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(107, 70, 193, 0.4);
	}

	.multiplayer-button:active {
		transform: translateY(0);
	}
</style>
