<!-- Versus.svelte - Two-name comparison chart -->

<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import confetti from "canvas-confetti";
	import { base } from "$app/paths";

	// Props
	const {
		csvUrl = `${base}/data/ssa_babynames_filtered.csv`,
		height = 360,
		defaultName1 = "Charlotte",
		defaultName2 = "Isabella",
		startHidden = true,
		startYear: propStartYear = 1880,
		showControls = true
	} = $props();

	// State
	let name1 = $state(defaultName1);
	let name2 = $state(defaultName2);
	const shouldStartHidden = startHidden === true || startHidden === "true";
	let isHidden = $state(shouldStartHidden);
	let guess1 = $state("");
	let guess2 = $state("");
	let correct1 = $state(false);
	let correct2 = $state(false);
	let showFeedback = $state(false);
	let startYear = $state(
		typeof propStartYear === "string" ? parseInt(propStartYear) : propStartYear
	);

	// Autocomplete for name selection
	let name1Input = $state("");
	let name2Input = $state("");
	let name1Suggestions = $state([]);
	let name2Suggestions = $state([]);
	let name1SelectedIndex = $state(-1);
	let name2SelectedIndex = $state(-1);
	let sex1 = $state("All"); // Filter by sex for name1: All, M, or F
	let sex2 = $state("All"); // Filter by sex for name2: All, M, or F

	let all = [];
	let svg,
		container,
		line1Path,
		line2Path,
		xAxis,
		yAxis,
		hoverG,
		hoverLine,
		hoverDot1,
		hoverDot2,
		hoverRect;
	let width = $state(0);
	let x, y, line;
	let yearRange = [1880, 2025];
	let tooltip = $state({
		show: false,
		x: 0,
		y: 0,
		year: 0,
		name1: "",
		count1: 0,
		name2: "",
		count2: 0
	});
	let uniqueNames = [];

	const margin = { top: 10, right: 10, bottom: 30, left: 35 };
	const color1 = "#6B46C1"; // purple
	const color2 = "#E85D75"; // pink/red

	// Load data
	onMount(async () => {
		const rows = await d3.csv(csvUrl, (d) => {
			const year = +d.year;
			const name = String(d.name).trim();
			const sex = String(d.sex).trim().toUpperCase();
			const n = +d.n;
			if (!Number.isFinite(year) || !name || !Number.isFinite(n)) return;
			if (sex !== "F" && sex !== "M") return;
			return { year, name, sex, n };
		});
		all = rows.filter(Boolean);

		// Get unique names
		const nameSet = new Set(all.map((d) => d.name));
		uniqueNames = Array.from(nameSet).sort();

		initChart();
		render();
	});

	function initChart() {
		svg = d3.select(container).select("svg");
		const g = svg.select("g.inner");

		line1Path = g
			.append("path")
			.attr("class", "line1")
			.attr("fill", "none")
			.attr("stroke", color1)
			.attr("stroke-width", 3);
		line2Path = g
			.append("path")
			.attr("class", "line2")
			.attr("fill", "none")
			.attr("stroke", color2)
			.attr("stroke-width", 3);

		xAxis = g.append("g").attr("class", "axis x-axis");
		yAxis = g.append("g").attr("class", "axis y-axis");

		// Hover elements
		hoverG = g
			.append("g")
			.attr("class", "hover-group")
			.style("display", "none");
		hoverLine = hoverG
			.append("line")
			.attr("stroke", "#999")
			.attr("stroke-width", 1)
			.attr("stroke-dasharray", "4,4");
		hoverDot1 = hoverG
			.append("circle")
			.attr("r", 5)
			.attr("fill", color1)
			.attr("stroke", "white")
			.attr("stroke-width", 2);
		hoverDot2 = hoverG
			.append("circle")
			.attr("r", 5)
			.attr("fill", color2)
			.attr("stroke", "white")
			.attr("stroke-width", 2);
		hoverRect = g
			.append("rect")
			.attr("class", "hover-rect")
			.attr("fill", "transparent");

		x = d3.scaleTime();
		y = d3.scaleLinear();
		line = d3
			.line()
			.x((d) => x(d.date))
			.y((d) => y(d.count))
			.curve(d3.curveMonotoneX);
	}

	function buildSeries(name, sexFilter) {
		const want = name.trim().toLowerCase();
		let filt = all.filter((d) => d.name.toLowerCase() === want);
		if (sexFilter !== "All") {
			filt = filt.filter((d) => d.sex === sexFilter);
		}
		const yearMap = new Map();
		filt.forEach((d) => {
			yearMap.set(d.year, (yearMap.get(d.year) ?? 0) + d.n);
		});
		const ser = [];
		for (let yv = startYear; yv <= 2024; yv++) {
			const count = yearMap.get(yv) ?? 0;
			ser.push({ date: new Date(yv, 0, 1), count });
		}
		return ser;
	}

	function render() {
		if (!all.length) return;

		const W = Math.max(0, width);
		const H = height;
		const iw = Math.max(0, W - margin.left - margin.right);
		const ih = Math.max(0, H - margin.top - margin.bottom);

		svg.attr("width", W).attr("height", H);
		d3.select(container)
			.select(".inner")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		const series1 = buildSeries(name1, sex1);
		const series2 = buildSeries(name2, sex2);

		const allCounts = [
			...series1.map((d) => d.count),
			...series2.map((d) => d.count)
		];
		const maxCount = Math.max(1, d3.max(allCounts) ?? 1);

		x.domain([new Date(startYear, 0, 1), new Date(2025, 0, 1)]).range([0, iw]);
		y.domain([0, maxCount]).nice().range([ih, 0]);

		line1Path.attr("d", line(series1));
		line2Path.attr("d", line(series2));

		// Axes
		const isMobile = width < 600;
		const tickInterval = isMobile ? 20 : 10;
		const visibleYearStart = Math.ceil(startYear / tickInterval) * tickInterval;
		const majorTicks = d3
			.range(visibleYearStart, 2026, tickInterval)
			.map((y) => new Date(y, 0, 1));

		const xAxisGen = d3
			.axisBottom(x)
			.tickValues(majorTicks)
			.tickFormat(d3.timeFormat("%Y"));
		const yAxisGen = d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s"));

		xAxis.attr("transform", `translate(0,${ih})`).call(xAxisGen);
		yAxis.call(yAxisGen);

		// Hover interaction
		hoverRect.attr("width", iw).attr("height", ih);
		hoverLine.attr("y1", 0).attr("y2", ih);

		hoverRect
			.on("mousemove", function (event) {
				const [mx] = d3.pointer(event);
				const hoveredDate = x.invert(mx);
				const hoveredYear = hoveredDate.getFullYear();

				const dataPoint1 = series1.find(
					(d) => d.date.getFullYear() === hoveredYear
				);
				const dataPoint2 = series2.find(
					(d) => d.date.getFullYear() === hoveredYear
				);

				if (dataPoint1 && dataPoint2) {
					const xPos = x(dataPoint1.date);
					const y1Pos = y(dataPoint1.count);
					const y2Pos = y(dataPoint2.count);

					hoverLine.attr("x1", xPos).attr("x2", xPos);
					hoverDot1.attr("cx", xPos).attr("cy", y1Pos);
					hoverDot2.attr("cx", xPos).attr("cy", y2Pos);
					hoverG.style("display", null);

					// Convert to screen coordinates
					const containerRect = container.getBoundingClientRect();
					tooltip.show = true;
					tooltip.x = containerRect.left + xPos + margin.left;
					tooltip.y = containerRect.top + Math.min(y1Pos, y2Pos) + margin.top;
					tooltip.year = hoveredYear;
					tooltip.name1 = isHidden ? "Purple" : name1;
					tooltip.count1 = dataPoint1.count;
					tooltip.name2 = isHidden ? "Pink" : name2;
					tooltip.count2 = dataPoint2.count;
				}
			})
			.on("mouseleave", () => {
				hoverG.style("display", "none");
				tooltip.show = false;
			});
	}

	$effect(() => {
		if (all.length) render();
		// Track name1, name2, sex1, sex2, and width to trigger re-render
		name1;
		name2;
		sex1;
		sex2;
		width;
	});

	function submitGuess() {
		const g1 = guess1.trim().toLowerCase();
		const g2 = guess2.trim().toLowerCase();
		correct1 = g1 === name1.toLowerCase();
		correct2 = g2 === name2.toLowerCase();
		showFeedback = true;

		if (correct1 && correct2) {
			confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
			setTimeout(() => {
				isHidden = false;
			}, 1000);
		}
	}

	function revealNames() {
		isHidden = false;
		correct1 = true;
		correct2 = true;
	}

	function reset() {
		isHidden = true;
		guess1 = "";
		guess2 = "";
		correct1 = false;
		correct2 = false;
		showFeedback = false;
		name1 = defaultName1;
		name2 = defaultName2;
	}

	function handleName1Input(e) {
		const val = e.target.value;
		name1Input = val;
		if (val.length > 0) {
			name1Suggestions = uniqueNames
				.filter((n) => n.toLowerCase().startsWith(val.toLowerCase()))
				.slice(0, 10);
			name1SelectedIndex = -1;
		} else {
			name1Suggestions = [];
		}
	}

	function handleName2Input(e) {
		const val = e.target.value;
		name2Input = val;
		if (val.length > 0) {
			name2Suggestions = uniqueNames
				.filter((n) => n.toLowerCase().startsWith(val.toLowerCase()))
				.slice(0, 10);
			name2SelectedIndex = -1;
		} else {
			name2Suggestions = [];
		}
	}

	function selectName1(selectedName) {
		name1 = selectedName;
		name1Input = selectedName;
		name1Suggestions = [];
		name1SelectedIndex = -1;
	}

	function selectName2(selectedName) {
		name2 = selectedName;
		name2Input = selectedName;
		name2Suggestions = [];
		name2SelectedIndex = -1;
	}
