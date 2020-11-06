<script lang="ts">
	import Header from "./Header.svelte";
	import Calculator from "./Calculator.svelte";
</script>

<Header />

<main>
	<Calculator />
</main>

<style>
	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
	main {
		padding: 0.5rem;
	}
</style>