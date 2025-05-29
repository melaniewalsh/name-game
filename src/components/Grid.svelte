<script>
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

	let sortedData = _.sortBy(data, [
		"animal",
		(d) => {
			if (d.pronoun === "she/her") return 1;
			if (d.pronoun === "he/him") return 2;
			return 3;
		}
	]).map((d, i) => ({
		...d,
		id: i
	}));

	let hoveredId = $state(3);
	let hoveredData = $derived(sortedData.find((d) => d.id === hoveredId));
	let tooltipCoords = $state({ x: 0, y: 0 });

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

<div class="controls">
	<p>filter by: animal, gender</p>
	<p>sort by: animal, gender</p>
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
		<div class="animal">{hoveredData?.animal}</div>
		<img class="cover" src={hoveredData?.book_cover_image} />
		<div class="title">{hoveredData?.title}</div>
		<div class="author">By {hoveredData?.author}</div>
	</div>

	{#each sortedData as d, i}
		<div
			id={d.id}
			class="animal"
			onmouseenter={onMouseEnter}
			onmouseleave={() => (hoveredId = null)}
		>
			{#if haveImages.includes(d.animal)}
				<img src={`assets/animals/${d.animal}.png`} alt={d.animal} />
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
		grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
		grid-auto-rows: 50px;
	}

	.animal {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 11px;
		text-align: center;
	}

	.animal:hover {
		transform: scale(1.1) rotate(5deg);
		cursor: pointer;
	}

	.tooltip {
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
