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

	// Routes reachable without an active learner.
	const PUBLIC_ROUTES = ['/', '/admin/login'];
	const isAdmin = $derived(page.url.pathname.startsWith('/admin'));

	onMount(() => {
		learnerStore.load();
		attemptsStore.load();
		hydrated = true;
	});

	// Guard: bounce to the selection screen when no learner is active.
	$effect(() => {
		if (!browser || !hydrated) return;
		const path = page.url.pathname;
		if (!learnerStore.activeLearner && !PUBLIC_ROUTES.includes(path) && !path.startsWith('/admin')) {
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>Student Typer</title>
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>

{#if !isAdmin}
	<Nav />
{/if}

<main id="main-content" class:admin-main={isAdmin}>
	{#if hydrated || isAdmin}
		{@render children()}
	{/if}
</main>

<style>
	.skip-link {
		position: absolute;
		top: -100%;
		left: 0;
		padding: 0.5rem 1rem;
		background: var(--color-dark);
		color: var(--color-white);
		z-index: 9999;
		font-size: var(--size-6);
		text-decoration: none;
		border-radius: 0 0 4px 0;
		transition: top 0.1s;
	}

	.skip-link:focus {
		top: 0;
	}

	main {
		padding-top: var(--navbar-height);
	}

	main.admin-main {
		padding-top: 0;
	}
</style>
