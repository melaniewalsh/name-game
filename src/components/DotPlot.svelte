<!-- OneNameLine.svelte -->

<script>
	/* -----------------------------------------------------------
	 * Minimal plain-D3 line chart in Svelte 5 (runes)
	 * - Shows ONE name (prop: name), optionally filtered by sex
	 * - Reads SSA CSV once in the browser
	 * - Redraws on resize
	 * --------------------------------------------------------- */

	import { onMount } from "svelte";
	import * as d3 from "d3";
	import confetti from "canvas-confetti";
	import { base } from "$app/paths";

	// ---- props (change in parent) ----
	const {
		csvUrl = `${base}/data/ssa_babynames_filtered.csv`, // file in static/data/
		height = 360, // total SVG height
		defaultName = "Emma", // default name to display
		startHidden = false, // start in hidden/guess mode
		startYear: propStartYear = 1880, // start year for x-axis
		showControls = true // show or hide all controls
	} = $props();

	// ---- interactive state ----
	let name = $state(defaultName); // one name to plot (F+M total or single sex)
	let sex = $state("All"); // 'All' | 'F' | 'M'
	let mode = $state("raw"); // 'raw' | 'proportion'
	let startYear = $state(typeof propStartYear === 'string' ? parseInt(propStartYear) : propStartYear);

	// Reactive margin based on mode
	let margin = $derived(
		mode === "proportion"
			? { top: 10, right: 10, bottom: 30, left: 50 }
			: { top: 10, right: 10, bottom: 30, left: 35 }
	);
	let inputValue = $state(defaultName);
	let showSuggestions = $state(false);
	let suggestions = $state([]);
	let selectedIndex = $state(-1);
	let isFullscreen = $state(false);
	let fullscreenContainer;

	// ---- guessing game state ----
	// Handle startHidden as either boolean or string
	const shouldStartHidden = startHidden === true || startHidden === "true";
	let isHidden = $state(shouldStartHidden);
	let hiddenName = $state(shouldStartHidden ? defaultName : "");
	let guessValue = $state("");
	let showGuessSuccess = $state(false);
	let showGuessFeedback = $state(false);
	let isCorrectGuess = $state(false);
	let guessSuggestions = $state([]);
	let showGuessSuggestions = $state(false);
	let guessSelectedIndex = $state(-1);
	let showWrongGuessLine = $state(false);
	let wrongGuessName = $state("");
	let showCelebration = $state(false);

	// ---- local state / refs ----
	let container; // div to hold the svg
	let width = $state(0); // responsive width via bind:clientWidth
	let all = []; // [{year, name, sex, n}]
	let yearRange = [1880, 2026]; // inclusive domain (updated after load)
	let tooltip = $state({ show: false, x: 0, y: 0, year: 0, count: 0, rank: 0 });
	let uniqueNames = [];
	let yearTotals = new Map(); // total births per year for proportion calculation
	let nameRankings = new Map(); // Map of year -> sorted list of {name, count}

	// d3 singletons (created once, updated on render)
	let svg,
		g,
		xAxisG,
		yAxisG,
		gridG,
		lineG,
		hoverG,
		hoverRect,
		hoverDot,
		hoverLine,
		wrongLineG;
	let x, y, line;

	// small y-tick formatter: 1.2k / 3.4M or percentage
	const fmt = (n, forAxis = false) => {
		if (mode === "proportion") {
			if (forAxis) {
				// For y-axis: show minimal decimals, no % sign if too wide
				if (n === 0) return "0%";
				if (n < 0.01) return n.toFixed(3) + "%";
				if (n < 0.1) return n.toFixed(2) + "%";
				return n.toFixed(1) + "%";
			}
			// For tooltip: show 3 decimals for precision
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

	// 1) load & normalize once
	onMount(async () => {
		const rows = await d3.csv(csvUrl, (d) => {
			const year = +d.year ?? +d.Year ?? +d["\uFEFFyear"] ?? +d["\uFEFFYear"];
			const name = String(d.name ?? d.Name ?? "").trim();
			const sex = String(d.sex ?? d.Sex ?? "")
				.trim()
				.toUpperCase();
			const n = +(d.n ?? d.N ?? d.count);
			if (!Number.isFinite(year) || !name || !Number.isFinite(n)) return;
			if (sex !== "F" && sex !== "M") return;
			return { year, name, sex, n };
		});
		all = rows.filter(Boolean);
		const ext = d3.extent(all, (d) => d.year);
		if (Number.isFinite(ext[0]) && Number.isFinite(ext[1])) {
			yearRange = [ext[0], 2030]; // Extend to 2030 to show round decade
		}

		// Get unique names
		const nameSet = new Set(all.map((d) => d.name));
		uniqueNames = Array.from(nameSet).sort();

		// Calculate total births per year and rankings
		all.forEach((d) => {
			yearTotals.set(d.year, (yearTotals.get(d.year) || 0) + d.n);
		});

		// Build rankings for each year (optimized with Maps)
		const yearData = new Map();
		all.forEach((d) => {
			if (!yearData.has(d.year)) yearData.set(d.year, new Map());
			const yearMap = yearData.get(d.year);
			const key = `${d.name}|${d.sex}`;
			yearMap.set(key, (yearMap.get(key) || 0) + d.n);
		});

		// Sort and store rankings
		yearData.forEach((nameMap, year) => {
			const sorted = Array.from(nameMap.entries())
				.map(([key, count]) => {
					const [name, sex] = key.split("|");
					return { name, sex, count };
				})
				.sort((a, b) => b.count - a.count);
			nameRankings.set(year, sorted);
		});

		initOnce();
		render();
	});

	// 2) make SVG scaffolding once
	function initOnce() {
		svg = d3.select(container).append("svg");

		// Add clip path to prevent lines from extending beyond chart
		svg
			.append("defs")
			.append("clipPath")
			.attr("id", "chart-clip")
			.append("rect");

		const gAll = svg.append("g").attr("class", "chart");
		g = gAll.append("g").attr("class", "inner"); // translated later
		gridG = g.append("g").attr("class", "grid-y");
		xAxisG = g.append("g").attr("class", "axis x");
		yAxisG = g.append("g").attr("class", "axis y");
		lineG = g
			.append("g")
			.attr("class", "line")
			.attr("clip-path", "url(#chart-clip)");
		wrongLineG = g
			.append("g")
			.attr("class", "wrong-line")
			.style("display", "none")
			.attr("clip-path", "url(#chart-clip)");
		hoverG = g.append("g").attr("class", "hover");
		hoverLine = hoverG
			.append("line")
			.attr("stroke", "#6B46C1")
			.attr("stroke-width", 1)
			.attr("stroke-dasharray", "4 4")
			.attr("opacity", 0.6)
			.style("display", "none");
		hoverDot = hoverG
			.append("circle")
			.attr("r", 5)
			.attr("fill", "#6B46C1")
			.attr("stroke", "white")
			.attr("stroke-width", 2)
			.style("display", "none");
		hoverRect = hoverG
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

	// 3) for current props & size, build series and draw
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

		// Update clip path dimensions
		svg.select("#chart-clip rect").attr("width", iw).attr("height", ih);

		// build dense per-year series for this name/sex
		const want = (name ?? "").trim().toLowerCase();
		const filt = all.filter(
			(d) => d.name.toLowerCase() === want && (sex === "All" || d.sex === sex)
		);
		const yearMap = new Map();
		filt.forEach((d) => {
			yearMap.set(d.year, (yearMap.get(d.year) ?? 0) + d.n);
		});
		const ser = [];
		const maxDataYear = d3.max(all, (d) => d.year); // Get actual max year with data
		for (
			let yv = yearRange[0];
			yv <= Math.min(yearRange[1], maxDataYear);
			yv++
		) {
			const rawCount = yearMap.get(yv) ?? 0;
			const count =
				mode === "proportion"
					? (rawCount / (yearTotals.get(yv) || 1)) * 100 // percentage
					: rawCount;
			ser.push({ date: new Date(yv, 0, 1), count, rawCount });
		}

		// scales - use user-selected start year
		const minDate = new Date(startYear, 0, 1);
		const maxDate = new Date(yearRange[1], 0, 1); // Use yearRange max (includes padding)
		x.domain([minDate, maxDate]).range([0, iw]);
		y.domain([0, Math.max(1, d3.max(ser, (d) => d.count) ?? 1)])
			.nice()
			.range([ih, 0]);

		// axes & grid - use visible range only
		const isMobile = width < 600;
		const tickInterval = isMobile ? 20 : 10;
		const visibleYearStart = Math.ceil(startYear / tickInterval) * tickInterval;
		const visibleYearEnd =
			Math.floor(d3.max(ser, (d) => d.date.getFullYear()) / tickInterval) *
			tickInterval;
		const majorTicks = d3
			.range(visibleYearStart, visibleYearEnd + 1, tickInterval)
			.map((y) => new Date(y, 0, 1));
		const minorTicks = isMobile
			? []
			: d3
					.range(visibleYearStart - 5, visibleYearEnd + 6, 5)
					.filter((y) => y >= startYear) // Only show minor ticks within visible range
					.map((y) => new Date(y, 0, 1));

		xAxisG
			.attr("transform", `translate(0,${ih})`)
			.call(
				d3
					.axisBottom(x)
					.tickValues(majorTicks)
					.tickFormat((d) => d.getFullYear())
			)
			.call((g) => {
				// Remove old minor ticks
				g.selectAll(".minor-tick").remove();
				// Add minor ticks
				minorTicks.forEach((tick) => {
					const xPos = x(tick);
					if (
						xPos >= 0 &&
						xPos <= iw &&
						!majorTicks.some((mt) => mt.getTime() === tick.getTime())
					) {
						g.append("line")
							.attr("x1", xPos)
							.attr("x2", xPos)
							.attr("y1", 0)
							.attr("y2", 4)
							.attr("stroke", "#555")
							.attr("class", "minor-tick");
					}
				});
			});
		yAxisG.call(
			d3
				.axisLeft(y)
				.ticks(5)
				.tickFormat((d) => fmt(d, true))
		);
		gridG
			.call(
				d3
					.axisLeft(y)
					.ticks(5)
					.tickSize(-iw)
					.tickFormat(() => "")
			)
			.call((g) => g.select(".domain").remove())
			.call((g) =>
				g
					.selectAll(".tick line")
					.attr("stroke", "#999")
					.attr("stroke-dasharray", "2 4")
					.attr("opacity", 0.35)
			);

		// line
		const path = lineG.selectAll("path").data([ser]);
		path.join(
			(enter) =>
				enter
					.append("path")
					.attr("fill", "none")
					.attr("stroke", "#6B46C1")
					.attr("stroke-width", 1.8)
					.attr("d", line),
			(update) => update.attr("d", line)
		);

		// hover interaction
		hoverRect
			.attr("width", iw)
			.attr("height", ih)
			.on("mousemove", (event) => {
				const [mx] = d3.pointer(event);
				const date = x.invert(mx);
				const year = date.getFullYear();
				const dataPoint = ser.find((d) => d.date.getFullYear() === year);
				if (dataPoint) {
					const px = x(dataPoint.date);
					const py = y(dataPoint.count);
					hoverLine
						.attr("x1", px)
						.attr("y1", py)
						.attr("x2", px)
						.attr("y2", ih)
						.style("display", null);
					hoverDot.attr("cx", px).attr("cy", py).style("display", null);

					// Calculate rank for this name/year
					const yearRankings = nameRankings.get(year) || [];
					let rank = 0;
					if (sex === "All") {
						// Sum across both sexes for ranking
						const uniqueRankings = new Map();
						yearRankings.forEach((d) => {
							const n = d.name;
							uniqueRankings.set(n, (uniqueRankings.get(n) || 0) + d.count);
						});
						const sortedUnique = Array.from(uniqueRankings.entries()).sort(
							(a, b) => b[1] - a[1]
						);
						rank = sortedUnique.findIndex(([n]) => n === name) + 1;
					} else {
						// Filter by sex first, then find rank
						const sexFiltered = yearRankings.filter((d) => d.sex === sex);
						rank = sexFiltered.findIndex((d) => d.name === name) + 1;

						// Debug for Emma in 2024
						if (name === "Emma" && year === 2024 && sex === "F") {
							console.log(
								"Top 10 for Female 2024:",
								sexFiltered
									.slice(0, 10)
									.map((d, i) => `${i + 1}. ${d.name} (${d.count})`)
							);
							console.log("Emma rank:", rank);
						}
					}

					tooltip = {
						show: true,
						x: event.clientX,
						y: event.clientY,
						year: dataPoint.date.getFullYear(),
						count: mode === "proportion" ? dataPoint.count : (dataPoint.rawCount || dataPoint.count),
						rank: rank
					};
				}
			})
			.on("mouseleave", () => {
				hoverLine.style("display", "none");
				hoverDot.style("display", "none");
				tooltip = { show: false, x: 0, y: 0, year: 0, count: 0, rank: 0 };
			});
	}

	// Handle input changes
	function handleInput(e) {
		inputValue = e.target.value;
		if (inputValue.trim().length > 0) {
			const search = inputValue.toLowerCase();
			suggestions = uniqueNames
				.filter((n) => n.toLowerCase().startsWith(search))
				.slice(0, 20);
			showSuggestions = suggestions.length > 0;
			selectedIndex = -1;
		} else {
			showSuggestions = false;
		}
	}

	function selectName(selectedName) {
		name = selectedName;
		inputValue = selectedName;
		showSuggestions = false;
		selectedIndex = -1;
	}

	function handleKeydown(e) {
		if (!showSuggestions) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (selectedIndex >= 0) {
				selectName(suggestions[selectedIndex]);
			} else if (suggestions.length > 0) {
				selectName(suggestions[0]);
			}
		} else if (e.key === "Escape") {
			showSuggestions = false;
		}
	}

	function handleBlur() {
		// Delay to allow click on suggestion
		setTimeout(() => {
			showSuggestions = false;
			// Update name if input is valid
			if (
				uniqueNames.some((n) => n.toLowerCase() === inputValue.toLowerCase())
			) {
				name = uniqueNames.find(
					(n) => n.toLowerCase() === inputValue.toLowerCase()
				);
			}
		}, 200);
	}

	// Guessing game functions
	function hideNameForGuessing() {
		hiddenName = name;
		isHidden = true;
		guessValue = "";
		showGuessSuccess = false;
	}

	function revealName() {
		if (document.fullscreenElement) {
			showCelebration = true;
			setTimeout(() => {
				showCelebration = false;
			}, 5000);
		} else {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 }
			});
		}
		isHidden = false;
		hiddenName = "";
		guessValue = "";
		inputValue = "";
		showGuessSuggestions = false;
		showSuggestions = false;
		showGuessSuccess = false;
		showGuessFeedback = false;
		isCorrectGuess = false;
	}

	function resetGame() {
		isHidden = false;
		hiddenName = "";
		guessValue = "";
		inputValue = "";
		showGuessSuggestions = false;
		showSuggestions = false;
		showGuessSuccess = false;
		showGuessFeedback = false;
		isCorrectGuess = false;
	}

	function handleGuessInput(e) {
		guessValue = e.target.value;
		if (guessValue.trim().length > 0) {
			const search = guessValue.toLowerCase();
			guessSuggestions = uniqueNames
				.filter((n) => n.toLowerCase().startsWith(search))
				.slice(0, 20);
			showGuessSuggestions = guessSuggestions.length > 0;
			guessSelectedIndex = -1;
		} else {
			showGuessSuggestions = false;
		}
	}

	function selectGuessName(selectedName) {
		guessValue = selectedName;
		showGuessSuggestions = false;
		guessSelectedIndex = -1;
	}

	function handleGuessKeydown(e) {
		if (showGuessSuggestions) {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				guessSelectedIndex = Math.min(
					guessSelectedIndex + 1,
					guessSuggestions.length - 1
				);
				return;
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				guessSelectedIndex = Math.max(guessSelectedIndex - 1, -1);
				return;
			} else if (e.key === "Tab") {
				e.preventDefault();
				if (guessSelectedIndex >= 0) {
					selectGuessName(guessSuggestions[guessSelectedIndex]);
				} else if (guessSuggestions.length > 0) {
					selectGuessName(guessSuggestions[0]);
				}
				return;
			} else if (e.key === "Escape") {
				showGuessSuggestions = false;
				return;
			}
		}

		if (e.key === "Enter") {
			if (showGuessSuggestions && guessSelectedIndex >= 0) {
				selectGuessName(guessSuggestions[guessSelectedIndex]);
			} else {
				submitGuess();
			}
		}
	}

	function handleGuessBlur() {
		setTimeout(() => {
			showGuessSuggestions = false;
		}, 200);
	}

	function submitGuess() {
		if (!guessValue.trim()) return;

		if (guessValue.toLowerCase().trim() === hiddenName.toLowerCase().trim()) {
			isCorrectGuess = true;
			showGuessFeedback = true;

			if (document.fullscreenElement) {
				showCelebration = true;
				setTimeout(() => {
					showCelebration = false;
				}, 5000);
			} else {
				confetti({
					particleCount: 150,
					spread: 90,
					origin: { y: 0.6 }
				});
			}

			setTimeout(() => {
				isHidden = false;
				hiddenName = "";
				guessValue = "";
				showGuessFeedback = false;
				isCorrectGuess = false;
			}, 3000);
		} else {
			isCorrectGuess = false;
			showGuessFeedback = true;
			wrongGuessName = guessValue;
			showWrongGuessLine = true;

			// Flash for 3 seconds
			let flashCount = 0;
			const flashInterval = setInterval(() => {
				showWrongGuessLine = !showWrongGuessLine;
				flashCount++;
				if (flashCount >= 12) {
					// 6 full flashes over 3 seconds (250ms intervals)
					clearInterval(flashInterval);
					showWrongGuessLine = false;
					wrongGuessName = "";
				}
			}, 250);

			setTimeout(() => {
				showGuessFeedback = false;
			}, 2000);
		}
	}

	// Draw wrong guess line
	$effect(() => {
		if (!showWrongGuessLine || !wrongGuessName || !all.length) {
			wrongLineG?.style("display", "none");
			return;
		}

		// Build series for wrong guess
		const W = Math.max(0, width);
		const H = height;
		const iw = Math.max(0, W - margin.left - margin.right);
		const ih = Math.max(0, H - margin.top - margin.bottom);

		const want = (wrongGuessName ?? "").trim().toLowerCase();
		const filt = all.filter(
			(d) => d.name.toLowerCase() === want && (sex === "All" || d.sex === sex)
		);
		const yearMap = new Map();
		filt.forEach((d) => {
			yearMap.set(d.year, (yearMap.get(d.year) ?? 0) + d.n);
		});
		const ser = [];
		const maxDataYear = d3.max(all, (d) => d.year); // Get actual max year with data
		for (
			let yv = yearRange[0];
			yv <= Math.min(yearRange[1], maxDataYear);
			yv++
		) {
			const rawCount = yearMap.get(yv) ?? 0;
			const count =
				mode === "proportion"
					? (rawCount / (yearTotals.get(yv) || 1)) * 100
					: rawCount;
			ser.push({ date: new Date(yv, 0, 1), count, rawCount });
		}

		wrongLineG.style("display", null);
		const wrongPath = wrongLineG.selectAll("path").data([ser]);
		wrongPath.join(
			(enter) =>
				enter
					.append("path")
					.attr("fill", "none")
					.attr("stroke", "#f44336")
					.attr("stroke-width", 3)
					.attr("d", line),
			(update) => update.attr("d", line)
		);
	});

	// re-render on resize or prop changes
	$effect(() => {
		width;
		name;
		sex;
		mode;
		startYear; // track dependencies
		if (all.length) render();
	});

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			fullscreenContainer?.requestFullscreen();
			isFullscreen = true;
		} else {
			document.exitFullscreen();
			isFullscreen = false;
		}
	}

	$effect(() => {
		const handleFullscreenChange = () => {
			isFullscreen = !!document.fullscreenElement;
		};
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	});
</script>

