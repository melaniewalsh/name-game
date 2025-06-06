<script>
	import clockSvg from "$svg/clock.svg";
	import arrowSvg from "$svg/arrow-left.svg";

	let { summary, content, id, C, components } = $props();

	let open = $state(summary.open);
</script>

<details bind:open id={`${id}-collapsible`}>
	<summary class:open>
		<div class="top">
			<div class="panel">
				<h2>{summary.title}</h2>
				<div class="read-more">
					<span>{@html clockSvg}</span>Click to read more ({summary.time})
				</div>
			</div>

			<div class="panel">
				<ul>
					{#each summary.questions as q}
						<li>{q}</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="arrow" class:down={open} class:up={!open}>
			{@html arrowSvg}
		</div>
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

<style>
	section,
	details {
		margin: 0 auto 4rem auto;
		max-width: var(--col-width);
	}

	summary {
		position: relative;
		background: transparent;
		border: 4px solid var(--color-fg);
		list-style: none;
		border-radius: var(--border-radius);
		background: var(--color-orange-light);
		padding: 1rem 2rem;
	}

	summary.open {
		margin-bottom: 3rem;
	}

	summary:hover {
		cursor: pointer;
	}

	.top {
		display: flex;
		gap: 1rem;
	}

	ul {
		margin-left: 2rem;
	}

	li {
		line-height: 1.125;
		margin: 0.25rem 0;
	}

	.panel {
		flex: 1;
		padding: 1rem;
		background: white;
		border-radius: 8px;
	}

	.panel:first-of-type {
		align-items: center;
		justify-content: space-evenly;
		display: flex;
		flex-direction: column;
	}

	.panel:nth-of-type(2) {
		font-size: var(--22px);
	}

	.read-more {
		display: flex;
		font-weight: bold;
		text-decoration: underline;
		font-size: var(--18px);
	}

	.read-more span {
		margin-right: 0.3rem;
	}

	.arrow {
		position: absolute;
		bottom: 0;
		right: 50%;
		transform: translate(50%, 50%);
		background: var(--color-blue-light);
		border: 3px solid black;
		border-radius: 1rem;
		padding: 0.5rem;
	}

	:global(.arrow.down svg) {
		transform: rotate(270deg);
	}

	:global(.arrow.up svg) {
		transform: rotate(90deg);
	}

	:global(.arrow svg path) {
		stroke: black;
		stroke-width: 3px;
		fill: var(--color-blue);
	}

	summary h2 {
		font-size: var(--64px);
		margin: 1rem;
		text-align: center;
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

	#conclusion-collapsible h2,
	#methods-collapsible h2 {
		font-size: var(--48px);
	}

	@media (max-width: 768px) {
		.top {
			flex-direction: column;
		}
	}
</style>
