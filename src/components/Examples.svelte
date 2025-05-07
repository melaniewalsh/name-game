<script>
	let { examples, caption, pre } = $props();

	const gap = 32;

	let ordered = $state(examples);

	const onClick = () => {
		const first = ordered.shift();
		ordered.push(first);
	};
</script>

<figure class="examples" style={`--gap: ${gap}px; --n: ${examples.length}`}>
	<!-- <div class="pre">{@html pre}</div> -->

	<div class="quotes">
		{#each examples as example}
			{@const index = ordered.indexOf(example)}
			<blockquote
				class="example"
				class:highlight={index === 0}
				style:top={`${index * gap}px`}
				style:z-index={ordered.length - index}
				style:transform={`scale(${1 - index * 0.1})`}
			>
				<span>"{@html example}"</span>
			</blockquote>
		{/each}
	</div>

	<button onclick={onClick}>another example</button>
	<figcaption class="sr-only">{@html caption}</figcaption>
</figure>

<style>
	figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 3rem auto 4rem auto;
	}

	.quotes {
		position: relative;
		width: 100%;
		max-width: 550px;
		min-height: calc(345px + var(--gap) * (var(--n) - 1));
	}

	figcaption {
		font-size: var(--12px);
		color: var(--color-gray-800);
		margin: 1rem 0;
	}

	blockquote {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-gray-50);
		border: 4px solid var(--color-gray-600);
		padding: 4rem 2rem;
		font-style: italic;
		font-size: var(--28px);
		font-family: var(--mono);
		transition:
			transform 0.3s,
			top 0.3s,
			background-color 0.3s;
		height: 345px;
	}

	blockquote.highlight {
		background: var(--color-gray-300);
	}

	button {
		text-transform: uppercase;
		font-size: var(--14px);
	}
</style>
