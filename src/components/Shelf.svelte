<script>

	let { animal, books} = $props();

	// $inspect(books[0]);

	let decades = $derived(
	books.map((b) => b.decade)
	);
	const decadeOptions = ["All", ...[...new Set(decades)].sort((a, b) => Number(a) - Number(b))];

	let selectedDecade = $state("All");

	function formatRatings(num) {
		num = Number(num);
		if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
		if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
		return num;
	};

	function toTitleCase(str) {
		return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1));
	};

	let topBooks = $derived(
	books.filter((b) => b.decade === selectedDecade || selectedDecade === "All").slice(0,5)
	);

</script>

<div class="shelf_title"> Top {toTitleCase(animal)} Books</div>

<div class="filter">
	<label for="decade">Filter by decade:</label>
	<select bind:value={selectedDecade} id="decade">
		{#each decadeOptions as decade}
			<option value={decade}>{decade === "All" ? "All Decades" : `${decade}s`}</option>
		{/each}
	</select>
</div>


<div class="books">
	{#each topBooks as book}
		<div class="book">
			<a href={book.goodreads_link} target="_blank"><img src={book.book_cover_image} /></a>
			<div class="book-text">
				<div class="title">{book.title} ({book.pub_year})</div>
				<div class="author">By {book.author}</div>
				<div class="num_ratings">{formatRatings(book.num_ratings)} ratings</div>
			</div>
		</div>
	{/each}
</div>

<style>
	img {
		/*width: 200px; /*Set a fixed width for all images */
   height: 200px; /*Set a fixed height for all images */
  object-fit: cover; /* This will make sure the images maintain their proportions */
  border: 2px solid rgb(7, 7, 7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25); /* ← Drop shadow */


  /* margin: 5px; This will add some spacing between the images */
}

	.books {
		display: flex;
		/* justify-content: center; */
		gap: 1rem;
		margin-top: 1rem;
		/* border: 2px solid rgb(0, 0, 0); */
		flex-direction: row;
		width: 100%;
	}

	.book-text {
	width: 100%;
	text-align: center;
}
.title, .author, .num_ratings {
	font-size: var(--14px);
	margin-top: 0.25rem;
	/* Ensure consistent text block width */
	width: 100%;
	text-align: center;
	word-wrap: break-word; /* prevents overflow */
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
		width: 200px; /* Set a fixed width for all images */
  margin: 5px; /* This will add some spacing between the images */

	}
	
	.filter {
	text-align: center;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	font-size: var(--14px);
}

select {
	font-size: var(--14px);
	padding: 0.25rem 0.5rem;
	margin-left: 0.5rem;
}

</style>
