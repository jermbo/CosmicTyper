<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import CodeGUI from '$lib/components/CodeGUI/CodeGUI.svelte';
	import ResultsScreen from '$lib/components/ResultsScreen.svelte';
	import { lessonsStore } from '$lib/stores/lessons.svelte';
	import { attemptsStore } from '$lib/stores/attempts.svelte';
	import { learnerStore } from '$lib/stores/learner.svelte';
	import type { WebLesson, LessonResult, Attempt } from '$lib/types';
	import { slugify } from '$lib/utils/lesson';

	let lesson = $state<WebLesson | null>(null);
	let result = $state<LessonResult | null>(null);
	let previous = $state<Attempt | null>(null);
	let runKey = $state(0);
	let loading = $state(true);

	const id = $derived(page.params.id ?? '');

	onMount(async () => {
		if (!lessonsStore.webLessons.length) {
			await lessonsStore.loadWebLessons();
		}
		lesson = lessonsStore.webLessons.find((l) => slugify(l.title) === id) ?? null;
		loading = false;
	});

	function handleComplete(res: LessonResult) {
		const learner = learnerStore.activeLearner;
		if (!learner) return;

		// Capture the prior best-known attempt before recording this one.
		previous = attemptsStore.latestFor(learner.id, res.lessonId);
		attemptsStore.add({
			learnerId: learner.id,
			lessonId: res.lessonId,
			lessonType: 'web',
			duration: res.duration,
			keystrokes: res.keystrokes,
			mistakes: res.mistakes,
			accuracy: res.accuracy,
			keyMistakes: res.keyMistakes
		});
		result = res;
	}

	function tryAgain() {
		result = null;
		previous = null;
		runKey++; // remount the typer for a fresh run
	}

	function done() {
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>{lesson ? `${lesson.title} — Student Typer` : 'Lesson — Student Typer'}</title>
</svelte:head>

{#if loading}
	<p class="loading" aria-live="polite">Loading lesson…</p>
{:else if !lesson}
	<section class="not-found">
		<h1>Lesson not found</h1>
		<p>This lesson doesn't exist or may have been removed.</p>
		<a href="/web-lessons">Back to Web Lessons</a>
	</section>
{:else}
	{#key runKey}
		<CodeGUI {lesson} oncomplete={handleComplete} />
	{/key}

	{#if result}
		<ResultsScreen
			lessonTitle={lesson.title}
			{result}
			{previous}
			ontryagain={tryAgain}
			ondone={done}
		/>
	{/if}
{/if}

<style>
	.loading {
		text-align: center;
		padding: 4rem;
		color: var(--color-grey-dark);
	}

	.not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 4rem 1rem;
		text-align: center;
	}

	.not-found h1 {
		font-size: var(--size-2);
		margin: 0;
	}

	.not-found p {
		color: var(--color-grey-dark);
		margin: 0;
	}

	.not-found a {
		color: var(--color-blue);
	}
</style>
