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
		background: var(--color-button-bg);
		color: var(--color-button-fg);
		border-radius: var(--border-radius);
	}

	summary {
		cursor: pointer;
	}

	div {
		font-size: var(--16px);
	}
</style>
