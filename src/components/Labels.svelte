<script>
	// Minimal label helper. Draws a single text label;
	// if labelfory=true, this is typically your Y-axis label.
	const {
		width = 0,
		height = 0,
		margin = { top: 0, right: 0, bottom: 0, left: 0 },
		label = "",
		labelfory = false,
		xoffset = 0,
		yoffset = 0
	} = $props();

	// Place the label relative to the chart inner area
	const innerLeft = $derived(margin.left);
	const innerTop = $derived(margin.top);
</script>

<g class="labels">
	{#if labelfory}
		<!-- Y-axis label, rotated 90° CCW -->
		<text
			transform={`translate(${innerLeft + xoffset}, ${innerTop + yoffset}) rotate(-90)`}
			text-anchor="middle"
			class="label">{label}</text
		>
	{:else}
		<!-- Plain horizontal label -->
		<text
			x={innerLeft + xoffset}
			y={innerTop + yoffset}
			text-anchor="start"
			class="label">{label}</text
		>
	{/if}
</g>

<style>
	.label {
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
