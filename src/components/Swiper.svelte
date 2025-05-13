<script>
	import arrowLeft from "$svg/arrow-left.svg";
	import arrowRight from "$svg/arrow-right.svg";
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

<figure class="swiper-examples" class:has-images={hasImages}>
	{#if examples[active]?.title}
		<h2>{examples[active].title}</h2>
	{/if}

	{#if examples[active]?.description}
		<p>{@html examples[active].description}</p>
	{/if}
	{#if pre}
		<div class="pre">{@html pre}</div>
	{/if}

	<div>
		<button onclick={() => swiperEl.swiper.slidePrev()} disabled={active === 0}
			>{@html arrowLeft}</button
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
							<span class="inner">
								{@html example}
							</span>
						</blockquote>
					</swiper-slide>
				{/if}
			{/each}
		</swiper-container>

		<button
			onclick={() => swiperEl.swiper.slideNext()}
			disabled={active === examples.length - 1}>{@html arrowRight}</button
		>
	</div>

	{#if currentCaption}
		<figcaption>{@html currentCaption}</figcaption>
	{/if}
</figure>

<style>
	.has-images swiper-container {
		background: var(--color-orange);
	}

	swiper-container {
		width: 100%;
		overflow: hidden;
		pointer-events: none;
		background: var(--color-blue);
		border-radius: 16px;
		padding: 1em 0;
	}

	swiper-slide {
		width: fit-content;
		pointer-events: auto;
		padding-bottom: 8px;
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
		max-width: 480px;
		margin-top: 8px;
		line-height: 1.2;
	}

	img {
		max-height: 480px;
		border: 8px solid var(--color-white);
		border-radius: var(--border-radius);
		box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.2);
	}

	.swiper-examples div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}

	blockquote {
		padding: 2em;
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

	button {
		width: 4em;
	}

	:global(.swiper-examples button svg) {
		display: block;
		width: 100%;
		height: auto;
	}

	:global(.swiper-examples button svg path) {
		fill: var(--color-white);
	}

	@media (max-width: 600px) {
		img {
			height: 300px;
		}
	}
</style>
