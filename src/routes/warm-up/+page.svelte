<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import TypingGUI from '$lib/components/TypingGUI/TypingGUI.svelte';
	import ResultsScreen from '$lib/components/ResultsScreen.svelte';
	import { attemptsStore } from '$lib/stores/attempts.svelte';
	import { learnerStore } from '$lib/stores/learner.svelte';
	import { generateDrill } from '$lib/utils/drill';
	import type { TypingLesson, LessonResult, Attempt } from '$lib/types';

	let lesson = $state<TypingLesson | null>(null);
	let result = $state<LessonResult | null>(null);
	let previous = $state<Attempt | null>(null);
	let runKey = $state(0);

	onMount(() => {
		const learner = learnerStore.activeLearner;
		if (!learner) return; // layout guard redirects to the selection screen
		lesson = generateDrill(attemptsStore.troubleKeys(learner.id), learner.id);
	});

	function handleComplete(res: LessonResult) {
		const learner = learnerStore.activeLearner;
		if (!learner) return;

		// Compare against the previous warm-up, whichever day it was generated.
		previous = attemptsStore.latestDrillFor(learner.id);
		attemptsStore.add({
			learnerId: learner.id,
			lessonId: res.lessonId,
			lessonType: 'typing',
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
		runKey++; // remount the typer for a fresh run of the same drill
	}

	function done() {
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>Warm-up — Student Typer</title>
</svelte:head>

{#if lesson}
	{#key runKey}
		<TypingGUI {lesson} oncomplete={handleComplete} />
	{/key}

	{#if result}
		<ResultsScreen lessonTitle="Warm-up" {result} {previous} ontryagain={tryAgain} ondone={done} />
	{/if}
{/if}
