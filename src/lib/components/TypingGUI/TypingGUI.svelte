<script lang="ts">
	import { untrack, tick } from 'svelte';
	import type { TypingLesson, LessonResult } from '$lib/types';
	import KeyboardDock from '$lib/components/KeyboardGuide/KeyboardDock.svelte';

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

	// All lines in the lesson, shown stacked as ghost lines (done / active / upcoming).
	let lines = $derived(lesson?.steps ?? []);
	let nextChar = $derived(actionOutput[currentChar] ?? null);
	let lineEls = $state<HTMLElement[]>([]);

	const modifiers = ['CapsLock', 'Shift', 'Control', 'Alt', 'Meta'];

	// Teleprompter: keep the active line pinned at the vertical center as the
	// learner advances. tick() lets the DOM settle (e.g. after a lesson reset)
	// before we measure and scroll.
	$effect(() => {
		const step = currentStep;
		lesson;
		tick().then(() => {
			const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			lineEls[step]?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
		});
	});

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
		if (modifiers.includes(key) || key === 'Tab') return;
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
		<div
			class="progress-track"
			role="progressbar"
			aria-valuenow={currentStep}
			aria-valuemin={0}
			aria-valuemax={lesson.steps.length}
			aria-label="Lesson progress"
		>
			<div class="progress-fill" style="width: {(currentStep / lesson.steps.length) * 100}%"></div>
		</div>
		<div class="progress-label" aria-hidden="true">
			Step {currentStep + 1} / {lesson.steps.length}
		</div>
	{/if}

	<div class="typing-inner">
		{#if lesson}
			<div class="lines">
				{#each lines as line, i (i)}
					<div
						class="line"
						class:done={i < currentStep}
						class:current={i === currentStep}
						class:upcoming={i > currentStep}
						bind:this={lineEls[i]}
					>
						{#if i === currentStep}
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
						{:else}
							{line}
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if lesson}
		<KeyboardDock {nextChar} />
	{/if}
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
		overflow: hidden;
	}

	.lines {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* Room so the first and last lines can reach the vertical center. */
		padding: 45vh calc(var(--padding) * 4);
		gap: 0.4em;
	}

	.line {
		max-width: 100%;
		text-align: center;
		white-space: pre-wrap;
		transition:
			opacity 0.3s ease,
			color 0.3s ease;
	}

	/* Completed lines: solid black, de-emphasized. */
	.line.done {
		color: #000;
		opacity: 0.45;
	}

	/* Upcoming lines: a faint gray preview of what's next. */
	.line.upcoming {
		color: var(--color-grey);
		opacity: 0.5;
	}

	/* Active line: highlight band so the eye locks on instantly. */
	.line.current {
		color: var(--color-dark);
		padding: 0.25em 0.75em;
		border-radius: 8px;
		background: var(--color-grey-lighter);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0;
	}

	.character {
		min-width: 0.5ch;
		display: flex;
		justify-content: center;
		align-items: center;
		/* Always reserve the underline space so toggling correct/cursor
		   never changes the box height and shifts the line. */
		border-bottom: 3px solid transparent;
	}

	.correct {
		color: var(--color-code-correct);
		border-bottom-color: var(--color-code-correct);
		font-weight: bold;
	}

	.cursor {
		border-bottom-color: currentColor;
		animation: cursorBlink 1.25s ease infinite;
	}

	.wrong {
		border-radius: 3px;
		animation: wrongFlash 0.3s ease;
	}
</style>
