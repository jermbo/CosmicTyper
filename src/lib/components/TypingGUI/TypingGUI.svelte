<script lang="ts">
	import { untrack } from 'svelte';
	import type { TypingLesson, LessonResult } from '$lib/types';

	interface Props {
		lesson: TypingLesson | null;
		oncomplete?: (result: LessonResult) => void;
	}

	let { lesson, oncomplete }: Props = $props();

	let currentStep = $state(0);
	let currentChar = $state(0);

	// Progress metrics for this run
	let keystrokes = $state(0);
	let mistakes = $state(0);
	let startTime: number | null = null;

	// Wrong-key flash ("show and forgive")
	let wrong = $state(false);
	let wrongTimer: ReturnType<typeof setTimeout> | null = null;

	// Derived so it updates when currentStep advances without re-triggering the effect
	let actionOutput = $derived(lesson ? (lesson.steps[currentStep]?.split('') ?? []) : []);

	const modifiers = ['CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'Tab'];

	// Only re-run when lesson itself changes; untrack prevents currentStep/currentChar
	// from being tracked as dependencies here
	$effect(() => {
		lesson;
		untrack(() => {
			currentStep = 0;
			currentChar = 0;
			keystrokes = 0;
			mistakes = 0;
			startTime = null;
			clearFlash();
		});
	});

	function clearFlash() {
		if (wrongTimer) clearTimeout(wrongTimer);
		wrong = false;
	}

	function flashWrong() {
		wrong = true;
		if (wrongTimer) clearTimeout(wrongTimer);
		wrongTimer = setTimeout(() => (wrong = false), 300);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lesson || !actionOutput.length) return;
		const key = e.key;
		if (modifiers.includes(key)) return;
		e.preventDefault();

		if (startTime === null) startTime = Date.now();
		keystrokes++;

		// Wrong key: count it, flash, but don't advance.
		if (key !== actionOutput[currentChar]) {
			mistakes++;
			flashWrong();
			return;
		}

		currentChar++;

		if (endOfStep()) {
			currentChar = 0;
			currentStep++;

			if (endOfLesson()) {
				currentStep = 0;
				complete(lesson.id);
			}
		}
	}

	function complete(lessonId: string) {
		const duration = startTime ? (Date.now() - startTime) / 1000 : 0;
		const accuracy = keystrokes ? Math.round(((keystrokes - mistakes) / keystrokes) * 100) : 100;
		oncomplete?.({ lessonId, duration, keystrokes, mistakes, accuracy });
	}

	function endOfStep(): boolean {
		return currentChar > actionOutput.length - 1;
	}

	function endOfLesson(): boolean {
		if (!lesson) return true;
		return currentStep > lesson.steps.length - 1;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="typing-wrapper">
	{#if lesson}
		<div class="progress-track">
			<div class="progress-fill" style="width: {(currentStep / lesson.steps.length) * 100}%"></div>
		</div>
		<div class="progress-label">
			Step {currentStep + 1} / {lesson.steps.length}
		</div>
	{/if}

	<div class="typing-inner">
		{#if lesson}
			<div class="row">
				{#each actionOutput as char, index}
					<span
						class="character"
						class:correct={currentChar > index}
						class:cursor={currentChar === index}
						class:wrong={wrong && currentChar === index}
					>
						{char}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.typing-wrapper {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--navbar-height));
		width: 100vw;
		position: fixed;
		top: var(--navbar-height);
		left: 0;
	}

	.progress-track {
		height: 4px;
		background: var(--color-grey-light);
		flex-shrink: 0;
	}

	.progress-fill {
		height: 100%;
		background: var(--color-primary);
		transition: width 0.3s ease;
	}

	.progress-label {
		text-align: right;
		padding: 0.25rem var(--padding);
		font-size: var(--size-7);
		color: var(--color-grey-dark);
		flex-shrink: 0;
	}

	.typing-inner {
		flex: 1;
		font-size: var(--size-4);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 calc(var(--padding) * 4);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 0;
	}

	.character {
		min-width: 0.5ch;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.correct {
		color: var(--color-code-correct);
		border-bottom: 1px solid var(--color-code-correct);
		font-weight: bold;
	}

	.cursor {
		border-bottom: 3px solid;
		animation: cursorBlink 1.25s ease infinite;
	}

	.wrong {
		border-radius: 3px;
		animation: wrongFlash 0.3s ease;
	}
</style>
