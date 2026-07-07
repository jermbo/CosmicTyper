<script lang="ts">
	import { untrack } from 'svelte';
	import type { WebLesson, LessonResult } from '$lib/types';
	import { codeData } from '$lib/stores/codeData.svelte';
	import KeyboardDock from '$lib/components/KeyboardGuide/KeyboardDock.svelte';

	interface Props {
		lesson: WebLesson | null;
		oncomplete?: (result: LessonResult) => void;
	}

	let { lesson, oncomplete }: Props = $props();

	let currentStep = $state(0);
	let currentRow = $state(0);
	let currentChar = $state(0);

	// Progress metrics for this run
	let keystrokes = $state(0);
	let mistakes = $state(0);
	let keyMistakes: Record<string, number> = {};
	let startTime: number | null = null;

	// Wrong-key flash ("show and forgive")
	let wrong = $state(false);
	let wrongTimer: ReturnType<typeof setTimeout> | null = null;

	// Derived so it updates when currentStep advances without re-triggering the effect
	let actionOutput = $derived(
		lesson ? (lesson.steps[currentStep]?.action.map((line) => line.split('')) ?? []) : []
	);
	let nextChar = $derived(actionOutput[currentRow]?.[currentChar] ?? null);

	const modifiers = ['CapsLock', 'Shift', 'Control', 'Alt', 'Meta'];

	// Only re-run when lesson itself changes
	$effect(() => {
		lesson;
		untrack(() => {
			currentStep = 0;
			currentRow = 0;
			currentChar = 0;
			keystrokes = 0;
			mistakes = 0;
			keyMistakes = {};
			startTime = null;
			clearFlash();
			codeData.reset();
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
		if (key !== actionOutput[currentRow][currentChar]) {
			mistakes++;
			// The expected char is what needs practice, regardless of what was pressed.
			const expected = actionOutput[currentRow][currentChar];
			keyMistakes[expected] = (keyMistakes[expected] ?? 0) + 1;
			flashWrong();
			return;
		}

		if (endOfRow()) {
			commitRow(currentRow);
			currentRow++;
			currentChar = -1;
		}
		currentChar++;

		if (endOfStep()) {
			currentRow = 0;
			currentChar = 0;
			advanceStep();
		}
	}

	function endOfRow(): boolean {
		return currentChar >= actionOutput[currentRow].length - 1;
	}

	function endOfStep(): boolean {
		return currentRow > actionOutput.length - 1;
	}

	function endOfLesson(): boolean {
		if (!lesson) return true;
		return currentStep > lesson.steps.length - 1;
	}

	function advanceStep() {
		if (!lesson) return;
		currentStep++;

		if (endOfLesson()) {
			complete(lesson.id);
		}
	}

	function complete(lessonId: string) {
		const duration = startTime ? (Date.now() - startTime) / 1000 : 0;
		const accuracy = keystrokes ? Math.round(((keystrokes - mistakes) / keystrokes) * 100) : 100;
		oncomplete?.({ lessonId, duration, keystrokes, mistakes, accuracy, keyMistakes });
	}

	function commitRow(rowIndex: number) {
		if (!lesson) return;
		const step = lesson.steps[currentStep];
		if (!step?.render) return;

		const line = step.action[rowIndex];
		if (line === undefined) return;

		if (step.type === 'dom') {
			codeData.pushHtml([line]);
		} else if (step.type === 'style') {
			codeData.pushCss([line]);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if lesson}
	<div class="code-container">
		<div class="code-block">
			{#each actionOutput as row, rowIndex}
				<div
					class="row"
					class:complete-row={currentRow > rowIndex}
					class:current-row={currentRow === rowIndex}
				>
					{#each row as char, charIndex}
						<span
							class="character"
							class:complete={currentRow > rowIndex}
							class:correct={currentRow === rowIndex && currentChar > charIndex}
							class:cursor={currentRow === rowIndex && currentChar === charIndex}
							class:wrong={wrong && currentRow === rowIndex && currentChar === charIndex}
						>
							{char}
						</span>
					{/each}
				</div>
			{/each}
		</div>

		<div class="code-lesson">
			<div
				class="progress-track"
				role="progressbar"
				aria-valuenow={currentStep}
				aria-valuemin={0}
				aria-valuemax={lesson.steps.length}
				aria-label="Lesson progress"
			>
				<div
					class="progress-fill"
					style="width: {(currentStep / lesson.steps.length) * 100}%"
				></div>
			</div>
			<div class="progress-label" aria-hidden="true">
				Step {currentStep + 1} / {lesson.steps.length}
			</div>
			<h1 class="code-lesson__title">Lesson:</h1>
			<p class="code-lesson__desc">{lesson.steps[currentStep]?.desc ?? ''}</p>
		</div>
	</div>

	<KeyboardDock {nextChar} />
{/if}

<style>
	.code-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'code'
			'desc';
		height: 100%;
	}

	.code-block {
		grid-area: code;
		color: #f2f8ff;
		background: var(--color-code-bg);
		overflow-y: auto;
	}

	.code-lesson {
		grid-area: desc;
		border: 4px solid var(--color-code-bg);
		border-top: 0;
		border-bottom: 0;
		background: var(--color-white);
		padding: 0 1rem 1rem;
		overflow-y: auto;
	}

	.progress-track {
		height: 4px;
		background: var(--color-grey-light);
		margin: 0 -1rem 0.5rem;
	}

	.progress-fill {
		height: 100%;
		background: var(--color-primary);
		transition: width 0.3s ease;
	}

	.progress-label {
		text-align: right;
		font-size: var(--size-7);
		color: var(--color-grey-dark);
		margin-bottom: 0.5rem;
	}

	.code-lesson__title {
		margin: 0;
		font-size: var(--size-5);
	}

	.code-lesson__desc {
		margin: 0.5rem 0 0;
	}

	.row {
		min-height: 25px;
		display: flex;
		flex-wrap: wrap;
		padding: 0 calc(var(--padding) / 2);
	}

	.row.complete-row,
	.row.current-row {
		background: var(--color-code-row);
	}

	.character {
		padding: 0;
		min-width: 7px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* Always reserve the underline space so toggling correct/cursor
		   never changes the box height and shifts the line. */
		border-bottom: 3px solid transparent;
	}

	.complete,
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
