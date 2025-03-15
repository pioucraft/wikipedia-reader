<script lang="ts">
	export let data;
	console.log(data);
</script>

<div class="flex flex-col items-center p-5 max-xl:items-start">
	<div class="text-justify min-lg:w-[650px]">
		<h1>{data.title}</h1>
		<div class="flex flex-row items-baseline gap-5">
			<h2><em>From Wikipedia,</em></h2>
			<a href="https://en.wikipedia.org/wiki/{data.name}" target="_blank">(view source)</a>
		</div>

		{@html data.html}
	</div>
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
</style>
