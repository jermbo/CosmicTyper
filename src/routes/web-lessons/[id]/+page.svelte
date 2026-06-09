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

	let lesson = $state<WebLesson | null>(null);
	let result = $state<LessonResult | null>(null);
	let previous = $state<Attempt | null>(null);
	let runKey = $state(0);

	const id = $derived(page.params.id ?? '');

	onMount(() => {
		if (!lessonsStore.webLessons.length) {
			goto('/web-lessons');
			return;
		}
		findLesson();
	});

	function findLesson() {
		const title = id.split('_').join(' ').toLowerCase();
		lesson = lessonsStore.webLessons.find((l) => l.title.toLowerCase() === title) ?? null;
	}

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
			accuracy: res.accuracy
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

{#key runKey}
	<CodeGUI {lesson} oncomplete={handleComplete} />
{/key}

{#if result && lesson}
	<ResultsScreen
		lessonTitle={lesson.title}
		{result}
		{previous}
		ontryagain={tryAgain}
		ondone={done}
	/>
{/if}
