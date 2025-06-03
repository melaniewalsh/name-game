<script>
	import booksData from "$data/dot-plot-books.csv";
	import surveyData from "$data/dot-plot-survey.csv";
	import chatData from "$data/dot-plot-chat.csv";
	import allData from "$data/dot-plot-all.csv";
	import { scaleLinear } from "d3-scale";

	const { id, title, sub } = $props();

	const dataOptions = {
		books: booksData,
		survey: surveyData,
		chat: chatData,
		all: allData
	};
	const data = dataOptions[id];
	const labelWidth = 72;
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
</script>

<figure id={`dot-plot-${id}`} class:one-line={oneLine}>
	<h3>{title}</h3>
	{#if sub}<p>{sub}</p>{/if}

	<div class="inner">
		<div
			class="arrows"
			style:margin-left={`${oneLine ? 0 : margin.left}px`}
			style:width={oneLine ? "100%" : `${chartWidth}px`}
		>
			<div>&larr; more he/him</div>
			<div>more she/her &rarr;</div>
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
								style:left={`${xScale(xGet(d))}px`}
							>
								<img
									src="assets/animals/{d.animal}.png"
									alt="{d.animal} illustration"
								/>
							</div>
							{#if id === "books" && selectedAnimal === d.animal}
								<!-- <Shelf animal={selectedAnimal} books={shelfData} /> -->
							{/if}
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
	</div>
</figure>

<style>
	.arrows {
		font-size: var(--14px);
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.inner {
		/* border: 8px solid var(--color-pink); */
		border-radius: 16px;
		/* background: var(--color-yellow); */
		padding: 8px;
		padding-bottom: 36px;
		margin-top: 16px;
	}

	.rows {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-right: 4rem;
		margin-top: 1rem;
	}

	.row {
		position: relative;
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
		width: 100%;
	}

	.line:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		opacity: 0.5;
		border-top: 1px dashed var(--color-fg);
	}

	.animal {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		position: absolute;
		top: 0;
		transform: translate(0, -50%);
		width: 72px;
		height: 72px;
		line-height: 1;
		box-shadow: none;
		overflow: hidden;
	}

	.animal img {
		width: 100%;
		pointer-events: none;
		filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
	}

	.label {
		font-size: var(--18px);
		text-align: end;
	}

	.animal {
		position: absolute;
		top: 0;
		line-height: 1;
		transform: translate(0, -50%);
		z-index: 2;
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
		transform: translate(-50%, 50%);
		white-space: nowrap;
		font-size: var(--14px);
	}

	.vertical {
		width: 1px;
		height: 100%;
		background: var(--color-fg);
		opacity: 0.5;
	}

	.equal {
		background: var(--color-fg);
		opacity: 0.5;
		width: 2px;
	}

	figure {
		margin: 3rem 0;
	}

	h3 {
		text-align: center;
		margin-bottom: 0;
	}

	p {
		text-align: center;
		margin-top: 0;
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
