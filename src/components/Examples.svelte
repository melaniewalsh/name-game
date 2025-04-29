<script>
	let { examples, caption } = $props();

	const cardW = 400;
	const cardH = 300;
	const gap = 10;
</script>

<figure
	class="examples"
	style={`--card-width: ${cardW}px; --card-height: ${cardH}px; --gap: ${gap}px; --n: ${examples.length}`}
>
	{#each examples as example, i}
		<div class="example" style:top={`${i * gap}px`} style:left={`${i * gap}px`}>
			"{@html example}"
		</div>
	{/each}

	<figcaption>{@html caption}</figcaption>
</figure>

<style>
	figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		width: var(--card-width);
		height: calc(var(--card-height) + ((var(--n) - 1) * var(--gap)));
		margin: 3rem auto 4rem auto;
	}

	figcaption {
		position: absolute;
		top: 100%;
		transform: translate(0, 6px);
		font-size: var(--12px);
		color: var(--color-gray-800);
	}

	.example {
		position: absolute;
		display: flex;
		align-items: center;
		background: var(--color-gray-50);
		border: 2px solid var(--color-gray-600);
		padding: 1rem;
		width: var(--card-width);
		height: var(--card-height);
		font-style: italic;
		font-size: var(--18px);
		font-family: var(--mono);
	}
</style>
