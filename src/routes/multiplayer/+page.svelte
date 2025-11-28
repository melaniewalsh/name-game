<script>
	import GuessLineChartMultiplayer from "$components/GuessLineChartMultiplayer.svelte";
</script>

<svelte:head>
	<title>Multiplayer Baby Name Game</title>
	<meta name="description" content="Play the baby name guessing game with friends!" />
</svelte:head>

<div class="multiplayer-page">
	<GuessLineChartMultiplayer />
</div>

<style>
	.multiplayer-page {
		min-height: 100vh;
		padding: 20px;
		background: white;
	}

	@media (max-width: 768px) {
		.multiplayer-page {
			padding: 0;
		}
	}
</style>
