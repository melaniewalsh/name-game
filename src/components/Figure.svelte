<script>
	const { src, alt, caption } = $props();
</script>

<figure>
	<img {src} {alt} />
	{#if caption}
		<figcaption>{@html caption}</figcaption>
	{/if}
</figure>

<style>
	figure {
		display: block;
		width: 100%;
		margin: 2em auto;
		max-width: 20em;
	}

	figure img {
		max-width: 100%;
		height: auto;
		box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		border: 8px solid var(--color-white);
	}

	figcaption {
		font-size: var(--14px);
		text-align: center;
		margin-top: 8px;
		line-height: 1.2;
	}
</style>
