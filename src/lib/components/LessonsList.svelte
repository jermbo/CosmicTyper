<script lang="ts">
	import type { WebLesson, TypingLesson } from '$lib/types';
	import { slugify } from '$lib/utils/lesson';
	import { learnerStore } from '$lib/stores/learner.svelte';
	import { attemptsStore } from '$lib/stores/attempts.svelte';

	interface Props {
		lessons: WebLesson[] | TypingLesson[];
		baseURL: string;
	}

	let { lessons, baseURL }: Props = $props();

	type Filter = 'all' | 'easy' | 'medium' | 'hard';
	const filters: Filter[] = ['all', 'easy', 'medium', 'hard'];
	let activeFilter = $state<Filter>('all');

	let visibleLessons = $derived(
		activeFilter === 'all'
			? lessons
			: lessons.filter((lesson) => lesson.difficulty === activeFilter)
	);

	// Completion is derived per active learner from their attempts.
	let completedIds = $derived(
		learnerStore.activeLearner
			? attemptsStore.completedLessonIds(learnerStore.activeLearner.id)
			: new Set<string>()
	);
</script>

<div class="filter-bar" role="group" aria-label="Filter lessons by difficulty">
	{#each filters as filter (filter)}
		<button
			type="button"
			class="filter-btn"
			class:active={activeFilter === filter}
			aria-pressed={activeFilter === filter}
			onclick={() => (activeFilter = filter)}
		>
			{filter === 'all' ? 'All' : filter[0].toUpperCase() + filter.slice(1)}
		</button>
	{/each}
</div>

<div class="lesson-table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Done</th>
				<th>Lesson Name</th>
				<th>Difficulty</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each visibleLessons as lesson (lesson.id)}
				{@const isCompleted = completedIds.has(lesson.id)}
				<tr class:completed={isCompleted}>
					<td class="col-done">
						{#if isCompleted}
							<span class="check" aria-hidden="true">✓</span>
							<span class="sr-only">Completed</span>
						{/if}
					</td>
					<td class="col-title">{lesson.title}</td>
					<td class="col-difficulty">{lesson.difficulty}</td>
					<td class="col-action">
						<a class="btn-start" href={`/${baseURL}/${slugify(lesson.title)}`}> Start Lesson </a>
					</td>
				</tr>
			{:else}
				<tr>
					<td class="empty" colspan="4">No lessons match this difficulty.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.filter-bar {
		display: flex;
		gap: 0.4rem;
		margin-bottom: var(--size-6);
		flex-wrap: wrap;
	}

	.filter-btn {
		padding: 0.35rem 0.9rem;
		border: 1px solid var(--color-grey-light);
		border-radius: 999px;
		background: var(--color-white);
		color: var(--color-grey-dark);
		font-size: var(--size-7);
		cursor: pointer;
		transition:
			background 0.15s ease,
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.filter-btn:hover {
		background: var(--color-grey-lighter);
	}

	.filter-btn.active {
		background: var(--color-blue);
		border-color: var(--color-blue);
		color: var(--color-white);
	}

	.empty {
		text-align: center;
		color: var(--color-grey-dark);
		padding: 1.5rem;
	}

	.lesson-table-wrapper {
		max-height: 75vh;
		overflow-y: auto;
		border: 1px solid var(--color-grey-light);
		border-radius: 4px;
		background: var(--color-white);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	th {
		background: var(--color-grey-lighter);
		padding: 0.6rem var(--padding);
		text-align: left;
		font-weight: 600;
		font-size: var(--size-7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-grey-dark);
	}

	td {
		padding: 0.6rem var(--padding);
		border-bottom: 1px solid var(--color-grey-lighter);
		vertical-align: middle;
	}

	tr:last-child td {
		border-bottom: none;
	}

	tr:nth-child(even) td {
		background: #fafaf8;
	}

	tr:hover td {
		background: #f0f0ea;
	}

	tr.completed td {
		background: #edf7ed;
		color: var(--color-dark);
	}

	tr.completed:hover td {
		background: #e3f2e3;
	}

	.col-done {
		width: 5%;
		text-align: center;
	}

	.col-title {
		width: 60%;
	}

	.col-difficulty {
		width: 20%;
		text-transform: capitalize;
		font-size: var(--size-7);
		color: var(--color-grey-dark);
	}

	.col-action {
		width: 15%;
	}

	.check {
		color: #3a9a3a;
		font-weight: bold;
		font-size: 1rem;
	}

	.btn-start {
		display: inline-block;
		padding: 0.25rem 0.6rem;
		background: var(--color-blue);
		color: var(--color-white);
		text-decoration: none;
		border-radius: 3px;
		font-size: var(--size-7);
		transition: background 0.2s ease;
		white-space: nowrap;
	}

	.btn-start:hover {
		background: #2787b3;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
