<script>
	import data from "$data/all_animals_other_removed.csv";
	import _ from "lodash";
	import BookAutocomplete from "./BookAutocomplete.svelte";

	let { description } = $props();

	const normalizePronoun = (p) => {
		if (p === "he/him" || p === "she/her") return p;
		return "other";
	};
	const pronounColors = {
		"she/her": "var(--color-pink)",
		"he/him": "var(--color-blue)",
		other: "var(--color-gray-700)"
	};
	const pronounOrder = ["other", "she/her", "he/him"];
	const animalCounts = _.countBy(data, "animal_group");

	let selectedId = $state(null);
	let titleFilter = $state(null);
	let animalFilter = $state("");
	let pronounFilter = $state("");
	let hoveredId = $state(null);
	let tooltipCoords = $state({ x: 0, y: 0 });

	let filteredData = $derived(
		data.filter((d) => {
			const matchesAnimalFilter =
				!animalFilter || d.animal_group === animalFilter;
			const matchesPronounFilter =
				!pronounFilter || normalizePronoun(d.pronoun) === pronounFilter;

			let matchesTitleFilter = true;
			if (titleFilter) {
				const searchTerm = titleFilter.toLowerCase();

				if (
					searchTerm.includes(" — ") &&
					searchTerm.includes("(") &&
					searchTerm.includes(")")
				) {
					// User clicked a formatted option like "Goodnight Moon (1947) — Margaret Wise Brown"
					const titlePart = titleFilter.split("(")[0].trim();
					matchesTitleFilter = d.title
						.toLowerCase()
						.includes(titlePart.toLowerCase());
				} else {
					// User is typing freely - search both title and author
					const titleContainsSearch = d.title
						.toLowerCase()
						.includes(searchTerm);
					const authorContainsSearch =
						d.author && d.author.toLowerCase().includes(searchTerm);
					matchesTitleFilter = titleContainsSearch || authorContainsSearch;
				}
			}

			return matchesAnimalFilter && matchesPronounFilter && matchesTitleFilter;
		})
	);
	let filteredSortedData = $derived(
		_.orderBy(
			filteredData,
			[
				(d) => animalCounts[d.animal_group],
				"animal_group",
				(d) => pronounOrder.indexOf(normalizePronoun(d.pronoun))
			],
			["desc", "asc", "desc"]
		).map((d, i) => ({
			...d,
			id: i
		}))
	);
	let filteredAnimalCounts = $derived(() =>
		_.countBy(
			data.filter(
				(d) => !pronounFilter || normalizePronoun(d.pronoun) === pronounFilter
			),
			"animal_group"
		)
	);

	let groupedByPronoun = $derived(() =>
		_.groupBy(filteredSortedData, (d) => normalizePronoun(d.pronoun))
	);

	let bookTitles = $derived(
		[
			...new Set(
				data
					.filter((d) => {
						return (
							(!animalFilter || d.animal_group === animalFilter) &&
							(!pronounFilter || normalizePronoun(d.pronoun) === pronounFilter)
						);
					})
					.map(
						(d) =>
							`${d.title.split("(")[0].trim()} (${d.pub_year}) — ${d.author || "Unknown"}`
					)
			)
		].sort()
	);

	let pronounBreakdown = $derived(() => {
		const counts = _.countBy(filteredSortedData, (d) =>
			d.pronoun === "he/him" || d.pronoun === "she/her" ? d.pronoun : "other"
		);
		const total = _.sum(Object.values(counts));

		return Object.entries(counts)
			.map(([pronoun, count]) => ({
				pronoun,
				count,
				percent: (count / total) * 100,
				color: pronounColors[pronoun] || pronounColors.other
			}))
			.sort((a, b) => b.percent - a.percent); // Sort by percentage, highest first
	});

	let hoveredData = $derived(
		filteredSortedData.find((d) => d.id === hoveredId)
	);

	const onMouseEnter = (e) => {
		if (selectedId !== null) return;

		hoveredId = +e.target.id;
		const rect = e.target.getBoundingClientRect();
		const overHalfwayAcross = rect.left + rect.width > window.innerWidth / 2;
		const x = rect.left + (overHalfwayAcross ? -200 : rect.width);
		const y = rect.top + rect.height + window.scrollY;
		tooltipCoords = { x, y };
	};
