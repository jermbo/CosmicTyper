<script lang="ts">
	import { goto } from '$app/navigation';
	import { learnerStore } from '$lib/stores/learner.svelte';
	import { SEARCH_THRESHOLD } from '$lib/constants';
	import LearnerCard from '$lib/components/LearnerCard.svelte';
	import CreateLearner from '$lib/components/CreateLearner.svelte';

	let mode = $state<'select' | 'create'>('select');
	let query = $state('');

	let learners = $derived(learnerStore.learners);
	let showSearch = $derived(learners.length > SEARCH_THRESHOLD);
	let filtered = $derived(
		query.trim()
			? learners.filter((l) => l.name.toLowerCase().includes(query.trim().toLowerCase()))
			: learners
	);

	function selectLearner(id: string) {
		learnerStore.setActive(id);
		goto('/dashboard');
	}

	function createLearner(name: string, color: string) {
		const learner = learnerStore.create(name, color);
		learnerStore.setActive(learner.id);
		goto('/dashboard');
	}
</script>

<section class="select-page">
	{#if mode === 'create'}
		<header class="page-header">
			<h1>Add a learner</h1>
			<p>Pick a name and a color so it's easy to find yourself next time.</p>
		</header>
		<div class="create-wrap">
			<CreateLearner oncreate={createLearner} oncancel={() => (mode = 'select')} />
		</div>
	{:else}
		<header class="page-header">
			<h1>Who's typing today?</h1>
			<p>Choose your profile to pick up where you left off.</p>
		</header>

		{#if showSearch}
			<input
				class="search"
				type="search"
				placeholder="Search learners…"
				bind:value={query}
				aria-label="Search learners"
			/>
		{/if}

		<div class="grid">
			{#each filtered as learner (learner.id)}
				<LearnerCard {learner} onselect={selectLearner} />
			{/each}

			<button class="add-card" onclick={() => (mode = 'create')}>
				<span class="plus" aria-hidden="true">+</span>
				<span class="add-label">Add Learner</span>
			</button>
		</div>

		{#if showSearch && filtered.length === 0}
			<p class="empty">No learners match "{query}".</p>
		{/if}
	{/if}
</section>

<style>
	.select-page {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.page-header {
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.page-header h1 {
		font-size: var(--size-2);
		margin: 0 0 0.5rem;
	}

	.page-header p {
		margin: 0;
		color: var(--color-grey-dark);
		font-size: var(--size-5);
	}

	.search {
		display: block;
		width: 100%;
		max-width: 420px;
		margin: 0 auto 1.5rem;
		font-size: var(--size-6);
		padding: 0.6rem 0.75rem;
		border: 2px solid var(--color-grey-light);
		border-radius: 6px;
		font-family: inherit;
	}

	.search:focus {
		outline: none;
		border-color: var(--color-blue);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1rem;
	}

	.add-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1.5rem 1rem;
		background: transparent;
		border: 2px dashed var(--color-grey);
		border-radius: 12px;
		cursor: pointer;
		font-family: inherit;
		color: var(--color-grey-dark);
		min-height: 100%;
		transition:
			border-color 0.15s ease,
			color 0.15s ease;
	}

	.add-card:hover {
		border-color: var(--color-blue);
		color: var(--color-blue);
	}

	.plus {
		font-size: var(--size-1);
		line-height: 1;
		font-weight: 300;
	}

	.add-label {
		font-size: var(--size-6);
		font-weight: 600;
	}

	.create-wrap {
		display: flex;
		justify-content: center;
	}

	.empty {
		text-align: center;
		color: var(--color-grey-dark);
		margin-top: 1.5rem;
	}
</style>
