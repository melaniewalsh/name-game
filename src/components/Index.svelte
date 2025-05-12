<script>
	import { getContext, onMount } from "svelte";
	import CMS from "$components/helpers/CMS.svelte";
	import Hero from "$components/Hero.svelte";
	import Footer from "$components/Footer.svelte";
	import Ul from "$components/Ul.svelte";
	import Details from "$components/Details.svelte";
	import Books from "$components/Books.svelte";
	import Figure from "$components/Figure.svelte";
	import DotPlot from "$components/DotPlot.svelte";
	import Quotes from "$components/Quotes.svelte";
	import { register } from "swiper/element/bundle";

	const copy = getContext("copy");
	const { body } = copy;
	const { title, description, byline } = copy.meta;
	const components = { Ul, Details, Books, DotPlot, Quotes, Figure };
	// const data = getContext("data");

	onMount(() => {
		register();
	});
</script>

<article>
	<Hero {title} {description} {byline}></Hero>
	<CMS {body} {components} />
</article>

<svelte:boundary onerror={(e) => console.error(e)}>
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>

<style>
	article {
		max-width: 32em;
		margin: 0 auto;
		padding: var(--16px);
	}
</style>
