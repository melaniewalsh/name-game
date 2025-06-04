<script>
	// components: an object of components that map to section names (e.g., { "Hero": Hero }) where Hero is a Svelte component
	// body: an array of objects that contain a {section, content} obj
	let { components = {}, body = [] } = $props();
</script>

{#each body as { section, content, summary }}
	<!-- replace all non alpha numeric characters with "" -->
	{@const id = section.toLowerCase().replace(/[^a-z0-9]/g, "")}
	{@const C = components[section]}
	{#if summary}
		<details class="collapsible-section">
			<summary>
				<div class="top">
					<h2>{summary.title}</h2>
					<ul>
						{#each summary.questions as q}
							<li>{q}</li>
						{/each}
					</ul>
				</div>
				<div class="read-more">Click to read more ({summary.time})</div>
			</summary>

			<section {id}>
				{#if C}
					<C {...content} />
				{:else}
					{#each content as { type, value }}
						{@const C = components[type]}
						{@const isString = typeof value === "string"}
						{#if C}
							<C {...value} />
						{:else if type === "text"}
							<p>{@html value}</p>
						{:else if isString}
							<svelte:element this={type}>
								{@html value}
							</svelte:element>
						{:else}
							<svelte:element this={type} {...value}></svelte:element>
						{/if}
					{/each}
				{/if}
			</section>
		</details>
	{:else}
		<section {id}>
			{#if C}
				<C {...content} />
			{:else}
				{#each content as { type, value }}
					{@const C = components[type]}
					{@const isString = typeof value === "string"}
					{#if C}
						<C {...value} />
					{:else if type === "text"}
						<p>{@html value}</p>
					{:else if isString}
						<svelte:element this={type}>
							{@html value}
						</svelte:element>
					{:else}
						<svelte:element this={type} {...value}></svelte:element>
					{/if}
				{/each}
			{/if}
		</section>
	{/if}
{/each}

<style>
	section,
	.collapsible-section {
		margin: 0 auto 4rem auto;
		max-width: var(--col-width);
	}

	summary {
		background: transparent;
		border: 4px solid var(--color-fg);
		padding: 1rem 2rem;
		list-style: none;
		border-radius: var(--border-radius);
	}

	summary:hover {
		cursor: pointer;
	}

	.top {
		display: flex;
	}

	summary h2 {
		width: 40%;
	}

	summary ul {
		width: 60%;
	}

	.read-more {
		background: black;
		color: white;
		width: fit-content;
		padding: 0 0.25rem;
		font-size: var(--20px);
	}
	@media (max-width: 768px) {
		.top {
			flex-direction: column;
		}

		summary h2,
		summary ul {
			width: 100%;
		}

		.read-more {
			margin-top: 0.5rem;
		}
	}
</style>
