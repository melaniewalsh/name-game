<script>
	let { recirc = false, recent = true, recircImages = false } = $props();
</script>

<footer>
	<div class="content">
		<p class="byline">By <a href="https://melaniewalsh.org">Melanie Walsh</a></p>
		<p class="description">
			Assistant Professor in the Information School at the University of Washington
		</p>
	</div>
</footer>

<style>
	footer {
		margin-top: 100px;
		padding: 32px 16px 64px;
		background: #D1C4E9;
	}

	.content {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
	}

	p {
		margin: 8px 0;
		line-height: 1.4;
	}

	.byline {
		font-size: var(--20px, 20px);
		font-weight: 600;
	}

	.description {
		font-size: var(--16px, 16px);
	}

	a {
		font-weight: 700;
		color: var(--color-fg);
		text-decoration: 2px underline var(--color-fg);
	}

	a:hover {
		color: var(--color-link-hover);
		text-decoration: 2px underline var(--color-link-hover);
	}
</style>
