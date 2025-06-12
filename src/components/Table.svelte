<script>
	import _ from "lodash";
	import data from "$data/ladybug.csv";

	let { title } = $props();

	const groupedData = _.groupBy(data, "Group");
</script>

<div class="table">
	<h3>{@html title}🐞</h3>

	<div class="head">
		{#each Object.keys(groupedData) as group}
			<div>{group}</div>
		{/each}
	</div>

	{#each Object.keys(groupedData) as group}
		<div class="column">
			<ul>
				{#each groupedData[group] as item}
					<li>
						<strong>{item.Name}</strong> ({item.Language})
						<span>"{item["English Translation"]}"</span>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	.table {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		font-size: var(--14px);
	}

	.head {
		display: contents;
		font-weight: bold;
	}

	.head div {
		border-bottom: 1px solid currentColor;
		padding-bottom: 0.5rem;
	}

	h3 {
		grid-column: 1 / -1;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		margin: 0;
	}

	li span {
		display: flex;
		padding-left: 1rem;
		font-size: var(--12px);
		color: var(--color-gray-700);
		font-style: italic;
	}
</style>
