<script>
	import Toggle from "$components/helpers/migrate/Toggle.svelte";
	import data from "$data/all_animals.csv";
	import _ from "lodash";
	import BookAutocomplete from "./BookAutocomplete.svelte";

	const haveImages = [
		"bear",
		"bird",
		"cat",
		"dog",
		"duck",
		"elephant",
		"fox",
		"frog",
		"monkey",
		"mouse",
		"pig",
		"rabbit",
		"wolf",
		"dinosaur",
		"lion",
		"owl",
		"spider",
		"hen",
		"fish",
		"cow",
		"reindeer",
		"crow",
		"goat",
		"kangaroo",
		"horse",
		"snake",
		"aardvark",
		"badger",
		"llama",
		"crocodile",
		"squirrel",
		"goose",
		"turtle",
		"tiger",
		"fly",
		"penguin",
		"raccoon",
		"sheep",
		"whale",
		"worm",
		"crab",
		"deer",
		"donkey",
		"hippo",
		"moose",
		"robin",
		"skunk",
		"toad",
		"bat",
		"chicken",
		"cricket",
		"hedgehog",
		"ladybug",
		"ox",
		"rat",
		"bee",
		"butterfly",
		"hog",
		"chameleon",
		"alligator",
		"rooster",
		"ostrich",
		"lizard",
		"mole",
		"pigeon",
		"beaver",
		"sparrow",
		"rhino",
		"boa constrictor",
		"camel",
		"caterpillar",
		"chipmunk",
		"clam",
		"cobra",
		"eagle",
		"firefly",
		"giraffe",
		"gorilla",
		"jellyfish",
		"hyena",
		"koala",
		"opossum",
		"newt",
		"praying mantis",
		"walking stick",
		"seal",
		"snail",
		"stink bug",
		"tortoise",
		"turkey",
		"zebra",
		"eel",
		"flea",
		"armadillo",
		"warthog",
		"flamingo",
		"hawk",
		"iguana",
		"baboon",
		"chimpanzee",
		"dragonfly",
		"jaguar",
		"leopard",
		"dolphin",
		"pony",
		"lobster",
		"guinea pig",
		"luna moth",
		"inchworm",
		"otter",
		"octopus",
		"narwhal",
		"starfish",
		"sloth",
		"porcupine",
		"orangutan",
		"mosquito",
		"squid",
		"swan",
		"meerkat",
		"walrus",
		"vulture",
		"wolverine",
		"moth",
		"yellow jacket",
		"woodchuck",
		"grasshopper",
		"mongoose",
		"mink",
		"falcon",
		"ape",
		"bug",
		"stag beetle",
		"lemming",
		"gecko",
		"groundhog",
		"muskrat",
		"bug"
	];

	let selectedId = $state(null);

	let titleFilter = $state(null);

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
	const pronounCounts = _.countBy(data, "pronoun");

	let toggleValue = $state("off");
	let sortBy = $state("animal");
	let animalFilter = $state("");
	let pronounFilter = $state("");
	let hoveredId = $state(null);
	let tooltipCoords = $state({ x: 0, y: 0 });
	let filteredData = $derived(
		data.filter((d) => {
			const norm = normalizePronoun(d.pronoun);
			return (
				(!animalFilter || d.animal_group === animalFilter) &&
				(!pronounFilter || normalizePronoun(d.pronoun) === pronounFilter) &&
				(!titleFilter ||
					d.title.toLowerCase().includes(titleFilter.toLowerCase()))
			);
		})
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
					.map((d) => d.title.split("(")[0].trim())
			)
		].sort()
	);

	let filteredSortedData = $derived(
		sortBy === "animal"
			? _.orderBy(
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
			: _.orderBy(
					filteredData,
					[
						(d) => pronounCounts[d.pronoun],
						(d) => pronounOrder.indexOf(d.pronoun)
					],
					["desc", "asc"]
				).map((d, i) => ({
					...d,
					id: i
				}))
	);

	let pronounBreakdown = $derived(() => {
		const counts = _.countBy(filteredSortedData, (d) =>
			d.pronoun === "he/him" || d.pronoun === "she/her" ? d.pronoun : "other"
		);
		const total = _.sum(Object.values(counts));
		return Object.entries(counts).map(([pronoun, count]) => ({
			pronoun,
			count,
			percent: (count / total) * 100,
			color: pronounColors[pronoun] || pronounColors.other
		}));
	});

	let hoveredData = $derived(
		filteredSortedData.find((d) => d.id === hoveredId)
	);

	$effect(() => {
		if (sortBy === "gender") toggleValue = "on";
	});

	const reset = () => {
		toggleValue = "off";
		sortBy = "animal";
		animalFilter = "";
		pronounFilter = "";
		titleFilter = "";
	};

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

<!-- global click to clear selected tooltip -->
<svelte:window
	on:click={() => {
		selectedId = null;
		hoveredId = null;
	}}
/>

<h3>Explore All Animal Characters</h3>

<div class="controls">
	<div>
		<div style="visibility: hidden">Reset</div>
		<button class="reset" onclick={reset}>Reset</button>
	</div>

	<Toggle label="Show gender" bind:value={toggleValue} />

	<div>
		<div>Sort by</div>
		<select bind:value={sortBy}>
			{#each ["animal", "gender"] as option}
				<option value={option}>{_.startCase(option)}</option>
			{/each}
		</select>
	</div>

	<div>
		<div>Filter by animal</div>
		<select bind:value={animalFilter}>
			<option value="">All animals</option>
			{#each _.orderBy(Object.keys(filteredAnimalCounts()), (d) => filteredAnimalCounts()[d], "desc") as animal_group}
				<option value={animal_group}>
					{animal_group} ({filteredAnimalCounts()[animal_group]})
				</option>
			{/each}
		</select>
	</div>

	<div>
		<div>Filter by pronoun</div>
		<select bind:value={pronounFilter}>
			<option value="">All pronouns</option>
			{#each ["he/him", "she/her", "other"] as pronoun}
				<option value={pronoun}>{pronoun}</option>
			{/each}
		</select>
	</div>
</div>

<div>
	<BookAutocomplete
		options={bookTitles}
		bind:bindValue={titleFilter}
		placeholder="Search by title"
	/>
</div>
<br />

<div class="bar-labels">
	{#each pronounBreakdown() as { pronoun, percent }}
		<div class="bar-label">
			<strong>{pronoun}</strong>: {percent.toFixed(1)}%
		</div>
	{/each}
</div>

<div class="bar">
	{#each pronounBreakdown() as { pronoun, percent, color }}
		<div
			class="bar-segment"
			style={`width: ${percent}%; background: ${color}`}
			title={`${pronoun}: ${percent.toFixed(1)}%`}
		/>
	{/each}
</div>

<div
	class="tooltip"
	class:visible={hoveredId !== null}
	style="top: {tooltipCoords.y}px; left: {tooltipCoords.x}px;"
>
	<span
		class={`pronoun ${hoveredData?.pronoun === "she/her" ? "she" : hoveredData?.pronoun === "he/him" ? "he" : "neutral"}`}
		style:background={pronounColors[hoveredData?.pronoun] || null}
	>
		{hoveredData?.pronoun}
	</span>
	<div class="animal-name">{hoveredData?.animal_group}</div>
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

{#if animalFilter}
	{#each ["he/him", "she/her", "other"] as pronoun}
		{#if groupedByPronoun()[pronoun]}
			<h3>{pronoun}</h3>
			<div class="grid">
				{#each groupedByPronoun()[pronoun] as d, i}
					<div
						id={d.id}
						class="animal"
						class:show-gender={toggleValue === "on"}
						style:background={toggleValue === "on"
							? pronounColors[d.pronoun] || "var(--color-gray-700)"
							: null}
						style={`--rotate: ${_.sample([-5, 5])}deg`}
						onmouseenter={onMouseEnter}
						onmouseleave={() => {
							if (selectedId === null) hoveredId = null;
						}}
					>
						{#if haveImages.includes(d.animal_group)}
							<img
								class="icon"
								src={`assets/animals/${d.animal_group}.png`}
								alt={d.animal_group}
							/>
						{:else}
							{d.animal_group}
						{/if}
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
				class:show-gender={toggleValue === "on"}
				style:background={toggleValue === "on"
					? pronounColors[d.pronoun] || "var(--color-gray-200)"
					: null}
				style={`--rotate: ${_.sample([-5, 5])}deg`}
				onmouseenter={onMouseEnter}
				onmouseleave={() => {
					if (selectedId === null) hoveredId = null;
				}}
			>
				{#if haveImages.includes(d.animal_group)}
					<img
						class="icon"
						src={`assets/animals/${d.animal_group}.png`}
						alt={d.animal_group}
					/>
				{:else}
					{d.animal_group}
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	.grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
		grid-auto-rows: 40px;
		gap: 0.5rem;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
		align-items: top;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 2rem;
		font-size: var(--20px);
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
		background: var(--color-orange-light);
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

	.animal-name {
		font-size: 11px;
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
		margin: 2rem 0;
		border-radius: var(--border-radius);
		overflow: hidden;
		border: 4px solid var(--color-fg);
	}

	.bar-segment {
		height: 100%;
		border-right: 4px solid var(--color-fg);
	}

	.bar-segment:last-child {
		border-right: none;
	}

	.bar-labels {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
		font-size: 0.875rem;
	}
	.bar-label {
		flex: 1;
		text-align: center;
	}
</style>
