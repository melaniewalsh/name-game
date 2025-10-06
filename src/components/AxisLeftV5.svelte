<script>
	import { ticks as d3ticks } from "d3-array";

	// Props (Svelte 5 runes)
	const {
		width = 0,
		height = 0,
		margin = { top: 0, right: 0, bottom: 0, left: 0 },
		yScale, // required: d3 scale
		position = "left", // 'left' | 'right' (left only is fine)
		ticks = undefined, // optional explicit tick array
		tick_number = 6, // fallback number of ticks
		format = (d) => d // optional formatter
	} = $props();

	// Derived values
	const y0 = $derived(height - margin.bottom);
	const y1 = $derived(margin.top);
	const axisX = $derived(
		position === "right" ? width - margin.right : margin.left
	);
	const tickValues = $derived(() => {
		if (!yScale) return [];
		// Prefer scale.ticks if available (linear), otherwise approximate with d3ticks
		if (typeof yScale.ticks === "function") return yScale.ticks(tick_number);
		const [d0, d1] = yScale.domain?.() ?? [0, 1];
		return d3ticks(d0, d1, tick_number);
	});
	const tickSize = 6;
</script>

<g class="axis-left">
	<!-- Axis baseline -->
	<line x1={axisX} x2={axisX} y1={y0} y2={y1} class="axis-line" />

	<!-- Ticks -->
	{#each tickValues as t}
		{#if Number.isFinite(yScale(t))}
			<line
				x1={axisX}
				x2={axisX - tickSize}
				y1={yScale(t)}
				y2={yScale(t)}
				class="tick-line"
			/>
			<text
				x={axisX - tickSize - 4}
				y={yScale(t)}
				text-anchor="end"
				alignment-baseline="middle"
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
