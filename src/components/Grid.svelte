<script>
	import Toggle from "$components/helpers/migrate/Toggle.svelte";
	import data from "$data/all_animals.csv";
	import _ from "lodash";

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
		"wolf"
	];
	const pronounColors = {
		"she/her": "var(--color-pink-light)",
		"he/him": "var(--color-blue-light)",
		other: "var(--color-gray-100)"
	};
	const pronounOrder = Object.keys(pronounColors);
	const animalCounts = _.countBy(data, "animal");
	const pronounCounts = _.countBy(data, "pronoun");

	let toggleValue = $state("off");
	let sortBy = $state("animal");
	let animalFilter = $state("");
	let pronounFilter = $state("");
	let hoveredId = $state(null);
	let tooltipCoords = $state({ x: 0, y: 0 });
	let filteredData = $derived(
		data.filter((d) => {
			return (
				(!animalFilter || d.animal === animalFilter) &&
				(!pronounFilter || d.pronoun === pronounFilter)
			);
		})
	);
	let filteredSortedData = $derived(
		sortBy === "animal"
			? _.orderBy(
					filteredData,
					[
						(d) => animalCounts[d.animal],
						"animal",
						(d) => pronounOrder.indexOf(d.pronoun)
					],
					["desc", "asc", "asc"]
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
	};

	const onMouseEnter = (e) => {
		hoveredId = +e.target.id;
		const overHalfwayAcross =
			e.target.offsetLeft + e.target.offsetWidth > window.innerWidth / 2;
		const x = overHalfwayAcross
			? e.target.offsetLeft - 200
			: e.target.offsetLeft + e.target.offsetWidth;
		const y = e.target.offsetTop + e.target.offsetHeight;
		tooltipCoords = { x, y };
	};
</script>

<h2>All Animal Characters</h2>
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
			{#each _.orderBy(Object.keys(animalCounts), (d) => animalCounts[d], "desc") as animal}
				<option value={animal}>{animal} ({animalCounts[animal]})</option>
			{/each}
		</select>
	</div>

	<div>
		<div>Filter by pronoun</div>
		<select bind:value={pronounFilter}>
			<option value="">All pronouns</option>
			{#each Object.keys(pronounColors) as pronoun}
				<option value={pronoun}>{pronoun}</option>
			{/each}
		</select>
	</div>
</div>

<div class="grid">
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
		<div class="animal-name">{hoveredData?.animal}</div>
		<img class="cover" src={hoveredData?.book_cover_image} />
		<div class="title">{hoveredData?.title}</div>
		<div class="author">By {hoveredData?.author}</div>
	</div>

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
			onmouseleave={() => (hoveredId = null)}
		>
			{#if haveImages.includes(d.animal)}
				<img
					class="icon"
					src={`assets/animals/${d.animal}.png`}
					alt={d.animal}
				/>
			{:else}
				{d.animal}
			{/if}
		</div>
	{/each}
</div>

<style>
	.grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
		grid-auto-rows: 40px;
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

	/* button.reset {
		align-self: center;
	} */

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
		pointer-events: none;
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

	img.cover {
		width: 100px;
		border: 2px solid black;
		border-radius: 5px;
		margin: 0.5rem 0;
	}
</style>
