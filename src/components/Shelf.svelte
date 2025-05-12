<script>
	import _ from "lodash";

	let { animal, books } = $props();

	const n = 12;
	let swiperEl = $state();
	let selectedDecade = $state("All");

	let topBooks = $derived(
		books
			.filter((b) => b.decade === selectedDecade || selectedDecade === "All")
			.slice(0, n)
	);

	const formatRatings = (num) => {
		num = Number(num);
		if (num >= 1_000_000)
			return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
		if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
		return num;
	};

	const resetSwiper = () => {
		if (swiperEl && swiperEl.swiper) swiperEl.swiper.slideTo(0);
	};

	$effect(() => resetSwiper(animal));
</script>

<div class="shelf-title">
	Most Popular Books featuring {_.startCase(animal)}s
</div>

<figure class="books">
	<button onclick={() => swiperEl.swiper.slidePrev()}>{"<"}</button>
	<swiper-container slides-per-view="auto" bind:this={swiperEl}>
		{#each topBooks as book}
			{@const numAnimals = Object.values(book.characters).reduce(
				(acc, val) => acc + val,
				0
			)}
			{@const animal = book.animal_group}
			<swiper-slide>
				<a href={book.goodreads_link} target="_blank">
					<div
						class="book-cover"
						style:background-image={`url(${book.book_cover_image})`}
					></div>
				</a>
				<strong class="title">{book.title} ({book.pub_year})</strong>
				<div class="characters">
					<div class="bar">
						{#each Object.entries(book.characters) as [pronoun, count]}
							<div
								class={_.kebabCase(pronoun)}
								style:width={`${(count / numAnimals) * 100}%`}
							/>
						{/each}
					</div>

					<div>
						{numAnimals}
						{animal}{numAnimals > 1 ? "s" : ""}:
					</div>
					<ul>
						{#each Object.entries(book.characters) as [pronoun, count]}
							<li>
								{count}
								{pronoun}
							</li>
						{/each}
					</ul>
				</div>
			</swiper-slide>
		{/each}
	</swiper-container>
	<button onclick={() => swiperEl.swiper.slideNext()}>{">"}</button>
</figure>

<style>
	figure {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.characters {
		width: 100%;
		font-size: var(--14px);
	}

	.bar {
		display: flex;
		width: 100%;
		height: 10px;
		margin-top: 0.5rem;
	}

	.bar div {
		height: 100%;
	}

	.she-her {
		background-color: pink;
	}

	.he-him {
		background-color: lightblue;
	}

	.animal-name,
	.it {
		background-color: var(--color-gray-200);
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		margin: 0;
	}

	swiper-container {
		width: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	swiper-slide {
		width: fit-content;
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 0.5rem;
	}

	swiper-slide:hover {
		cursor: pointer;
	}

	.shelf-title {
		font-size: var(--18px);
		font-weight: bold;
		text-align: center;
		margin-bottom: 1rem;
	}

	a {
		width: 100px;
		height: 140px;
	}

	a:hover .book-cover {
		opacity: 0.75;
		transition: opacity 0.1s ease;
	}

	.book-cover {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		border: 2px solid var(--color-gray-600);
	}

	.title {
		font-size: var(--14px);
		text-align: center;
		width: 120px;
	}

	@media (max-width: 600px) {
		.shelf-title {
			font-size: var(--16px);
		}

		a {
			height: 120px;
		}
	}
</style>
