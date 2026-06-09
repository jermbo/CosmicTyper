<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { learnerStore } from '$lib/stores/learner.svelte';
	import { attemptsStore } from '$lib/stores/attempts.svelte';

	let { children } = $props();

	let hydrated = $state(false);

	// The learner-selection screen is the only route reachable without an
	// active learner.
	const PUBLIC_ROUTES = ['/'];

	onMount(() => {
		learnerStore.load();
		attemptsStore.load();
		hydrated = true;
	});

	// Guard: bounce to the selection screen when no learner is active.
	$effect(() => {
		if (!browser || !hydrated) return;
		const path = page.url.pathname;
		if (!learnerStore.activeLearner && !PUBLIC_ROUTES.includes(path)) {
			goto('/');
		}
	});
</script>

<Nav />

<main>
	{#if hydrated}
		{@render children()}
	{/if}
</main>

<style>
	main {
		padding-top: var(--navbar-height);
	}
</style>
