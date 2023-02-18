<script>
	import '../styles/styles.scss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<header>
	<Nav />
</header>

<main>
	<slot />
</main>

<style>
	main {
		@apply p-4;
	}
</style>
