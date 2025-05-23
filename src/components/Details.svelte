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
		background: var(--color-fg);
		color: var(--color-white);
		border-radius: var(--border-radius);
	}

	summary {
		cursor: pointer;
	}
</style>
