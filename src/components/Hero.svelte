<script>
	const { title, description, byline } = $props();
</script>

<section id="hero">
	<h1>{title}</h1>
	<p>{description}</p>
	<p class="byline">{byline}</p>
</section>
