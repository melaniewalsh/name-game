<script>
	let {
		options = [],
		bindValue = $bindable(),
		placeholder = "Search book titles..."
	} = $props();

	let tempValue = $state(bindValue);
	let showDropdown = $state(false);

	const filtered = $derived(
		!tempValue
			? options
			: options.filter((title) =>
					title.toLowerCase().includes(tempValue.toLowerCase())
				)
	);

	const commitValue = () => {
		bindValue = tempValue;
		showDropdown = false;
	};
	const handleBlur = () => {
		showDropdown = false;
	};
	const handleKeydown = (e) => {
		if (e.key === "Enter") {
			commitValue();
			e.target.blur();
		}
	};
	const handleFocus = () => {
		showDropdown = true;
	};
	const select = (title) => {
		tempValue = title;
		commitValue();
	};
	const clear = () => {
		bindValue = "";
		tempValue = "";
		showDropdown = false;
	};
</script>

<div class="autocomplete-container">
	<div class="input-wrapper">
		<input
			type="text"
			bind:value={tempValue}
			onkeydown={handleKeydown}
			onblur={handleBlur}
			onfocus={handleFocus}
			{placeholder}
			class="autocomplete-input"
		/>
		{#if tempValue}
			<button onclick={clear} class="clear-button" type="button"> ✕ </button>
		{/if}
	</div>

	{#if showDropdown}
		<ul class="dropdown">
			{#each filtered as title}
				<li onmousedown={() => select(title)} class="dropdown-item">
					{title}
				</li>
			{/each}

			{#if filtered.length === 0}
				<li class="dropdown-item no-results">No results found</li>
			{/if}
		</ul>
	{/if}
</div>

<style>
	.autocomplete-container {
		position: relative;
		width: 100%;
		max-width: 400px;
	}

	.input-wrapper {
		position: relative;
	}

	.autocomplete-input {
		width: 100%;
		padding: 0.5rem 2rem 0.5rem 0.75rem;
		font-size: 1rem;
		font-family: var(--sans);
		height: 100%;
		border: 4px solid black;
		border-radius: var(--border-radius);
	}

	.clear-button {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: #9ca3af;
		cursor: pointer;
		padding: 0.25rem;
		font-size: 1rem;
		line-height: 1;
	}

	.clear-button:hover {
		color: #4b5563;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.25rem;
		background: white;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		max-height: 20rem;
		overflow-y: scroll;
		z-index: 50;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.dropdown-item {
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		font-size: 0.8rem;
		transition: background-color 0.15s;
	}

	.dropdown-item:hover {
		background-color: #f3f4f6;
	}

	.dropdown-item.no-results:hover {
		background: none;
		cursor: default;
	}
</style>
