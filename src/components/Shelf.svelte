<script>

	let { animal, books } = $props();

	$inspect(books[0]);

	function formatRatings(num) {
		num = Number(num);
		if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
		if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
		return num;
	};
	function toTitleCase(str) {
		return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1));
	};

</script>

<div class="shelf_title"> Top {toTitleCase(animal)} Books</div>

<div class="books">
	{#each books.slice(0, 5) as book}
		<div class="book">
			<a href={book.goodreads_link} target="_blank"><img src={book.book_cover_image} /></a>
			<div class="title">{book.title} ({book.pub_year})</div>
			<div class="author">By {book.author}</div>
			<div class="num_ratings">{formatRatings(book.num_ratings)} ratings</div>
		</div>
	{/each}
</div>

<style>
	img {
	height: 150px; 
	object-fit: contain;
}

	.books {
		display: flex;
		/* justify-content: center; */
		gap: 1rem;
		margin-top: 1rem;
	}

	.title {
		font-size: var(--14px);
		text-align: center;
		font-weight: bold;
	}
	.author {
		font-size: var(--14px);
		text-align: center;
	}

	.num_ratings {
		font-size: var(--14px);
		text-align: center;
	}
	.shelf_title {
		font-size: var(--16px);
		text-align: center;
		font-weight: bold;
		margin-top: 1rem;

	}

	.book {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
</style>
