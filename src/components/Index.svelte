<script>
	import { getContext } from "svelte";
	import CMS from "$components/helpers/CMS.svelte";
	import Hero from "$components/Hero.svelte";
	import Footer from "$components/Footer.svelte";
	import Ul from "$components/Ul.svelte";
	import Details from "$components/Details.svelte";
	import Figure from "$components/Figure.svelte";
	import DotPlot from "$components/DotPlot.svelte";
	import Examples from "$components/Examples.svelte";

	const copy = getContext("copy");
	const { body } = copy;
	const { title, description, byline } = copy.meta;
	const components = { Ul, Details, Figure, DotPlot, Examples };
	// const data = getContext("data");
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
