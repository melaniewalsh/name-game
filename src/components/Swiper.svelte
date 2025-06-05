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

	<div class="outer">
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
						<img
							src={example.src}
							alt={example?.alt}
							class={example.pronoun || ""}
						/>

						{#if example.pronoun}
							<div class={`pronoun ${example.pronoun}`}>
								{#if example.pronoun === "they"}
									They/them
								{:else if example.pronoun === "he"}
									He/him
								{:else if example.pronoun === "she"}
									She/her
								{:else}
									{example.pronoun}
								{/if}
							</div>
						{/if}
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
	swiper-container {
		width: 100%;
		overflow: hidden;
		pointer-events: none;
		padding: 1em 0;
	}

	swiper-slide {
		position: relative;
		width: fit-content;
		pointer-events: auto;
		height: 360px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.has-images swiper-slide {
		height: auto;
		padding-bottom: 2rem;
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
		border: 12px solid var(--color-fg);
		border-radius: var(--border-radius);
		/* box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.2); */
	}

	img.he {
		border: 12px solid var(--color-blue);
	}

	img.she {
		border: 12px solid var(--color-pink);
	}

	.pronoun {
		position: absolute;
		bottom: 10px;
		background: var(--color-gray-200);
		border: 3px solid black;
		text-transform: uppercase;
		font-weight: bold;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
	}

	.pronoun.he {
		background: var(--color-blue);
	}

	.pronoun.she {
		background: var(--color-pink);
	}

	.swiper-examples .outer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}

	blockquote {
		padding: 2em;
		line-height: 1.4;
	}

	:global(.swiper-slide-shadow-left) {
		background: transparent;
	}

	:global(.swiper-slide-shadow-right) {
		background: transparent;
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
		fill: var(--color-red);
		stroke: var(--color-fg);
		stroke-width: 3px;
	}
</style>