</script>

<h3>Explore All Animal Characters</h3>
<div class="description">
	<span>{@html description}</span>
</div>

<div class="controls">
	<div>
		<div>Search by title</div>
		<BookAutocomplete
			options={bookTitles}
			bind:bindValue={titleFilter}
			placeholder="Ex: Goodnight Moon"
		/>
	</div>

	<div>
		<label for="animal-select">Filter by animal</label>
		<select id="animal-select" bind:value={animalFilter}>
			<option value="">All animals</option>
			{#each _.orderBy(Object.keys(filteredAnimalCounts()), (d) => filteredAnimalCounts()[d], "desc") as animal_group}
				<option value={animal_group}>
					{_.upperFirst(animal_group)}
				</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="pronoun-select">Filter by pronoun</label>
		<select id="pronoun-select" bind:value={pronounFilter}>
			<option value="">All pronouns</option>
			{#each ["he/him", "she/her", "other"] as pronoun}
				<option value={pronoun}>{_.upperFirst(pronoun)}</option>
			{/each}
		</select>
	</div>
</div>

<div class="bar">
	{#if pronounBreakdown().length > 0}
		{#each pronounBreakdown() as { pronoun, percent, color }}
			<div
				class="bar-segment"
				style={`width: ${percent}%; background: ${color}`}
				title={`${pronoun}: ${percent.toFixed(1)}%`}
			>
				<div class="bar-label">
					<strong>{_.upperFirst(pronoun)}</strong>: {percent.toFixed(1)}%
				</div>
			</div>
		{/each}
	{:else}
		<!-- Invisible placeholders to keep height -->
		<div
			class="bar-segment"
			style="flex: 1; background: var(--color-gray-300); opacity: 0.5;"
		></div>
	{/if}
</div>

<div
	class="tooltip"
	class:visible={hoveredId !== null}
	style="top: {tooltipCoords.y}px; left: {tooltipCoords.x}px;"
>
	<div class="animal-name">{_.upperFirst(hoveredData?.animal_group)}</div>
	<span
		class={`pronoun ${hoveredData?.pronoun === "she/her" ? "she" : hoveredData?.pronoun === "he/him" ? "he" : "neutral"}`}
		style:background={pronounColors[hoveredData?.pronoun] || null}
	>
		{hoveredData?.pronoun}
	</span>
	<a
		href={hoveredData?.goodreads_link}
		target="_blank"
		rel="noopener noreferrer"
		onclick={(e) => e.stopPropagation()}
		><img class="cover" src={hoveredData?.book_cover_image} /></a
	>
	<div class="title">
		{hoveredData?.title}
	</div>
	<div class="author">By {hoveredData?.author}</div>
	<div class="pub_date">{hoveredData?.pub_year}</div>
</div>

{#if filteredSortedData.length > 0}
	{#if animalFilter || titleFilter}
		{#each ["he/him", "she/her", "other"] as pronoun}
			{#if groupedByPronoun()[pronoun]?.length > 0}
				<h3>{pronoun}</h3>
				<div class="grid">
					{#each groupedByPronoun()[pronoun] as d, i}
						<div
							id={d.id}
							class="animal"
							style={`--rotate: ${_.sample([-5, 5])}deg`}
							onmouseenter={onMouseEnter}
							onmouseleave={() => {
								if (selectedId === null) hoveredId = null;
							}}
						>
							<img
								class="icon"
								src={`assets/animals/${d.animal_group}.png`}
								alt={d.animal_group}
							/>
						</div>
					{/each}
				</div>
			{/if}
		{/each}
	{:else}
		<div class="grid">
			{#each filteredSortedData as d, i}
				<div
					id={d.id}
					class="animal"
					style={`--rotate: ${_.sample([-5, 5])}deg`}
					onmouseenter={onMouseEnter}
					onmouseleave={() => {
						if (selectedId === null) hoveredId = null;
					}}
				>
					<img
						class="icon"
						src={`assets/animals/${d.animal_group}.png`}
						alt={d.animal_group}
					/>
				</div>
			{/each}
		</div>
	{/if}
{:else}
	<div>
		<img
			class="icon"
			src="assets/animals/no-animal.png"
			alt="No animal found"
			style="width: 100px; margin: auto;"
		/>
	</div>
	<p style="text-align: center; font-style: italic; margin: 0;">
		No animals found.
	</p>
{/if}

<style>
	.grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
		grid-auto-rows: 40px;
		gap: 0.5rem;
	}

	.description {
		/* display: flex; */
		/* align-items: center; */
		/* gap: 2rem; */
		font-size: var(--18px);
		/* justify-content: space-between; */
		margin-bottom: 1rem;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 2rem;
		font-size: var(--20px);
	}

	.controls > div {
		display: flex;
		flex-direction: column;
	}

	.controls > div:first-child {
		flex: 1;
	}

	.controls > div:last-child {
		display: flex;
		flex-direction: column;
		align-items: end;
	}

	select {
		border: 4px solid black;
	}

	h3 {
		text-align: center;
	}

	button,
	select {
		font-family: var(--sans);
	}

	.animal {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin: -5px;
		font-size: 11px;
	}

	.animal:hover {
		transform: scale(1.1) rotate(var(--rotate));
		cursor: pointer;
	}

	.show-gender.animal:hover {
		border: 2px solid black;
	}

	.icon {
	}

	.show-gender .icon {
		filter: grayscale(1);
	}

	.tooltip {
		z-index: 1000;
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: auto;
		background: white;
		width: 220px;
		padding: 1rem;
		display: none;
		flex-direction: column;
		align-items: center;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	.tooltip.visible {
		display: flex;
	}

	.pronoun {
		font-size: var(--20px);
		padding: 0 4px;
	}

	.animal-name {
		font-size: var(--14px);
	}

	.title {
		text-align: center;
		font-size: var(--18px);
		font-weight: bold;
		line-height: 1.2;
	}

	.author {
		text-align: center;
		font-size: var(--14px);
	}

	.pub_date {
		text-align: center;
		font-size: var(--14px);
	}

	img.cover {
		width: 100px;
		border: 2px solid black;
		border-radius: 5px;
		margin: 0.5rem 0;
	}

	.bar {
		display: flex;
		width: 100%;
		height: 32px;
		margin: 3rem 0 2rem 0;
		border-radius: var(--border-radius);
		border: 4px solid var(--color-fg);
	}

	.bar-segment {
		position: relative;
		height: 100%;
		border-right: 4px solid var(--color-fg);
	}

	.bar-segment:last-child {
		border-right: none;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.bar-segment:first-child {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	.bar-label {
		position: absolute;
		top: 0;
		line-height: 1;
		transform: translateY(calc(-100% - 6px));
		font-size: var(--14px);
		white-space: nowrap;
	}

	.bar-segment:nth-of-type(3) .bar-label {
		right: 0;
	}

	@media (max-width: 600px) {
		h3 {
			font-size: var(--28px);
		}

		.description {
			flex-direction: column;
			gap: 0;
		}

		.controls {
			font-size: var(--18px);
		}

		.controls > div:first-child {
			flex: none;
			width: 100%;
		}

		.grid {
			grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
			grid-auto-rows: 36px;
		}

		.animal {
			margin: -8px;
		}

		.bar-segment:nth-of-type(1) .bar-label,
		.bar-segment:nth-of-type(2) .bar-label {
			transform: translate(0, 50%);
			left: 6px;
		}
	}
</style>