</script>

<div class="wrapper" bind:clientWidth={width}>
	<h2 class="chart-title">Which Name Is Which?</h2>

	{#if isHidden}
		<div class="possible-names">
			<strong>{name1} vs. {name2}</strong>
		</div>
	{:else}
		<div class="names-revealed">
			<span style="color: {color1}; font-weight: bold;">{name1}</span>
			<span>vs.</span>
			<span style="color: {color2}; font-weight: bold;">{name2}</span>
		</div>
	{/if}

	<div bind:this={container} class="chart-container">
		<svg>
			<g class="inner"></g>
		</svg>
	</div>

	<!-- tooltip outside container -->
	{#if tooltip.show}
		<div
			class="tooltip"
			style="left: {tooltip.x + 10}px; top: {tooltip.y - 10}px;"
		>
			<div class="tooltip-year">{tooltip.year}</div>
			<div style="color: {color1}; font-weight: 600;">
				{tooltip.name1}: {tooltip.count1.toLocaleString()}
			</div>
			<div style="color: {color2}; font-weight: 600;">
				{tooltip.name2}: {tooltip.count2.toLocaleString()}
			</div>
		</div>
	{/if}

	{#if showControls === true || showControls === "true"}
		<div class="controls">
			{#if !isHidden}
				<div class="name-setup">
					<div class="setup-group">
						<label>Choose Name 1 (Purple):</label>
						<div class="autocomplete-wrapper">
							<input
								type="text"
								bind:value={name1Input}
								oninput={handleName1Input}
								placeholder="Type a name..."
							/>
							{#if name1Suggestions.length > 0}
								<ul class="suggestions">
									{#each name1Suggestions as suggestion, i}
										<li
											class:selected={i === name1SelectedIndex}
											onclick={() => selectName1(suggestion)}
										>
											{suggestion}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
						<div class="gender-buttons-inline">
							<button
								class:active={sex1 === "All"}
								onclick={() => (sex1 = "All")}>All</button
							>
							<button class:active={sex1 === "F"} onclick={() => (sex1 = "F")}
								>F</button
							>
							<button class:active={sex1 === "M"} onclick={() => (sex1 = "M")}
								>M</button
							>
						</div>
					</div>
					<div class="setup-group">
						<label>Choose Name 2 (Pink):</label>
						<div class="autocomplete-wrapper">
							<input
								type="text"
								bind:value={name2Input}
								oninput={handleName2Input}
								placeholder="Type a name..."
							/>
							{#if name2Suggestions.length > 0}
								<ul class="suggestions">
									{#each name2Suggestions as suggestion, i}
										<li
											class:selected={i === name2SelectedIndex}
											onclick={() => selectName2(suggestion)}
										>
											{suggestion}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
						<div class="gender-buttons-inline">
							<button
								class:active={sex2 === "All"}
								onclick={() => (sex2 = "All")}>All</button
							>
							<button class:active={sex2 === "F"} onclick={() => (sex2 = "F")}
								>F</button
							>
							<button class:active={sex2 === "M"} onclick={() => (sex2 = "M")}
								>M</button
							>
						</div>
					</div>
				</div>

				<div class="start-row">
					<button
						class="start-btn"
						onclick={() => {
							isHidden = true;
							showFeedback = false;
							guess1 = "";
							guess2 = "";
							correct1 = false;
							correct2 = false;
						}}>Set Names & Start</button
					>
				</div>
			{/if}

			{#if isHidden}
				<div class="possible-names">
					<strong>Guess from these names:</strong>
					{name1}, {name2}
				</div>

				<div class="guess-row">
					<div class="guess-group">
						<label style="color: {color1}">Purple line:</label>
						<select bind:value={guess1}>
							<option value="">-- Select --</option>
							<option value={name1}>{name1}</option>
							<option value={name2}>{name2}</option>
						</select>
					</div>
					<div class="guess-group">
						<label style="color: {color2}">Pink line:</label>
						<select bind:value={guess2}>
							<option value="">-- Select --</option>
							<option value={name1}>{name1}</option>
							<option value={name2}>{name2}</option>
						</select>
					</div>
				</div>

				{#if showFeedback}
					<div class="feedback">
						<span class:correct={correct1} class:wrong={!correct1}>
							{correct1 ? "✓" : "✗"}
							{correct1 ? name1 : "Try again"}
						</span>
						<span class:correct={correct2} class:wrong={!correct2}>
							{correct2 ? "✓" : "✗"}
							{correct2 ? name2 : "Try again"}
						</span>
					</div>
				{/if}

				<div class="button-row">
					<button onclick={submitGuess}>Submit Guesses</button>
					<button onclick={revealNames}>Reveal Names</button>
				</div>
			{:else}
				<!-- <div class="names-revealed">
					<span style="color: {color1}; font-weight: bold;">{name1}</span>
					<span>vs</span>
					<span style="color: {color2}; font-weight: bold;">{name2}</span>
				</div> -->
				<div class="button-row">
					<button onclick={reset}>Reset Game</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.wrapper {
		max-width: 800px;
		margin: 0 auto 40px auto;
	}

	.chart-title {
		font-size: 32px;
		font-weight: 700;
		color: #6b46c1;
		margin: 0 0 20px 0;
	}

	.chart-container {
		position: relative;
	}

	svg {
		width: 100%;
		font-family: "Baloo Bhai 2", sans-serif;
	}

	.tooltip {
		position: fixed;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		padding: 8px 12px;
		border-radius: 4px;
		pointer-events: none;
		font-size: 14px;
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

	.controls {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.guess-row {
		display: flex;
		gap: 12px;
	}

	.guess-group {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.guess-group label {
		font-weight: bold;
		font-size: 14px;
	}

	.guess-group input,
	.guess-group select {
		padding: 10px;
		border: 2px solid #ddd;
		border-radius: 6px;
		font-size: 16px;
	}

	.guess-group input:focus,
	.guess-group select:focus {
		outline: none;
		border-color: #6b46c1;
	}

	.name-setup {
		display: flex;
		gap: 12px;
		padding: 16px 16px 12px 16px;
		background: transparent;
		border-radius: 8px 8px 0 0;
		align-items: flex-end;
	}

	.gender-buttons-inline {
		display: flex;
		gap: 4px;
		margin-top: 6px;
	}

	.gender-buttons-inline button {
		padding: 6px 12px;
		font-size: 13px;
		background: transparent;
		border: 2px solid #999;
		flex: 1;
		color: #333;
	}

	.gender-buttons-inline button.active {
		background: #6b46c1;
		border-color: #6b46c1;
		color: white;
	}

	.start-row {
		padding: 0 16px 16px 16px;
		background: transparent;
		border-radius: 0 0 8px 8px;
	}

	.start-btn {
		width: 100%;
	}

	.setup-group {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.setup-group label {
		font-weight: 600;
		font-size: 14px;
	}

	.autocomplete-wrapper {
		position: relative;
	}

	.autocomplete-wrapper input {
		width: 100%;
		padding: 10px;
		border: 2px solid #ddd;
		border-radius: 6px;
		font-size: 16px;
	}

	.autocomplete-wrapper input:focus {
		outline: none;
		border-color: #6b46c1;
	}

	.suggestions {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: white;
		border: 2px solid #6b46c1;
		border-top: none;
		border-radius: 0 0 6px 6px;
		list-style: none;
		margin: 0;
		padding: 0;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1000;
	}

	.suggestions li {
		padding: 10px;
		cursor: pointer;
	}

	.suggestions li:hover,
	.suggestions li.selected {
		background: #f0e7ff;
	}

	.possible-names {
		padding: 12px;
		/* background: #f0e7ff; */
		/* border-radius: 6px; */
		text-align: center;
		font-size: 26px;
	}

	.feedback {
		display: flex;
		gap: 12px;
		font-size: 18px;
		font-weight: bold;
	}

	.feedback .correct {
		color: green;
	}

	.feedback .wrong {
		color: red;
	}

	.button-row {
		display: flex;
		gap: 12px;
	}

	button {
		padding: 12px 24px;
		font-size: 16px;
		font-family: "Baloo Bhai 2", sans-serif;
		border: none;
		border-radius: 6px;
		background: #6b46c1;
		color: white;
		cursor: pointer;
		font-weight: 600;
	}

	button:hover {
		background: #5a3a9f;
	}

	.names-revealed {
		display: flex;
		gap: 12px;
		font-size: 24px;
		align-items: center;
		justify-content: center;
	}

	:global(.axis) {
		font-size: 16px;
	}

	:global(.axis path),
	:global(.axis line) {
		stroke: #ddd;
	}

	@media (max-width: 768px) {
		.guess-row,
		.name-setup {
			flex-direction: column;
			align-items: center;
		}

		.setup-group {
			align-items: center;
			width: 100%;
			max-width: 400px;
		}

		.setup-group label {
			text-align: center;
		}

		.chart-title {
			font-size: 24px;
		}
	}
</style>
