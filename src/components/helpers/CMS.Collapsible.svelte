<script>
	import clockSvg from "$svg/clock.svg";
	import arrowSvg from "$svg/arrow-left.svg";

	let { summary, content, id, C, components } = $props();

	let open = $state(summary.open);
</script>

<div class="c">
	<details bind:open id={`${id}-collapsible`}>
		<summary class:open>
			<div class="top">
				<div class="panel">
					<h2>{summary.title}</h2>
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
</div>

<style>
	.c {
		padding: 0 var(--16px);
	}

	section,
	details {
		margin: 0 auto 4rem auto;
		max-width: var(--col-width);
	}

	summary {
		position: relative;
		background: transparent;
		border: 3px solid #6B46C1;
		list-style: none;
		border-radius: var(--border-radius);
		background: #F3EFFF;
		padding: 1.5rem 2rem;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary.open {
		margin-bottom: 3rem;
	}

	summary:hover {
		cursor: pointer;
	}

	.top {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		line-height: 1.4;
		margin: 0.5rem 0;
		font-size: var(--18px);
		color: #6B46C1;
		font-weight: 500;
	}

	.panel {
		width: 100%;
		text-align: center;
	}

	.panel:first-of-type {
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
	}

	.panel:nth-of-type(2) {
		font-size: var(--18px);
	}

	.arrow {
		position: absolute;
		bottom: 0;
		right: 50%;
		transform: translate(50%, 50%);
		background: #B39DDB;
		border: 3px solid #6B46C1;
		border-radius: 1rem;
		padding: 0.5rem;
		height: 60px;
		width: 60px;
	}

	:global(.arrow svg) {
		width: 100%;
		height: 100%;
	}

	:global(.arrow.down svg) {
		transform: rotate(270deg);
	}

	:global(.arrow.up svg) {
		transform: rotate(90deg);
	}

	:global(.arrow svg path) {
		stroke: #6B46C1;
		stroke-width: 3px;
		fill: #6B46C1;
	}

	summary h2 {
		font-size: var(--48px);
		margin: 0.5rem;
		text-align: center;
		color: #6B46C1;
		font-weight: 700;
	}

	#conclusion-collapsible h2,
	#methods-collapsible h2 {
		font-size: var(--40px);
	}

	@media (max-width: 768px) {
		summary h2 {
			font-size: var(--48px);
		}

		ul {
			font-size: var(--18px);
		}

		.top {
			flex-direction: column;
		}
	}
</style>
