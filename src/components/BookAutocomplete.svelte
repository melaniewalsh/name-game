<script>
	let {
		options = [],
		bindValue = $bindable(),
		placeholder = "Search book titles..."
	} = $props();

	let showDropdown = $state(false);

	// Filter options
	const filtered = $derived(
		!bindValue
			? options
			: options.filter((title) =>
					title.toLowerCase().includes(bindValue.toLowerCase())
				)
	);

	// Select an option
	const select = (title) => {
		bindValue = title;
		showDropdown = false;
	};
</script>

<div class="autocomplete-container">
	<div class="input-wrapper">
		<input
			type="text"
			bind:value={bindValue}
			onfocus={() => (showDropdown = true)}
			onblur={() => setTimeout(() => (showDropdown = false), 200)}
			{placeholder}
			class="autocomplete-input"
		/>
		{#if bindValue}
			<button
				onclick={() => (bindValue = "")}
				class="clear-button"
				type="button"
			>
				✕
			</button>
		{/if}
	</div>

	{#if showDropdown && filtered.length > 0}
		<ul class="dropdown">
			{#each filtered as title}
				<li onmousedown={() => select(title)} class="dropdown-item">
					{title}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.autocomplete-container {
		position: relative;
		width: 50%;
	}

	.input-wrapper {
		position: relative;
	}

	.autocomplete-input {
		width: 100%;
		padding: 0.5rem 2rem 0.5rem 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		font-size: 1rem;
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

	input {
		font-family: var(--sans);
	}
</style>
