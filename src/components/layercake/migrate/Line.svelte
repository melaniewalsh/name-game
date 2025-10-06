<script>
	/*******************************
	 * Imports
	 *******************************/
	import { LayerCake, Svg, groupLonger, flatten } from "layercake";
	import AxisX from "$components/helpers/layercake/migrate/AxisX.svg.svelte";
	import AxisY from "$components/helpers/layercake/migrate/AxisY.svg.svelte";
	import MultiLine from "$components/layercake/future/MultiLine.svelte";
	import { timeFormat } from "d3-time-format";
	import { scaleOrdinal } from "d3-scale";
	import { extent as d3extent, max as d3max } from "d3-array";

	// Your CSV loader (like in your ladybug example) returns an ARRAY of row objects.
	import rawBabynames from "$data/ssa_babynames.csv";

	/*******************************
	 * Config & UI state
	 *******************************/
	const xKey = "date"; // LayerCake x field
	const yKey = "value"; // LayerCake y field
	const zKey = "sex"; // LayerCake group field ("F" or "M")

	// Inputs (feel free to turn into props)
	let inputName = $state("Emma"); // case-insensitive match
	let inputSex = $state("All"); // "All" | "F" | "M"

	// Axis formatters
	const formatTickX = timeFormat("%Y");

	const formatTickY = (n) => {
		const a = Math.abs(n);
		const [d, s] =
			a >= 1e9
				? [1e9, "B"]
				: a >= 1e6
					? [1e6, "M"]
					: a >= 1e3
						? [1e3, "k"]
						: [1, ""];
		const v = n / d;
		const r =
			v >= 10 || Number.isInteger(v) ? Math.round(v) : Math.round(v * 10) / 10;
		return `${r}${s}`;
	};

	// Colors for F/M (match your design tokens if you have them)
	const zScale = scaleOrdinal();
	const zRange = ["var(--color-pink, #e75480)", "var(--color-blue, #1f77b4)"]; // [F, M]

	// Chart padding (tweak as you like)
	const padding = $state({ top: 20, right: 90, bottom: 26, left: 42 });

	/*******************************
	 * Data normalization
	 *******************************/
	// Normalize loader rows -> { year, name, sex, n } with clean types.
	const normalized = $derived(() => {
		if (!Array.isArray(rawBabynames)) return [];
		const out = [];
		for (const row of rawBabynames) {
			const year = Number(row.year ?? row.Year ?? row["﻿year"]);
			const name = String(row.name ?? row.Name ?? "").trim();
			const sex = String(row.sex ?? row.Sex ?? "")
				.trim()
				.toUpperCase(); // "F"|"M"
			const n = Number(row.n ?? row.N ?? row.count ?? NaN);
			if (!Number.isFinite(year) || !name || !Number.isFinite(n)) continue;
			if (sex !== "F" && sex !== "M") continue;
			out.push({ year, name, sex, n });
		}
		return out;
	});

	// Year domain present in the dataset (inclusive).
	const yearDomain = $derived(() => {
		const ext = d3extent(normalized, (d) => d.year);
		return ext?.every(Number.isFinite) ? ext : [1880, 2025];
	});

	/*******************************
	 * Shape data for LayerCake
	 *******************************/
	// Which series to show?
	const seriesKeys = $derived(() =>
		inputSex === "All" ? ["F", "M"] : [inputSex]
	);

	// Build a "wide" table indexed by year for the chosen name:
	//   { date: Date, F: count, M: count }
	const wideRows = $derived(() => {
		const want = inputName?.toLowerCase()?.trim();
		if (!want || !normalized.length) return [];

		// collect rows for the chosen name
		const rowsForName = normalized.filter((r) => r.name.toLowerCase() === want);

		// index counts by (year, sex)
		const byYearSex = new Map(); // key `${year}|${sex}` -> n
		for (const r of rowsForName) byYearSex.set(`${r.year}|${r.sex}`, r.n);

		// produce dense year rows from domain
		const [y0, y1] = yearDomain;
		const out = [];
		for (let y = y0; y <= y1; y++) {
			const f = byYearSex.get(`${y}|F`) ?? 0;
			const m = byYearSex.get(`${y}|M`) ?? 0;
			out.push({ [xKey]: new Date(y, 0, 1), F: f, M: m });
		}
		return out;
	});

	// Convert wideRows to LayerCake's grouped "long" shape:
	// groupLonger(data, ["F","M"], { groupTo: zKey, valueTo: yKey })
	const groupedData = $derived(() =>
		groupLonger(wideRows, ["F", "M"], { groupTo: zKey, valueTo: yKey })
	);

	// "Flat" variant LayerCake uses internally for scales, etc.
	const flatData = $derived(() => flatten(groupedData, "values"));

	// Compute yDomain based on what’s visible
	const yDomain = $derived(() => {
		const visibleSet = new Set(seriesKeys);
		const maxVal =
			d3max(
				flatData.filter((d) => visibleSet.has(d[zKey])),
				(d) => d[yKey]
			) ?? 1;
		return [0, maxVal];
	});

	// Tell MultiLine which series are visible right now
	const visible = $derived(() => seriesKeys);

	// Optional dev hints (quick sanity check)
	$effect(() => {
		// console.log("rows:", normalized.length, "years:", yearDomain, "name:", inputName, "vis:", visible);
	});
</script>

<!-- Controls -->
<div class="controls">
	<label>
		Name
		<input
			type="text"
			bind:value={inputName}
			placeholder="e.g., Emma, Michael"
			spellcheck="false"
			autocapitalize="none"
		/>
	</label>

	<label>
		Sex
		<select bind:value={inputSex}>
			<option value="All">All</option>
			<option value="F">Female</option>
			<option value="M">Male</option>
		</select>
	</label>
</div>

<!-- Chart -->
<div class="chart-container">
	<LayerCake
		{padding}
		x={xKey}
		y={yKey}
		z={zKey}
		{yDomain}
		yReverse={false}
		{zScale}
		{zRange}
		{flatData}
		data={groupedData}
		xNice={true}
	>
		<Svg>
			<AxisX gridlines={false} ticks={5} formatTick={formatTickX} />
			<AxisY formatTick={formatTickY} />
			<MultiLine {visible} />
		</Svg>
	</LayerCake>
</div>

<style>
	.controls {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		margin: 0.25rem 0 0.5rem;
		font:
			14px/1.2 system-ui,
			-apple-system,
			Segoe UI,
			Roboto,
			Helvetica,
			Arial;
	}
	.controls label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}
	input,
	select {
		padding: 6px 8px;
		border: 1px solid color-mix(in oklab, currentColor 20%, transparent);
		border-radius: 8px;
		background: var(--color-bg, #fff);
		color: var(--color-fg, #222);
		font: inherit;
	}
	.chart-container {
		width: 100%;
		height: 360px; /* LayerCake sizes to container; adjust as needed */
	}
</style>
