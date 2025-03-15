<script lang="ts">
	export let data;
	console.log(data);
</script>

<div class="p-5">
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
</style>
