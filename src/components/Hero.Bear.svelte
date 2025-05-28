<script>
	let currentIndex = $state(0);
	let interval;
	const accessories = [
		{ id: "bowtie", top: "70%" },
		{ id: "glasses", top: "30%", width: 150 },
		{ id: "mustache", top: "50%" },
		{ id: "cap", top: "0%" },
		{ id: "tophat", top: "-10%" },
		{ id: "bowtie", top: "70%" },
		{ id: "glasses", top: "30%", width: 150 },
		{ id: "mustache", top: "50%" },
		{ id: "cap", top: "0%" },
		{ id: "tophat", top: "-10%" }
	];

	$effect(() => {
		interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % accessories.length;
		}, 2500);

		return () => {
			clearInterval(interval);
		};
	});

	const getPosition = (i) => {
		const total = accessories.length;
		const diff = (i - currentIndex + total) % total;

		const visualIndex = diff > total / 2 ? diff - total : diff;

		if (visualIndex < -3) return -400; // if you want to hide offscreen
		if (visualIndex > 3) return 400;

		return visualIndex * 100 + 50;
	};
</script>

<div class="wrapper">
	<img class="bear" src="assets/hero/bear.png" />

	{#each accessories as { id, top, width }, i}
		<img
			class="accessory"
			class:active={i === currentIndex}
			class:hidden={getPosition(i) >= 400 || getPosition(i) <= -400}
			alt={id}
			src={`assets/hero/${id}.png`}
			style:width={width ? `${width}px` : "100px"}
			style:left={`${getPosition(i)}%`}
			style:top
		/>
	{/each}
</div>

<style>
	.wrapper {
		height: 250px;
		margin-top: 3rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200px;
		margin: 0 auto;
	}

	.bear {
		position: absolute;
		width: 100%;
	}

	.accessory {
		position: absolute;
		transform: translate(-50%, 0);
		opacity: 0.5;
		transition:
			left 0.8s ease,
			opacity 0.8s ease;
	}

	.active {
		opacity: 1;
	}

	.hidden {
		opacity: 0;
	}
</style>
