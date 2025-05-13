<script>
	import Shelf from "$components/Shelf.svelte";
	import booksData from "$data/dot-plot-books.csv";
	import surveyData from "$data/dot-plot-survey.csv";
	import chatData from "$data/dot-plot-chat.csv";
	import allData from "$data/dot-plot-all.csv";
	import { scaleLinear } from "d3-scale";
	import animalBooksData from "$data/top-books.csv";
	import bearSvg from "$svg/animals/bear.svg";

	const { id, title, sub } = $props();

	const dataOptions = {
		books: booksData,
		survey: surveyData,
		chat: chatData,
		all: allData
	};
	const data = dataOptions[id];
	const labelWidth = 60;
	const margin = {
		left: labelWidth + 10,
		right: 10,
		top: 0,
		bottom: 0
	};

	let oneLine = id === "all";
	let fullWidth = $state(0);
	let chartWidth = $derived(fullWidth - margin.left - margin.right);
	let selectedAnimal = $state(data[0].animal);
	let shelfData = $derived(
		id === "books"
			? Array.from(
					new Map(
						animalBooksData
							.filter((d) => d.animal_group === selectedAnimal)
							.sort((a, b) => Number(b.num_ratings) - Number(a.num_ratings))
							.map((book) => [book.title, book])
					).values()
				).map((d) => {
					let characters = animalBooksData.filter(
						(b) => b.title === d.title && b.animal_group === selectedAnimal
					);
					let groupedByPronoun = characters.reduce((acc, c) => {
						acc[c.pronoun] = (acc[c.pronoun] || 0) + 1;
						return acc;
					}, {});
					return {
						...d,
						characters: groupedByPronoun
					};
				})
			: []
	);

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

<figure id={`dot-plot-${id}`} class:one-line={oneLine}>
	<h3>{title}</h3>
	{#if sub}<h4>{sub}</h4>{/if}

	<div
		class="arrows"
		style:margin-left={`${oneLine ? 0 : margin.left}px`}
		style:width={oneLine ? "100%" : `${chartWidth}px`}
	>
		<div>{"<-"} more he/him</div>
		<div>more she/her {"->"}</div>
	</div>

	<div class="rows" bind:clientWidth={fullWidth}>
		{#if oneLine}
			<div class="row">
				<div class="line">
					{#each data as d, i}
						<div class="animal" style:left={`${xScale(xGet(d))}px`}>
							{d.emoji}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			{#each data as d, i}
				<div class="row">
					<div class="label" style:width={`${labelWidth}px`}>{d.animal}</div>
					<div class="line">
						<div
							id={d.animal}
							class="animal"
							class:clickable={id === "books"}
							class:highlight={selectedAnimal === d.animal}
							style:left={`${xScale(xGet(d))}px`}
							onclick={emojiClicked}
							tabindex={id === "books" ? 0 : -1}
							onkeydown={onKeyDown}
							aria-label={d.animal}
							aria-role="button"
						>
							{d.emoji}
						</div>
					</div>
				</div>
			{/each}
		{/if}

		<div
			class="x-axis"
			style:left={`${oneLine ? "0" : margin.left}px`}
			style:width={`${oneLine ? "100%" : chartWidth + "px"}`}
		>
			{#each xAxisLabels as label, i}
				<div class="marker">
					<div class="vertical" class:equal={label === "Equal"} />
					<div class="label">{label}</div>
				</div>
			{/each}
		</div>
	</div>
</figure>

{#if id === "books"}
	<Shelf animal={selectedAnimal} books={shelfData} />
{/if}

<style>
	.arrows {
		font-size: var(--12px);
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.rows {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-right: 4rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.one-line .rows {
		margin: 0 3rem;
	}

	.one-line .row {
		height: 4rem;
	}

	.one-line .line {
		background: none;
	}

	.line {
		position: relative;
		background: var(--color-gray-50);
		height: 1px;
		width: 100%;
	}

	.label {
		font-size: var(--14px);
		text-align: end;
	}

	.animal {
		position: absolute;
		top: 0;
		line-height: 1;
		transform: translate(0, -50%);
		z-index: 2;
	}

	.animal.clickable:hover {
		cursor: pointer;
	}

	.x-axis {
		position: absolute;
		display: flex;
		justify-content: space-between;
		height: 100%;
		pointer-events: none;
	}

	.marker .label {
		position: absolute;
		transform: translate(-50%, 0);
		white-space: nowrap;
		font-size: var(--12px);
	}

	.vertical {
		width: 1px;
		height: 100%;
		background: var(--color-gray-50);
	}

	.equal {
		background: var(--color-gray-800);
		width: 2px;
	}

	figure {
		margin: 3rem 0;
	}

	h3 {
		font-size: var(--24px);
		text-align: center;
	}

	h4 {
		font-size: var(--14px);
		text-align: center;
	}

	@media (max-width: 600px) {
		.one-line .rows {
			margin: 0 2rem;
		}

		.x-axis .marker:nth-child(2) .label,
		.x-axis .marker:nth-child(4) .label {
			display: none;
		}
	}
</style>
