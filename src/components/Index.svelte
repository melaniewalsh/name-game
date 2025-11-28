<script>
	import { getContext, onMount } from "svelte";
	import CMS from "$components/helpers/CMS.svelte";
	import Hero from "$components/Hero.svelte";
	import Footer from "$components/Footer.svelte";
	import Ul from "$components/Ul.svelte";
	import Details from "$components/Details.svelte";
	import Swiper from "$components/Swiper.svelte";
	import Figure from "$components/Figure.svelte";
	import GuessLineChart from "$components/GuessLineChart.svelte";
	import GuessLineChartSimple from "$components/GuessLineChartSimple.svelte";
	import GuessLineChartMultiplayer from "$components/GuessLineChartMultiplayer.svelte";
	import MultiplayerButton from "$components/MultiplayerButton.svelte";
	import LineChart from "$components/LineChart.svelte";
	import Versus from "$components/Versus.svelte";
	import VersusMultiplayer from "$components/VersusMultiplayer.svelte";
	import VersusMultiplayerButton from "$components/VersusMultiplayerButton.svelte";
	import Table from "$components/Table.svelte";
	import Grid from "$components/Grid.svelte";
	import { register } from "swiper/element/bundle";

	const copy = getContext("copy");
	const { body } = copy;
	const { title, description, byline, others } = copy.meta;
	const components = { Ul, Details, Swiper, GuessLineChart, GuessLineChartSimple, GuessLineChartMultiplayer, MultiplayerButton, LineChart, Versus, VersusMultiplayer, VersusMultiplayerButton, Figure, Table, Grid };
	// const data = getContext("data");

	onMount(() => {
		register();
	});
</script>

<article>
	<Hero {title} {description} {byline} {others}></Hero>
	<CMS {body} {components} />
</article>

<svelte:boundary onerror={(e) => console.error(e)}>
	<Footer recirc={false} />
</svelte:boundary>

<style>
</style>
