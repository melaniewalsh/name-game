<script>
	import _ from "lodash";

	let currentIndex = $state(8);
	let interval;
	const accessories = [
		{ id: "bowtie", top: "66%", width: 90 },
		{ id: "glasses", top: "34%", left: "51%", width: 150 },
		{ id: "mustache", top: "50%", left: "51%", width: 120 },
		{ id: "cap", top: "10%" },
		{ id: "tophat", top: "4%" },
		{ id: "girl_glasses", top: "35%", left: "50.5%", width: 160 },
		{ id: "hair", top: "26%", left: "50.5%", width: 250 },
		{ id: "lips", top: "58%", left: "50.8%", width: 40 },
		{ id: "tiara", top: "14%", left: "49%", width: 90 }
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

		if (visualIndex < -3) return -150; // if you want to hide offscreen
		if (visualIndex > 3) return 150;

		return visualIndex * 50 + 50;
	};
</script>

<div class="wrapper">
	<img class="bear" src="assets/hero/bear.png" />

	{#each _.shuffle(accessories) as { id, top, left, width }, i}
		{@const active = i === currentIndex}
		<img
			class="accessory"
			class:active
			class:hidden={getPosition(i) >= 150 || getPosition(i) <= -150}
			alt={id}
			src={`assets/hero/${id}.png`}
			style:width={width ? `${width}px` : "100px"}
			style:left={left && active ? `${left}` : `${getPosition(i)}%`}
			style:top
		/>
	{/each}
</div>

<style>
	.wrapper {
		height: 320px;
		margin-top: 3rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		/* width: 200px;
		margin: 0 auto; */
	}

	.bear {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		width: 200px;
		/* width: 100%; */
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
