<script>
	const { values } = $props();
</script>

<ul>
	{#each values as value, i}
		<li id={`footnote-${i + 1}`}>
			{@html value}
		</li>
	{/each}
</ul>
