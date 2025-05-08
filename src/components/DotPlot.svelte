<script>
	import Shelf from "$components/Shelf.svelte";
	import booksData from "$data/dot-plot-books.csv";
	import surveyData from "$data/dot-plot-survey.csv";
	import chatData from "$data/dot-plot-chat.csv";
	import { scaleLinear } from "d3-scale";
	import animalBooksData from "$data/top-books.csv";

	const { id, title, sub } = $props();

	let selectedAnimal = $state("bird");

	// Sort by ratings and select unique books
	let shelfData = $derived(
	Array.from(
		new Map(
		animalBooksData
			.filter((d) => d.animal_group === selectedAnimal)
			.sort((a, b) => Number(b.num_ratings) - Number(a.num_ratings))
			.map((book) => [book.title, book])  
		).values()
	)
	);

	const margin = {
		top: 40,
		right: 45,
		bottom: 10,
		left: 80
	};

	let svgWidth = $state(0);
	let svgHeight = $state(0);
	let chartWidth = $derived(svgWidth - margin.right - margin.left);
	let chartHeight = $derived(svgHeight - margin.top - margin.bottom);

	const dataOptions = {
		books: booksData,
		survey: surveyData,
		chat: chatData
	};
	const data = dataOptions[id];
	const xScale = $derived(
		scaleLinear().domain([0, 100]).range([0, chartWidth])
	);
	const xGet = (d) => +d.proportion_female * 100;
	const xAxisLabels = [
		"100% he/him",
		"75% he/him",
		"Equal",
		"75% she/her",
		"100% she/her"
	];
	const yScale = $derived(
		scaleLinear().domain([0, data.length]).range([0, chartHeight])
	);

	const emojiClicked = (e) => {
		selectedAnimal = e.target.id;
	};
</script>

<figure id={`dot-plot-${id}`}>
	<h3>{title}</h3>
	{#if sub}<h4>{sub}</h4>{/if}

	<div
		class="chart-container"
		bind:clientWidth={svgWidth}
		bind:clientHeight={svgHeight}
	>
		<svg>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<g class="y-axis">
					{#each data as d, i}
						<line
							x1="-15"
							y1={yScale(i)}
							x2={chartWidth + 15}
							y2={yScale(i)}
							stroke="var(--color-gray-200)"
						/>
						<text x="-20" y={yScale(i)}>{d.animal}</text>
					{/each}
				</g>

				<g class="x-axis">
					{#each [0, 25, 50, 75, 100] as d, i}
						<line
							x1={xScale(d)}
							y1="-15"
							x2={xScale(d)}
							y2={chartHeight - 15}
							stroke="var(--color-gray-200)"
							class:equal={d === 50}
						/>
						<text x={xScale(d)} y={chartHeight}>{xAxisLabels[i]}</text>
					{/each}

					<text x={xScale(50) - 15} y={-30} style:text-anchor={"end"}
						>{"<-"} more he/him</text
					>
					<text x={xScale(50) + 15} y={-30} style:text-anchor={"start"}
						>more she/her {"->"}</text
					>
				</g>

				<g class="animals">
					{#each data as d, i}
						<text
							id={d.animal}
							x={xScale(xGet(d))}
							y={yScale(i)}
							onclick={emojiClicked}
							class:selected-animal={d.animal === selectedAnimal}
						>
							{d.emoji}
						</text>
					{/each}
				</g>
			</g>
		</svg>
	</div>
</figure>

{#if id === "books"}
	<Shelf animal={selectedAnimal} books={shelfData}/>
{/if}

<style>
	.chart-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		height: 400px;
	}

	h3 {
		font-size: var(--24px);
		text-align: center;
	}

	h4 {
		font-size: var(--14px);
		text-align: center;
	}

	svg {
		width: 100%;
		height: 100%;
	}

	line.equal {
		stroke: var(--color-gray-800);
		stroke-width: 2px;
		stroke-dasharray: 10;
	}

	.x-axis text {
		font-size: var(--12px);
		text-anchor: middle;
	}

	.y-axis text {
		font-size: var(--14px);
		text-anchor: end;
		dominant-baseline: middle;
	}

	.animals text {
		font-size: var(--24px);
		text-anchor: middle;
		dominant-baseline: middle;
		cursor: pointer;

	}

	text.selected-animal {
		font-size: var(--40px);
	}
</style>
