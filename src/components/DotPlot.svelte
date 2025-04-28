<script>
	import booksData from "$data/dot-plot-books.csv";
	import { scaleLinear } from "d3-scale";

	const { id, title, sub } = $props();

	let dataOptions = {
		books: booksData
	};

	let data = dataOptions[id];

	let width = $state(0);
	const xScale = $derived(scaleLinear().domain([0, 100]).range([0, width]));
	const xGet = (d) => +d.proportion_female * 100;

	$inspect({ data, width });
</script>

<figure id={`dot-plot-${id}`}>
	<h3>{title}</h3>
	<div>{sub}</div>

	<div class="chart-container" bind:clientWidth={width}>
		{#each data as d}
			<div class="row">
				<!-- <div class="label">{d.animal_group}</div> -->
				<div class="emoji" style:left={`${xScale(xGet(d))}px`}>{d.emoji}</div>
			</div>
		{/each}
	</div>
</figure>

<style>
	.chart-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.row {
		position: relative;
		display: flex;
		align-items: center;
		height: 2px;
		background: var(--color-gray-200);
	}

	.emoji {
		position: absolute;
		transform: translate(-50%, 0);
	}
</style>
