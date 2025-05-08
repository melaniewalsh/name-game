<script>
	let { animal, books } = $props();

	$inspect(books[0]);
</script>

<div class="books">
	{#each books.slice(0, 8) as book}
		<div class="book">
			<img src={book.book_cover_image} />
			<div class="title">{book.title}</div>
		</div>
	{/each}
</div>

<style>
	img {
		width: 120px;
	}

	.books {
		display: flex;
	}

	.title {
		font-size: var(--14px);
		text-align: center;
	}

	.book {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
