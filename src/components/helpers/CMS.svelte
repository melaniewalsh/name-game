<script>
	import Collapsible from "$components/helpers/CMS.Collapsible.svelte";

	// components: an object of components that map to section names (e.g., { "Hero": Hero }) where Hero is a Svelte component
	// body: an array of objects that contain a {section, content} obj
	let { components = {}, body = [] } = $props();
</script>

{#each body as { section, content, summary }}
	<!-- replace all non alpha numeric characters with "" -->
	{@const id = section.toLowerCase().replace(/[^a-z0-9]/g, "")}
	{@const C = components[section]}
	{#if summary}
		<Collapsible {summary} {content} {id} {C} {components} />
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
