<script>
	const { examples, pre } = $props();

	const hasImages = examples.every((example) => example.src);

	let swiperEl = $state();
	let active = $state(0);
	let currentCaption = $derived(examples[active]?.caption);

	const onSlideChange = (e) => {
		const [swiper] = e.detail;
		active = swiper.activeIndex;
	};

	const onClick = (index) => {
		if (swiperEl) {
			swiperEl.swiper.slideTo(index);
		}
	};

	const onKeyDown = (e, index) => {
		if (e.key === "Enter") {
			onClick(index);
		}
	};
</script>

<figure>
	{#if pre}
		<div class="pre">{@html pre}</div>
	{/if}

	<div class="swiper">
		<button onclick={() => swiperEl.swiper.slidePrev()} disabled={active === 0}
			>{"<"}</button
		>

		<swiper-container
			bind:this={swiperEl}
			effect="coverflow"
			coverflowEffect={{ scale: 0.75, stretch: 50 }}
			speed={500}
			slides-per-view={"auto"}
			centered-slides={true}
			onswiperslidechange={onSlideChange}
		>
			{#each examples as example, i}
				{#if hasImages}
					<swiper-slide
						onclick={() => onClick(i)}
						onkeydown={(e) => onKeyDown(e, i)}
						tabindex="0"
						role="button"
					>
						<img src={example.src} alt={example?.alt} />
					</swiper-slide>
				{:else}
					<swiper-slide
						onclick={() => onClick(i)}
						onkeydown={(e) => onKeyDown(e, i)}
						tabindex="0"
						role="button"
					>
						<blockquote>
							{@html example}
						</blockquote>
					</swiper-slide>
				{/if}
			{/each}
		</swiper-container>

		<button
			onclick={() => swiperEl.swiper.slideNext()}
			disabled={active === examples.length - 1}>{">"}</button
		>
	</div>

	{#if currentCaption}
		<figcaption>{@html currentCaption}</figcaption>
	{/if}
</figure>

<style>
	swiper-container {
		width: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	swiper-slide {
		width: fit-content;
		pointer-events: auto;
	}

	swiper-slide:hover {
		cursor: pointer;
	}

	.pre {
		margin-bottom: 1rem;
	}

	figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2rem 0;
	}

	figcaption {
		font-size: var(--14px);
		text-align: center;
		max-width: 500px;
	}

	img {
		max-height: 500px;
	}

	.swiper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}

	blockquote {
		background-color: var(--color-gray-50);
		border: 4px solid var(--color-gray-600);
		padding: 4rem 2rem;
		font-style: italic;
		font-size: var(--24px);
		font-family: var(--mono);
	}

	:global(.swiper-slide-shadow-left) {
		background: rgba(91, 99, 75, 0.3);
		background: linear-gradient(
			to left,
			rgba(91, 99, 75, 0),
			rgba(91, 99, 75, 0.3)
		);
	}

	:global(.swiper-slide-shadow-right) {
		background: rgba(91, 99, 75, 0.3);
		background: linear-gradient(
			to left,
			rgba(91, 99, 75, 0.3),
			rgba(91, 99, 75, 0)
		);
	}

	@media (max-width: 600px) {
		img {
			height: 300px;
		}
	}
</style>
