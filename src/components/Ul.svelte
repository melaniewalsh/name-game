<script>
	const { values } = $props();
</script>

<ul>
	{#each values as value}
		<li>
			{@html value}
		</li>
	{/each}
</ul>
