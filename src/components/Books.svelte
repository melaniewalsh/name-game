<script>
	const { figures } = $props();

	let swiperEl = $state();
	let active = $state(0);
	let currentCaption = $derived(figures[active]?.caption);

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
	<swiper-container
		bind:this={swiperEl}
		effect="coverflow"
		coverflowEffect={{ scale: 0.75, stretch: 50 }}
		speed={500}
		slides-per-view={"auto"}
		centered-slides={true}
		auto-height={true}
		onswiperslidechange={onSlideChange}
	>
		{#each figures as { src, alt, caption }, i}
			<swiper-slide
				onclick={() => onClick(i)}
				onkeydown={(e) => onKeyDown(e, i)}
				tabindex="0"
				role="button"
			>
				<img {src} {alt} />
			</swiper-slide>
		{/each}
	</swiper-container>

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
		height: 500px;
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
