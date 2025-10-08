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
	let showCorrectMessage = $state(false);
	let showWrongMessage = $state(false);
	let draggedName = $state(null);
	let dropZone1Highlight = $state(false);
	let dropZone2Highlight = $state(false);
	let dropZone1Position = $state({ top: "20%", left: "60%" });
	let dropZone2Position = $state({ top: "60%", left: "60%" });
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
	let topNames = []; // Top 1000 names by total births

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

		// Calculate top 1000 names by total births across all years
		const nameTotals = new Map();
		all.forEach((d) => {
			nameTotals.set(d.name, (nameTotals.get(d.name) || 0) + d.n);
		});
		topNames = Array.from(nameTotals.entries())
			.sort((a, b) => b[1] - a[1])
			.slice(0, 1000)
			.map(([name]) => name);

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

		// Apply font styling to axis text (both .style() and .attr() for better SVG rendering)
		xAxis
			.selectAll("text")
			.style(
				"font-family",
				"Baloo Bhai 2, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
			)
			.style("font-size", "16px")
			.attr(
				"font-family",
				"Baloo Bhai 2, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
			)
			.attr("font-size", "16px");
		yAxis
			.selectAll("text")
			.style(
				"font-family",
				"Baloo Bhai 2, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
			)
			.style("font-size", "16px")
			.attr(
				"font-family",
				"Baloo Bhai 2, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
			)
			.attr("font-size", "16px");

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

		// Update drop zone positions based on line positions
		if (isHidden && series1.length > 0 && series2.length > 0) {
			// Find a point about 30% through the chart for left drop zone
			const leftYear = Math.floor(startYear + (yearRange[1] - startYear) * 0.3);
			const leftPoint1 =
				series1.find((d) => d.date.getFullYear() >= leftYear) ||
				series1[Math.floor(series1.length * 0.3)];

			// Find a point about 70% through the chart for right drop zone
			const rightYear = Math.floor(
				startYear + (yearRange[1] - startYear) * 0.7
			);
			const rightPoint2 =
				series2.find((d) => d.date.getFullYear() >= rightYear) ||
				series2[Math.floor(series2.length * 0.7)];

			if (leftPoint1 && rightPoint2) {
				const y1Pos = y(leftPoint1.count);
				const y2Pos = y(rightPoint2.count);

				// Convert to percentages relative to chart dimensions
				const topPercent =
					((y1Pos + margin.top) / (ih + margin.top + margin.bottom)) * 100;
				const bottomPercent =
					((y2Pos + margin.top) / (ih + margin.top + margin.bottom)) * 100;

				// Offset vertically to avoid covering the lines
				// Purple line - offset up if space available, otherwise down
				const offset1 = topPercent > 25 ? -15 : 15;
				// Pink line - offset down if space available, otherwise up
				const offset2 = bottomPercent < 75 ? 15 : -15;

				// Left side for purple line, right side for pink line
				dropZone1Position = {
					top: `${Math.max(10, Math.min(80, topPercent + offset1))}%`,
					left: `30%`
				};
				dropZone2Position = {
					top: `${Math.max(10, Math.min(80, bottomPercent + offset2))}%`,
					left: `70%`
				};
			}
		}
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
			showCorrectMessage = true;
			confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
			setTimeout(() => {
				isHidden = false;
				showCorrectMessage = false;
			}, 1000);
		} else {
			// Show wrong message
			showWrongMessage = true;
			setTimeout(() => {
				showWrongMessage = false;
			}, 1500);

			// Reset drag buttons on incorrect guess
			guess1 = "";
			guess2 = "";
			setTimeout(() => {
				showFeedback = false;
			}, 1500);
		}
	}

	function revealNames() {
		isHidden = false;
		correct1 = true;
		correct2 = true;
	}

	function handleDragStart(name) {
		draggedName = name;
	}

	function handleDragEnd() {
		draggedName = null;
		dropZone1Highlight = false;
		dropZone2Highlight = false;
	}

	function handleDrop(lineNumber) {
		if (!draggedName) return;

		if (lineNumber === 1) {
			guess1 = draggedName;
			dropZone1Highlight = false;
		} else if (lineNumber === 2) {
			guess2 = draggedName;
			dropZone2Highlight = false;
		}
		draggedName = null;

		// Auto-submit when both names have been dropped
		setTimeout(() => {
			if (guess1 && guess2) {
				submitGuess();
			}
		}, 100);
	}

	function handleDragOver(event, lineNumber) {
		event.preventDefault();
		if (lineNumber === 1) {
			dropZone1Highlight = true;
		} else if (lineNumber === 2) {
			dropZone2Highlight = true;
		}
	}

	function handleDragLeave(lineNumber) {
		if (lineNumber === 1) {
			dropZone1Highlight = false;
		} else if (lineNumber === 2) {
			dropZone2Highlight = false;
		}
	}

	function reset() {
		isHidden = false;
		guess1 = "";
		guess2 = "";
		correct1 = false;
		correct2 = false;
		showFeedback = false;
		draggedName = null;
		dropZone1Highlight = false;
		dropZone2Highlight = false;
	}

	function pickRandomNames() {
		if (topNames.length < 2) return;

		// Pick two different random names from top 1000
		const idx1 = Math.floor(Math.random() * topNames.length);
		let idx2 = Math.floor(Math.random() * topNames.length);
		while (idx2 === idx1) {
			idx2 = Math.floor(Math.random() * topNames.length);
		}

		name1 = topNames[idx1];
		name2 = topNames[idx2];
		name1Input = name1;
		name2Input = name2;
		isHidden = true;
		guess1 = "";
		guess2 = "";
		correct1 = false;
		correct2 = false;
		showFeedback = false;
		render();
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
	<!-- <h2 class="chart-title">Which Name Is Which?</h2> -->

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

	<div
		bind:this={container}
		class="chart-container"
		style="position: relative;"
	>
		<svg>
			<g class="inner"></g>
		</svg>

		<!-- Correct message overlay -->
		{#if showCorrectMessage}
			<div class="message-overlay correct-overlay">
				<div class="message-text">Correct! 🎉</div>
			</div>
		{/if}

		<!-- Wrong message overlay -->
		{#if showWrongMessage}
			<div class="message-overlay wrong-overlay">
				<div class="message-text">Try Again!</div>
			</div>
		{/if}

		{#if isHidden}
			<!-- Drop zones overlaid on chart -->
			<div
				class="chart-drop-zone"
				class:highlighted={dropZone1Highlight}
				ondragover={(e) => handleDragOver(e, 1)}
				ondragleave={() => handleDragLeave(1)}
				ondrop={() => handleDrop(1)}
				style="border-color: {color1}; top: {dropZone1Position.top}; left: {dropZone1Position.left};"
			>
				<span class="drop-label" style="color: {color1}">
					{guess1 || "↓"}
				</span>
			</div>

			<div
				class="chart-drop-zone"
				class:highlighted={dropZone2Highlight}
				ondragover={(e) => handleDragOver(e, 2)}
				ondragleave={() => handleDragLeave(2)}
				ondrop={() => handleDrop(2)}
				style="border-color: {color2}; top: {dropZone2Position.top}; left: {dropZone2Position.left};"
			>
				<span class="drop-label" style="color: {color2}">
					{guess2 || "↓"}
				</span>
			</div>
		{/if}
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

	<!-- Draggable names - always show when hidden, regardless of showControls -->
	{#if isHidden}
		<div class="drag-drop-instructions">
			<strong>Drag names to the chart lines:</strong>
		</div>

		<div class="draggable-names">
			{#if guess1 !== name1 && guess2 !== name1}
				<div
					class="name-tag"
					class:dragging={draggedName === name1}
					draggable="true"
					ondragstart={() => handleDragStart(name1)}
					ondragend={handleDragEnd}
				>
					{name1}
				</div>
			{/if}
			{#if guess1 !== name2 && guess2 !== name2}
				<div
					class="name-tag"
					class:dragging={draggedName === name2}
					draggable="true"
					ondragstart={() => handleDragStart(name2)}
					ondragend={handleDragEnd}
				>
					{name2}
				</div>
			{/if}
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
						<select bind:value={sex1} class="gender-select">
							<option value="All">All</option>
							<option value="F">Female</option>
							<option value="M">Male</option>
						</select>
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
						<select bind:value={sex2} class="gender-select">
							<option value="All">All</option>
							<option value="F">Female</option>
							<option value="M">Male</option>
						</select>
					</div>
				</div>

				<div class="start-row">
					<button
						class="start-btn"
						onclick={() => {
							console.log('Set Names & Start clicked! Current names:', name1, name2);
							console.log('Setting isHidden to true');
							isHidden = true;
							showFeedback = false;
							guess1 = "";
							guess2 = "";
							correct1 = false;
							correct2 = false;
							console.log('isHidden is now:', isHidden);
						}}>Set Names & Start</button
					>
					<button class="random-btn" onclick={pickRandomNames}
						>Random Names</button
					>
				</div>
			{/if}

			{#if isHidden}
				<div class="button-row">
					<div class="reveal-reset-group">
						<button class="reveal-btn" onclick={revealNames}
							>Reveal Names</button
						>
						<button class="reset-btn" onclick={reset}>Reset</button>
					</div>
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

	.message-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 100;
		animation: fadeInOut 1.5s ease-in-out;
	}

	.message-text {
		font-size: 48px;
		font-weight: 700;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		padding: 20px 40px;
		border-radius: 12px;
	}

	.correct-overlay .message-text {
		color: #4caf50;
		background: rgba(255, 255, 255, 0.95);
	}

	.wrong-overlay .message-text {
		color: #f44336;
		background: rgba(255, 255, 255, 0.95);
	}

	@keyframes fadeInOut {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		20% {
			opacity: 1;
			transform: scale(1);
		}
		80% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0.8);
		}
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

	.drag-drop-instructions {
		text-align: center;
		margin: 16px 0 12px 0;
		font-size: 16px;
	}

	.draggable-names {
		display: flex;
		gap: 12px;
		justify-content: center;
		margin-bottom: 20px;
	}

	.name-tag {
		padding: 12px 24px;
		background: #6b46c1;
		color: white;
		border-radius: 8px;
		cursor: grab;
		font-size: 18px;
		font-weight: 600;
		user-select: none;
		transition: all 0.2s;
	}

	.name-tag:active {
		cursor: grabbing;
		opacity: 0.7;
	}

	.name-tag:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(107, 70, 193, 0.3);
	}

	.name-tag.dragging {
		opacity: 0.3;
	}

	.chart-drop-zone {
		position: absolute;
		padding: 14px 28px;
		border: 3px dashed;
		border-radius: 8px;
		text-align: center;
		transition: all 0.2s;
		background: rgba(255, 255, 255, 0.5);
		pointer-events: all;
		z-index: 10;
		transform: translate(-50%, -50%);
		min-width: 120px;
		min-height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(2px);
	}

	.chart-drop-zone.highlighted {
		background: rgba(255, 255, 255, 0.75);
		border-style: solid;
		border-width: 4px;
		transform: translate(-50%, -50%) scale(1.05);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
	}

	.chart-drop-zone .drop-label {
		font-weight: 700;
		font-size: 18px;
		display: block;
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

	.gender-select {
		width: 100%;
		padding: 10px;
		border: 2px solid #ddd;
		border-radius: 6px;
		font-size: 16px;
		margin-top: 6px;
		background: white;
		cursor: pointer;
	}

	.gender-select:focus {
		outline: none;
		border-color: #6b46c1;
	}

	.start-row {
		padding: 0 16px 16px 16px;
		background: transparent;
		border-radius: 0 0 8px 8px;
		display: flex;
		gap: 12px;
	}

	.start-btn {
		flex: 1;
	}

	.random-btn {
		flex: 1;
		padding: 12px 24px;
		font-size: 18px;
		font-weight: 600;
		background: #4caf50;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.random-btn:hover {
		background: #45a049;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
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
		padding: 8px 14px;
		cursor: pointer;
		transition: background 0.15s;
		font-size: 14px;
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
		font-size: 24px;
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
		justify-content: center;
		align-items: center;
	}

	.reveal-reset-group {
		display: flex;
		gap: 12px;
		justify-content: center;
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

	.reveal-btn {
		padding: 12px 24px;
		font-size: 18px;
		font-weight: 600;
		background: #ff9800;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 140px;
	}

	.reveal-btn:hover {
		background: #f57c00;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3);
	}

	.reset-btn {
		padding: 12px 24px;
		font-size: 18px;
		font-weight: 600;
		background: #999;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 140px;
	}

	.reset-btn:hover {
		background: #777;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(153, 153, 153, 0.3);
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

	:global(.axis path),
	:global(.axis line) {
		stroke: #555;
		shape-rendering: crispEdges;
	}

	@media (max-width: 768px) {
		.guess-row,
		.name-setup {
			flex-direction: row;
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
