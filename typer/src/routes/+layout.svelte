<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<Nav />

<main>
	{@render children()}
</main>

<style>
	main {
		padding-top: var(--navbar-height);
	}
</style>
