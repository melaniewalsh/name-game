<!-- LineChart.svelte - Simple line chart with no controls -->

<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import { base } from "$app/paths";

	// ---- props ----
	const props = $props();
	console.log("ALL PROPS:", { ...props });
	console.log("name:", props.name);
	console.log("highlightYears:", props.highlightYears);

	const {
		csvUrl = `${base}/data/ssa_babynames_filtered.csv`,
		height = 360,
		name = "Melanie",
		sex = "All", // 'All' | 'F' | 'M'
		mode = "raw", // 'raw' | 'proportion'
		startYear = 1880,
		title = "Baby Name Popularity",
		sub = "1880-2024",
		highlightYears: propHighlightYears = [] // Array of years to highlight with vertical lines
	} = props;

	// Hardcode highlight years for Melanie
	const highlightYears =
		name.toLowerCase() === "melanie" ? [1972, 1990, 2006] : [];

	// Reactive margin based on mode
	let margin = $derived(
		mode === "proportion"
			? { top: 10, right: 10, bottom: 30, left: 50 }
			: { top: 10, right: 10, bottom: 30, left: 35 }
	);

	// ---- local state / refs ----
	let container;
	let width = $state(0);
	let all = [];
	let yearRange = [1880, 2026];
	let tooltip = $state({ show: false, x: 0, y: 0, year: 0, count: 0, rank: 0 });
	let yearTotals = new Map();
	let nameRankings = new Map();
	let cachedData = [];

	// d3 singletons
	let svg,
		g,
		xAxisG,
		yAxisG,
		gridG,
		lineG,
		highlightG,
		hoverG,
		hoverRect,
		hoverDot,
		hoverLine;
	let x, y, line;

	// formatter
	const fmt = (n, forAxis = false) => {
		if (mode === "proportion") {
			if (forAxis) {
				if (n === 0) return "0%";
				if (n < 0.01) return n.toFixed(3) + "%";
				if (n < 0.1) return n.toFixed(2) + "%";
				return n.toFixed(1) + "%";
			}
			return n.toFixed(3) + "%";
		}
		const a = Math.abs(n);
		const [d, s] =
			a >= 1e9
				? [1e9, "B"]
				: a >= 1e6
					? [1e6, "M"]
					: a >= 1e3
						? [1e3, "k"]
						: [1, ""];
		const v = n / d,
			r =
				v >= 10 || Number.isInteger(v)
					? Math.round(v)
					: Math.round(v * 10) / 10;
		return r + s;
	};

	// Load data
	onMount(async () => {
		const rows = await d3.csv(csvUrl, (d) => {
			const year = +d.year ?? +d.Year ?? +d["\uFEFFyear"] ?? +d["\uFEFFYear"];
			const nm = String(d.name ?? d.Name ?? "").trim();
			const sx = String(d.sex ?? d.Sex ?? "")
				.trim()
				.toUpperCase();
			const n = +(d.n ?? d.N ?? d.count);
			if (!Number.isFinite(year) || !nm || !Number.isFinite(n)) return;
			if (sx !== "F" && sx !== "M") return;
			return { year, name: nm, sex: sx, n };
		});
		all = rows.filter(Boolean);
		const ext = d3.extent(all, (d) => d.year);
		if (Number.isFinite(ext[0]) && Number.isFinite(ext[1])) {
			yearRange = [ext[0], 2030];
		}

		// Calculate totals and rankings
		all.forEach((d) => {
			yearTotals.set(d.year, (yearTotals.get(d.year) || 0) + d.n);
		});

		const yearData = new Map();
		all.forEach((d) => {
			if (!yearData.has(d.year)) yearData.set(d.year, new Map());
			const yearMap = yearData.get(d.year);
			const key = `${d.name}|${d.sex}`;
			yearMap.set(key, (yearMap.get(key) || 0) + d.n);
		});

		yearData.forEach((nameMap, year) => {
			const sorted = Array.from(nameMap.entries())
				.map(([key, count]) => ({ key, count }))
				.sort((a, b) => b.count - a.count);
			nameRankings.set(year, sorted);
		});

		buildSvg();
		render();

		const ro = new ResizeObserver(() => render());
		ro.observe(container);
		return () => ro.disconnect();
	});

	function buildSvg() {
		svg = d3.select(container).append("svg").style("display", "block");
		g = svg.append("g");
		gridG = g.append("g").attr("class", "grid");
		xAxisG = g.append("g").attr("class", "x-axis axis");
		yAxisG = g.append("g").attr("class", "y-axis axis");
		highlightG = g.append("g").attr("class", "highlight-lines");
		lineG = g.append("g");
		hoverG = g.append("g").style("pointer-events", "none");
		hoverLine = hoverG
			.append("line")
			.attr("stroke", "#6B46C1")
			.attr("stroke-width", 1)
			.attr("stroke-dasharray", "4 4")
			.attr("opacity", 0.6);
		hoverDot = hoverG
			.append("circle")
			.attr("r", 5)
			.attr("fill", "#6B46C1")
			.attr("stroke", "white")
			.attr("stroke-width", 2);
		hoverRect = svg
			.append("rect")
			.attr("fill", "none")
			.style("pointer-events", "all")
			.on("mousemove", handleMouseMove)
			.on("mouseleave", () => (tooltip.show = false));
	}

	function render() {
		if (!svg || !width) return;

		const w = width;
		const h = height;
		const innerW = w - margin.left - margin.right;
		const innerH = h - margin.top - margin.bottom;

		svg.attr("width", w).attr("height", h);
		g.attr("transform", `translate(${margin.left},${margin.top})`);

		x = d3.scaleLinear().domain([startYear, yearRange[1]]).range([0, innerW]);
		cachedData = getData();
		const ext = d3.extent(cachedData, (d) => d.value);
		const yMax = ext[1] > 0 ? ext[1] * 1.05 : 1;
		y = d3.scaleLinear().domain([0, yMax]).range([innerH, 0]);

		// Grid
		gridG
			.selectAll("line")
			.data(y.ticks(5))
			.join("line")
			.attr("x1", 0)
			.attr("x2", innerW)
			.attr("y1", (d) => y(d))
			.attr("y2", (d) => y(d))
			.attr("stroke", "#e0e0e0")
			.attr("stroke-width", 1);

		// Axes
		const xAxis = d3
			.axisBottom(x)
			.ticks(Math.floor(innerW / 80))
			.tickFormat(d3.format("d"));
		xAxisG.attr("transform", `translate(0,${innerH})`).call(xAxis);
		const yAxis = d3
			.axisLeft(y)
			.ticks(5)
			.tickFormat((d) => fmt(d, true));
		yAxisG.call(yAxis);

		// Line
		line = d3
			.line()
			.x((d) => x(d.year))
			.y((d) => y(d.value));

		lineG
			.selectAll("path")
			.data([cachedData])
			.join("path")
			.attr("d", line)
			.attr("fill", "none")
			.attr("stroke", "#6b46c1")
			.attr("stroke-width", 3);

		// Highlight year lines
		highlightG
			.selectAll("line")
			.data(highlightYears)
			.join("line")
			.attr("x1", (d) => x(d))
			.attr("x2", (d) => x(d))
			.attr("y1", 0)
			.attr("y2", innerH)
			.attr("stroke", "#6b46c1")
			.attr("stroke-width", 2)
			.attr("stroke-dasharray", "2 2")
			.attr("opacity", 0.3);

		hoverRect
			.attr("width", innerW)
			.attr("height", innerH)
			.attr("transform", `translate(${margin.left},${margin.top})`);
	}

	function getData() {
		const filtered = all.filter((d) => {
			if (d.name.toLowerCase() !== name.toLowerCase()) return false;
			if (sex === "All") return true;
			return d.sex === sex;
		});

		const byYear = d3.rollup(
			filtered,
			(v) => d3.sum(v, (d) => d.n),
			(d) => d.year
		);

		return Array.from(byYear, ([year, count]) => {
			const value =
				mode === "proportion"
					? (count / (yearTotals.get(year) || 1)) * 100
					: count;
			return { year, value };
		}).sort((a, b) => a.year - b.year);
	}

	function handleMouseMove(event) {
		const [mx] = d3.pointer(event);
		const innerW = width - margin.left - margin.right;
		const innerH = height - margin.top - margin.bottom;
		const year = Math.round(x.invert(mx));
		const d = cachedData.find((pt) => pt.year === year);

		if (d) {
			const px = x(d.year);
			const py = y(d.value);
			hoverDot.attr("cx", px).attr("cy", py);
			hoverLine.attr("x1", px).attr("x2", px).attr("y1", py).attr("y2", innerH);

			const rankings = nameRankings.get(year);
			let rank = 0;
			if (rankings) {
				const key = sex === "All" ? null : `${name}|${sex}`;
				if (key) {
					rank = rankings.findIndex((r) => r.key === key) + 1;
				} else {
					const fKey = `${name}|F`;
					const mKey = `${name}|M`;
					const fIdx = rankings.findIndex((r) => r.key === fKey);
					const mIdx = rankings.findIndex((r) => r.key === mKey);
					rank =
						Math.min(
							fIdx === -1 ? Infinity : fIdx,
							mIdx === -1 ? Infinity : mIdx
						) + 1;
				}
			}

			tooltip = {
				show: true,
				x: event.clientX,
				y: event.clientY,
				year,
				count: mode === "proportion" ? d.value : Math.round(d.value),
				rank
			};
		} else {
			tooltip.show = false;
		}
	}

	$effect(() => {
		render();
	});
