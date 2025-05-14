<script>
	import arrowLeft from "$svg/arrow-left.svg";
	import arrowRight from "$svg/arrow-right.svg";
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

	const resetSwiper = () => {
		if (swiperEl && swiperEl.swiper) swiperEl.swiper.slideTo(0);
	};

	$effect(() => resetSwiper(animal));
</script>

<h4 class="shelf-title">
	Popular Books with a {_.startCase(animal)}
</h4>

<figure class="swiper-books">
	<button onclick={() => swiperEl.swiper.slidePrev()}>{@html arrowLeft}</button>
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

				<!-- <strong class="title">{book.title} ({book.pub_year})</strong> -->

				<div class="characters">
					<div class="bar">
						{#each Object.entries(book.characters) as [pronoun, count]}
							{@const percent = (count / numAnimals) * 100}
							{#if percent > 0}
								<div class={_.kebabCase(pronoun)} style:width={`${percent}%`}>
									<div class="label">
										<strong
											>{pronoun === "[animal name]"
												? "animal name"
												: pronoun}</strong
										>
										<span>{count} {animal}{count > 1 ? "s" : ""}</span>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div></swiper-slide
			>
		{/each}
	</swiper-container>
	<button onclick={() => swiperEl.swiper.slideNext()}>{@html arrowRight}</button
	>
</figure>

<style>
	figure {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.characters {
		width: 100px;
		font-size: var(--14px);
	}

	.bar {
		display: flex;
		width: 100%;
		height: 10px;
		margin-top: 2.25rem;
	}

	.bar div {
		position: relative;
		height: 100%;
	}

	.label {
		position: absolute;
		display: flex;
		flex-direction: column;
		top: 0;
		line-height: 1;
		transform: translateY(calc(-100% - 1rem));
		left: 0;
		font-size: var(--12px);
	}

	.label strong,
	.label span {
		white-space: nowrap;
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
		background: var(--color-green);
		border-radius: 16px;
		padding: 1em 0;
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
		margin-top: 4rem;
		text-align: center;
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
		aspect-ratio: 3/4;
		background-size: cover;
		background-position: center;
		border: 4px solid var(--color-white);
		border-radius: var(--border-radius);
		box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.2);
	}

	.title {
		width: 100px;
		font-size: var(--14px);
		text-align: center;
	}

	button {
		width: 2em;
	}

	:global(.swiper-books button svg) {
		display: block;
		width: 100%;
		height: auto;
	}

	:global(.swiper-books button svg) {
		fill: var(--color-white);
	}

	@media (max-width: 600px) {
		a {
			height: 120px;
		}
	}
</style>
