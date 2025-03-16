<script lang="ts">
	export let data;
	console.log(data);
</script>

<div class="p-5 text-justify">
	{@html data.html}
</div>

<style>
	:global(h1) {
		font-size: 2em;
		font-weight: bold;
		margin-bottom: 0.5em;
	}

	:global(h2) {
		font-size: 1.5em;
		font-weight: bold;
		margin-bottom: 0.4em;
	}

	:global(h3) {
		font-size: 1.17em;
		font-weight: bold;
		margin-bottom: 0.3em;
	}

	:global(h4) {
		font-size: 1em;
		font-weight: bold;
		margin-bottom: 0.2em;
	}

	:global(a) {
		text-decoration: underline;
	}

	:global(p) {
		margin-bottom: 1em;
	}

	:global(.infobox) {
		width: 400px;
		border: 2px solid #a2a9b1;
		margin: 0 0 1em 1em;
	}

	@media (max-width: 999px) {
		:global(.infobox) {
			width: 100%; /* Full width on mobile */
			float: none;
			margin: 0;
		}
	}

	@media (min-width: 1000px) {
		:global(.infobox) {
			float: right; /* Position on the right on PC */
		}
	}
</style>