</script>

<div class="chart-wrapper">
	<h1 class="name-title">Babies Named "{name}"</h1>

	<div
		class="chart-container"
		bind:this={container}
		bind:clientWidth={width}
	></div>
</div>

{#if tooltip.show}
	<div
		class="tooltip"
		style="left: {tooltip.x + 10}px; top: {tooltip.y - 10}px;"
	>
		<div class="tooltip-year">{tooltip.year}</div>
		<div class="tooltip-name">{name}</div>
		<div class="tooltip-count">
			{#if mode === "proportion"}
				{fmt(tooltip.count)} of U.S. babies<br />named {name}
			{:else}
				{fmt(tooltip.count)} U.S. babies<br />named {name}
			{/if}
		</div>
		{#if tooltip.rank > 0}
			<div class="tooltip-rank">
				{tooltip.rank <= 1000
					? `#${tooltip.rank} Most Popular Name`
					: "Outside top 1000"}
			</div>
		{/if}
	</div>
{/if}

<style>
	.chart-wrapper {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	.name-title {
		font-size: 48px;
		color: #6b46c1;
		margin-bottom: 16px;
	}

	.chart-container {
		width: 100%;
	}

	.tooltip {
		position: fixed;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		padding: 8px 12px;
		border-radius: 4px;
		pointer-events: none;
		z-index: 99999;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		white-space: nowrap;
	}

	.tooltip-year {
		color: white;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 2px;
	}

	.tooltip-name {
		color: white;
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 4px;
	}

	.tooltip-count {
		font-size: 14px;
		color: #ddd;
	}

	.tooltip-rank {
		font-size: 13px;
		color: #aaa;
		margin-top: 4px;
		font-style: italic;
	}

	:global(.axis text) {
		font-family:
			"Baloo Bhai 2",
			-apple-system,
			BlinkMacSystemFont,
			Helvetica,
			Arial,
			sans-serif;
		font-size: 16px;
	}

	:global(.x-axis line),
	:global(.y-axis line),
	:global(.x-axis path),
	:global(.y-axis path) {
		stroke: #999;
	}
</style>
