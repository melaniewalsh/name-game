<script>
	import Bear from "$components/Hero.Bear.svelte";
	const { title, description, byline, others } = $props();
</script>

<section id="hero">
	<Bear />

	<div class="c">
		<h1 class="text-outline">{title}</h1>
		<p class="description">{description}</p>
		<p class="byline">{@html byline}</p>
		<p class="others">{@html others}</p>
	</div>
</section>

<style>
	section {
		position: relative;
		max-width: 100%;
		overflow: hidden;
	}

	.c {
		max-width: var(--col-width);
		margin: 0 auto;
	}

	h1 {
		color: var(--color-blue-light);
		--color-text-outline: var(--color-fg);
		--stroke-width: 2px;
		letter-spacing: 0.0325em;
		line-height: 0.9;
		--stroke-width-n: calc(var(--stroke-width) * -1);
		text-shadow:
			var(--stroke-width-n) var(--stroke-width-n) 0
				var(--color-text-outline, #fff),
			0 var(--stroke-width-n) 0 var(--color-text-outline, #fff),
			var(--stroke-width) var(--stroke-width-n) 0
				var(--color-text-outline, #fff),
			var(--stroke-width) 0 0 var(--color-text-outline, #fff),
			var(--stroke-width) var(--stroke-width) 0 var(--color-text-outline, #fff),
			0 var(--stroke-width) 0 var(--color-text-outline, #fff),
			var(--stroke-width-n) var(--stroke-width) 0
				var(--color-text-outline, #fff),
			var(--stroke-width-n) 0 0 var(--color-text-outline, #fff),
			8px 8px var(--color-blue);
	}

	h1,
	p {
		text-align: center;
	}

	.description {
		font-size: var(--32px);
	}

	.byline {
		font-size: var(--18px);
	}

	.others {
		font-size: var(--16px);
	}

	.byline,
	.others {
		margin: 0;
	}
</style>
