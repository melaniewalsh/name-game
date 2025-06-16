<script>
	import { setContext } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";

	let { data } = $props();

	version();

	const preloadFont = [
		"https://pudding.cool/assets/fonts/bowlby-one-sc/bowlby-one-sc-v25-latin-regular.woff2",
		"https://pudding.cool/assets/fonts/baloo-bhai/baloo-bhai-2-v28-latin-regular.woff2",
		"https://pudding.cool/assets/fonts/baloo-bhai/baloo-bhai-2-v28-latin-700.woff2"
	];

	const { title, description, url, keywords } = copy.meta;
	setContext("copy", copy);
	setContext("data", data);

	$effect(() => {
		document.addEventListener("click", (e) => {
			if (e.target.tagName === "A" && e.target.hash) {
				const target = document.querySelector(e.target.hash);
				const details = target?.closest("details");
				if (details && !details.open) {
					details.open = true;
				}
				target.scrollIntoView();
			}
		});
	});
</script>

<Meta {title} {description} {url} {preloadFont} {keywords} />
<Index />
