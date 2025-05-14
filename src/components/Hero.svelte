<script>
	const { title, description, byline } = $props();
</script>

<section id="hero">
	<h1>{title}</h1>
	<p><strong>{description}</strong></p>
	<p class="byline">{@html byline}</p>
</section>

<style>
	h1,
	p {
		text-align: center;
	}

	.byline {
		font-size: var(--18px);
	}
</style>
