<script>
	const { summary, details } = $props();
</script>

<details>
	<summary>{summary}</summary>
	<div>
		{#if details}
			{#each details as { type, value }}
				<p>{@html value}</p>
			{/each}
		{/if}
	</div>
</details>

<style>
	details {
		padding: var(--16px);
		background: var(--color-purple);
		border-radius: var(--border-radius);
		color: var(--color-white);
	}

	summary {
		cursor: pointer;
	}
</style>