<div class="fullscreen-wrapper" bind:this={fullscreenContainer}>
	{#if showCelebration}
		<div class="celebration">🎉</div>
	{/if}

	<!-- title -->
	<h2 class="chart-title">{isHidden ? "???" : name}</h2>

	<div class="wrapper">
		{#if isHidden && showGuessFeedback && !isCorrectGuess}
			<div class="wrong-message">❌ Wrong! Try again</div>
		{/if}
		<!-- container provides responsive width -->
		<div
			class="chart-container"
			bind:this={container}
			bind:clientWidth={width}
		></div>

		<!-- tooltip -->
		{#if tooltip.show}
			<div
				class="tooltip"
				style="left: {tooltip.x + 10}px; top: {tooltip.y - 10}px;"
			>
				<div class="tooltip-year">{tooltip.year}</div>
				<div class="tooltip-name">{isHidden ? "???" : name}</div>
				<div class="tooltip-count">
					{#if mode === "proportion"}
						{fmt(tooltip.count)} of U.S. babies<br />named {isHidden ? "???" : name}
					{:else}
						{fmt(tooltip.count)} U.S. babies<br />named {isHidden ? "???" : name}
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
	</div>

	<!-- interactive controls -->
	{#if showControls === true || showControls === "true"}
	<div class="controls">
	<div class="year-slider">
		<label for="start-year">Start Year: {startYear}</label>
		<input
			id="start-year"
			type="range"
			min="1880"
			max="2010"
			step="10"
			bind:value={startYear}
			class="slider"
		/>
	</div>
	<div class="mode-indicator" class:guess-mode={isHidden} class:search-mode={!isHidden}>
		{#if isHidden}
			<strong>GUESS MODE</strong>
		{:else}
			<strong>SEARCH MODE FOR {name.toUpperCase()}</strong>
		{/if}
	</div>

	<!-- Search/Guess input row -->
	<div class="row-controls input-row">
		{#if !isHidden}
			<div class="autocomplete">
				<input
					type="text"
					value={inputValue}
					oninput={handleInput}
					onkeydown={handleKeydown}
					onblur={handleBlur}
					placeholder="Enter a name..."
					class="name-input search-input"
				/>
				{#if showSuggestions}
					<ul class="suggestions">
						{#each suggestions as suggestion, i}
							<li
								class:selected={i === selectedIndex}
								onmousedown={() => selectName(suggestion)}
							>
								{suggestion}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{:else}
			<div class="autocomplete">
				<input
					type="text"
					value={guessValue}
					oninput={handleGuessInput}
					onkeydown={handleGuessKeydown}
					onblur={handleGuessBlur}
					placeholder="Guess the name..."
					class="name-input guess-input"
				/>
				{#if showGuessSuggestions}
					<ul class="suggestions">
						{#each guessSuggestions as suggestion, i}
							<li
								class:selected={i === guessSelectedIndex}
								onmousedown={() => selectGuessName(suggestion)}
							>
								{suggestion}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>

	{#if isHidden && showGuessFeedback && isCorrectGuess}
		<div class="success-message">🎉 Correct! It's {hiddenName}! 🎉</div>
	{/if}

	<!-- Action buttons row -->
	<div class="row-controls buttons-row">
		{#if !isHidden}
			<button class="hide-btn" onclick={hideNameForGuessing}
				>Hide Name & Play</button
			>
		{:else}
			<button class="submit-btn" onclick={submitGuess}>Guess</button>
			<button class="reveal-btn" onclick={revealName}>Reveal Answer</button>
			<button class="reset-btn" onclick={resetGame}>Reset</button>
		{/if}
	</div>

	<!-- Chart controls row -->
	<div class="chart-controls-label">CHART CONTROLS</div>
	<div class="row-controls chart-controls-row">
		<div class="sex-buttons">
			<button class:active={sex === "All"} onclick={() => (sex = "All")}>
				All
			</button>
			<button class:active={sex === "F"} onclick={() => (sex = "F")}>
				Female
			</button>
			<button class:active={sex === "M"} onclick={() => (sex = "M")}>
				Male
			</button>
		</div>
		<span class="pipe-separator">|</span>
		<div class="mode-buttons">
			<button class:active={mode === "raw"} onclick={() => (mode = "raw")}>
				Raw
			</button>
			<button
				class:active={mode === "proportion"}
				onclick={() => (mode = "proportion")}
			>
				Proportion
			</button>
		</div>
	</div>
	<div class="row-controls fullscreen-row">
		<button class="fullscreen-btn" onclick={toggleFullscreen}>
			{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
		</button>
	</div>
</div>
{/if}
</div>

<style>
	.chart-title {
		font-size: 48px;
		font-weight: 700;
		color: #6B46C1;
		margin: 0 0 20px 0;
	}

	.wrapper {
		position: relative;
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-top: 20px;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	.mode-indicator {
		text-align: center;
		padding: 8px 16px;
		margin-bottom: 8px;
		font-size: 14px;
		transition: color 0.3s ease;
	}

	.mode-indicator.search-mode {
		color: #4a1d7a;
	}

	.mode-indicator.guess-mode {
		color: #8b1538;
	}

	.mode-indicator strong {
		color: inherit;
	}

	.row-controls {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.autocomplete {
		position: relative;
		flex: 1;
		max-width: 500px;
		margin: 0 auto;
	}

	.name-input {
		width: 100%;
		padding: 10px 14px;
		font-size: 16px;
		border: 2px solid #ddd;
		border-radius: 6px;
		outline: none;
		transition: background 0.3s ease, border-color 0.3s ease;
		box-sizing: border-box;
	}

	.name-input.search-input {
		background: #e8d4f8;
		border-color: #6B46C1;
	}

	.name-input.search-input:focus {
		border-color: #4a1d7a;
		background: #d9c2f0;
	}

	.name-input.guess-input {
		background: #ffd4e5;
		border-color: #E85D75;
	}

	.name-input.guess-input:focus {
		border-color: #8b1538;
		background: #ffc2d9;
	}

	.name-input:focus {
		border-color: #6B46C1;
	}

	.suggestions {
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
		background: white;
		border: 2px solid #6B46C1;
		border-bottom: none;
		border-radius: 6px 6px 0 0;
		list-style: none;
		margin: 0;
		padding: 0;
		max-height: 300px;
		overflow-y: auto;
		z-index: 1000;
		box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
	}

	.suggestions li {
		padding: 8px 14px;
		cursor: pointer;
		transition: background 0.15s;
		font-size: 14px;
	}

	.suggestions li:hover,
	.suggestions li.selected {
		background: #f0f7ff;
	}

	.suggestions li:first-child {
		border-radius: 4px 4px 0 0;
	}

	.sex-buttons {
		display: flex;
		gap: 8px;
		flex-shrink: 0;
	}

	.mode-buttons {
		display: flex;
		gap: 8px;
		width: 200px;
		flex-shrink: 0;
	}

	.sex-buttons button {
		flex: 1;
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 500;
		background: white;
		border: 2px solid #ddd;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.mode-buttons button {
		flex: 1;
		padding: 6px 12px;
		font-size: 13px;
		font-weight: 500;
		background: white;
		border: 2px solid #ddd;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.sex-buttons button:hover,
	.mode-buttons button:hover {
		border-color: #6B46C1;
		background: #F3EFFF;
	}

	.sex-buttons button.active,
	.mode-buttons button.active {
		background: #6B46C1;
		color: white;
		border-color: #6B46C1;
	}

	.hide-btn {
		padding: 12px 20px;
		font-size: 16px;
		font-weight: 600;
		background: #ff6b6b;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		flex: 1;
	}

	.hide-btn:hover {
		background: #ff5252;
	}

	.submit-btn {
		padding: 12px 20px;
		font-size: 16px;
		font-weight: 600;
		background: #6B46C1;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		flex: 1;
	}

	.submit-btn:hover {
		background: #5A3AA8;
	}

	.reveal-btn {
		padding: 12px 20px;
		font-size: 16px;
		font-weight: 600;
		background: #ff9800;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		flex: 1;
	}

	.reveal-btn:hover {
		background: #f57c00;
	}

	.reset-btn {
		padding: 12px 20px;
		font-size: 16px;
		font-weight: 600;
		background: #999;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		flex: 1;
	}

	.reset-btn:hover {
		background: #777;
	}

	.success-message {
		padding: 16px;
		background: #4caf50;
		color: white;
		border-radius: 6px;
		font-size: 18px;
		font-weight: 600;
		text-align: center;
	}

	.wrong-message {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 12px;
		background: #f44336;
		color: white;
		border-radius: 6px;
		font-size: 16px;
		font-weight: 600;
		text-align: center;
		z-index: 1000;
		max-width: 300px;
	}

	.year-slider {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 8px;
	}

	.year-slider label {
		font-size: 14px;
		font-weight: 500;
		color: #555;
	}

	.slider {
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: #333;
		outline: none;
		-webkit-appearance: none;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #6B46C1;
		cursor: pointer;
	}

	.slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #6B46C1;
		cursor: pointer;
		border: none;
	}

	.chart-container {
		width: 100%;
		min-height: 360px;
	}

	:global(.chart-container svg) {
		display: block;
	}

	:global(.axis path),
	:global(.axis line) {
		stroke: #555;
		shape-rendering: crispEdges;
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

	:global(.minor-tick) {
		stroke: #555;
		shape-rendering: crispEdges;
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

	.fullscreen-wrapper {
		width: 100%;
	}

	.input-row {
		justify-content: center;
	}

	.buttons-row {
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.chart-controls-row {
		justify-content: center;
		flex-wrap: wrap;
	}

	.pipe-separator {
		font-size: 18px;
		color: #999;
		margin: 0 8px;
	}

	@media (max-width: 600px) {
		.chart-controls-row {
			flex-direction: column;
			gap: 8px;
		}

		.pipe-separator {
			display: none;
		}
	}

	.chart-controls-label {
		text-align: center;
		font-size: 12px;
		font-weight: 600;
		color: #666;
		margin-top: 8px;
		margin-bottom: 4px;
		letter-spacing: 0.5px;
	}

	.fullscreen-wrapper:fullscreen {
		background: #E6D5F5;
		padding: 40px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	:global(.fullscreen-wrapper:fullscreen canvas) {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		width: 100% !important;
		height: 100% !important;
		pointer-events: none !important;
		z-index: 99999 !important;
	}

	.fullscreen-wrapper:fullscreen .chart-title {
		margin-top: 20px;
	}

	.fullscreen-wrapper:fullscreen .chart-container {
		max-width: 1200px;
		width: 100%;
	}

	.fullscreen-wrapper:fullscreen .controls {
		max-width: 800px;
	}

	.fullscreen-btn {
		padding: 4px 8px;
		font-size: 11px;
		font-weight: 500;
		background: #6B46C1;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
		width: auto;
		max-width: 150px;
		margin: 0 auto;
	}

	.fullscreen-btn:hover {
		background: #5A3AA8;
	}

	.celebration {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 200px;
		z-index: 99999;
		animation: celebrate 1s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes celebrate {
		0%, 100% {
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			transform: translate(-50%, -50%) scale(1.2);
		}
	}

	/* Desktop Layout */
	@media (min-width: 769px) {
		.mobile-only {
			display: none !important;
		}

		/* Desktop: hide Hide/Submit buttons from search row, they're in buttons-row */
		.search-row .hide-btn,
		.search-row .submit-btn,
		.search-row .reveal-btn {
			display: none;
		}
	}

	/* Mobile Layout */
	@media (max-width: 768px) {
		/* Hide fullscreen button on mobile */
		.fullscreen-row {
			display: none;
		}

		/* Hide desktop sex buttons, show mobile ones */
		.desktop-only {
			display: none;
		}

		.mobile-only {
			display: flex;
		}

		/* Mobile: show Hide/Submit buttons in search row */
		.search-row .hide-btn,
		.search-row .submit-btn,
		.search-row .reveal-btn {
			display: block;
			white-space: nowrap;
			flex-shrink: 0;
			min-width: auto;
			padding: 10px 12px;
			font-size: 14px;
		}

		/* Mobile: search row has input + button side by side */
		.search-row .autocomplete {
			flex: 1;
		}

		/* Mobile: buttons-row has sex + mode buttons stacked */
		.buttons-row {
			flex-direction: column;
			gap: 8px;
		}

		.buttons-row .sex-buttons {
			width: 100%;
		}

		.buttons-row .mode-buttons {
			width: 100%;
		}
	}
</style>
