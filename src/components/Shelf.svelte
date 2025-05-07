<script>
	let { animal, books } = $props();
</script>

<div class="books">
	{#each books as book}
		<div class="book">
			<img src={book.imageUrl} />
			<div class="title">{book.title}</div>
		</div>
	{/each}
</div>

<style>
	img {
		width: 120px;
	}

	.title {
		font-size: var(--14px);
	}

	.books {
		display: flex;
	}
</style>
