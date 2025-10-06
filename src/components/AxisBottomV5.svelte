<script>
	import { timeYear } from "d3-time";

	const {
		width = 0,
		height = 0,
		margin = { top: 0, right: 0, bottom: 0, left: 0 },
		xScale, // required: d3 time scale
		tick_number = 6, // how many ticks to try to show
		ticks = undefined, // optional explicit tick array
		format = (d) => d // date => label
	} = $props();

	const y = $derived(height - margin.bottom);
	const x0 = $derived(margin.left);
	const x1 = $derived(width - margin.right);

	const tickValues = $derived(() => {
		if (!xScale) return [];
		if (ticks && Array.isArray(ticks) && ticks.length) return ticks;
		// prefer scale.ticks for time scales
		if (typeof xScale.ticks === "function") return xScale.ticks(tick_number);
		// fallback: yearly step across domain
		const [d0, d1] = xScale.domain?.() ?? [new Date(), new Date()];
		return timeYear.range(
			timeYear.floor(d0),
			d1,
			Math.max(
				1,
				Math.floor((d1 - d0) / (365 * 24 * 3600 * 1000) / tick_number)
			)
		);
	});

	const tickSize = 6;
</script>

<g class="axis-bottom">
	<!-- Axis baseline -->
	<line x1={x0} x2={x1} y1={y} y2={y} class="axis-line" />

	<!-- Ticks -->
	{#each tickValues as t}
		{#if Number.isFinite(xScale(t))}
			<line
				x1={xScale(t)}
				x2={xScale(t)}
				y1={y}
				y2={y + tickSize}
				class="tick-line"
			/>
			<text
				x={xScale(t)}
				y={y + tickSize + 12}
				text-anchor="middle"
				class="tick-label">{format(t)}</text
			>
		{/if}
	{/each}
</g>

<style>
	.axis-line {
		stroke: currentColor;
		opacity: 0.6;
		shape-rendering: crispEdges;
	}
	.tick-line {
		stroke: currentColor;
		opacity: 0.6;
		shape-rendering: crispEdges;
	}
	.tick-label {
		fill: currentColor;
		opacity: 0.85;
		font:
			12px/1.2 system-ui,
			-apple-system,
			Segoe UI,
			Roboto,
			Helvetica,
			Arial;
	}
</style>
