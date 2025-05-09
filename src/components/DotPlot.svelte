<script>
	import Shelf from "$components/Shelf.svelte";
	import booksData from "$data/dot-plot-books.csv";
	import surveyData from "$data/dot-plot-survey.csv";
	import chatData from "$data/dot-plot-chat.csv";
	import allData from "$data/dot-plot-all.csv";
	import { scaleLinear } from "d3-scale";
	import animalBooksData from "$data/top-books.csv";

	const { id, title, sub } = $props();

	const dataOptions = {
		books: booksData,
		survey: surveyData,
		chat: chatData,
		all: allData
	};
	const data = dataOptions[id];

	let oneLine = id === "all";
	const margin = {
		top: 40,
		right: 45,
		bottom: 10,
		left: oneLine ? 45 : 80
	};

	let selectedAnimal = $state(data[0].animal);
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

	let svgWidth = $state(0);
	let svgHeight = $state(0);
	let chartWidth = $derived(svgWidth - margin.right - margin.left);
	let chartHeight = $derived(svgHeight - margin.top - margin.bottom);

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
		scaleLinear()
			.domain(oneLine ? [0, 1] : [0, data.length])
			.range([0, chartHeight])
	);

	const emojiClicked = (e) => {
		if (id !== "books") return;
		selectedAnimal = e.target.id;
	};

	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			emojiClicked(e);
		}
	};
</script>

<figure id={`dot-plot-${id}`}>
	<h3>{title}</h3>
	{#if sub}<h4>{sub}</h4>{/if}

	<div
		class="chart-container"
		class:one-line={oneLine}
		bind:clientWidth={svgWidth}
		bind:clientHeight={svgHeight}
	>
		<svg>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<g class="y-axis">
					{#each data as d, i}
						{#if !oneLine}
							<line
								x1="-15"
								y1={yScale(i)}
								x2={chartWidth + 15}
								y2={yScale(i)}
								stroke="var(--color-gray-200)"
							/>
						{/if}
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
						{#if id === "books"}
							<circle
								cx={xScale(xGet(d))}
								cy={yScale(i) - 2}
								r="18"
								stroke="var(--color-gray-600)"
								stroke-width="2"
								fill="none"
								class="highlight"
								class:visible={d.animal === selectedAnimal}
							/>
						{/if}

						<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
						<text
							id={d.animal}
							x={xScale(xGet(d))}
							y={oneLine ? yScale(0.5) : yScale(i)}
							class:faded={d.animal !== selectedAnimal && id === "books"}
							onclick={emojiClicked}
							onkeydown={onKeyDown}
							tabindex={id === "books" ? 0 : -1}
							role={id === "books" ? "button" : undefined}
							aria-label={`Select ${d.animal}`}
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
	<Shelf animal={selectedAnimal} books={shelfData} />
{/if}

<style>
	figure {
		margin: 3rem 0;
	}

	.chart-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		height: 400px;
	}

	.chart-container.one-line {
		height: 175px;
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
		transition: opacity calc(var(--1s) * 0.2) ease-in-out;
	}

	.animals text.faded {
		opacity: 0.7;
	}

	circle.highlight {
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.2) ease-in-out;
	}

	circle.highlight.visible {
		opacity: 1;
	}

	@media (max-width: 600px) {
		figure {
			margin: 2rem 0;
		}

		h3 {
			font-size: var(--20px);
		}

		h4 {
			font-size: var(--12px);
		}

		.x-axis text:nth-of-type(2),
		.x-axis text:nth-of-type(4) {
			display: none;
		}

		.chart-container {
			height: 350px;
		}

		.chart-container.one-line {
			height: 150px;
		}
	}

	@media (max-width: 400px) {
		h3 {
			font-size: var(--18px);
		}
	}
</style>
