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
		background: var(--color-button-bg);
		color: var(--color-button-fg);
		border-radius: var(--border-radius);
	}

	summary {
		cursor: pointer;
		padding: var(--16px);
		user-select: none;
	}

	div {
		font-size: var(--16px);
		padding: var(--16px);
		background: var(--color-white);
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
	}
</style>
