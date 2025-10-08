<script>
	import "$styles/app.css";
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.svg" type="image/svg+xml" />
</svelte:head>

<main id="content">
	{@render children?.()}
</main>
