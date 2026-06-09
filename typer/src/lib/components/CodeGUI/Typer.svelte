<script lang="ts">
	import type { WebLesson } from '$lib/types';
	import { codeData } from '$lib/stores/codeData.svelte';

	interface Props {
		lesson: WebLesson | null;
		onendlesson?: (id: string) => void;
	}

	let { lesson, onendlesson }: Props = $props();

	let currentStep = $state(0);
	let currentRow = $state(0);
	let currentChar = $state(0);
	let actionOutput = $state<string[][]>([]);

	const modifiers = ['CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'Tab'];

	$effect(() => {
		if (lesson) {
			resetView();
			loadStep();
		}
	});

	function resetView() {
		currentStep = 0;
		currentRow = 0;
		currentChar = 0;
		codeData.reset();
	}

	function loadStep() {
		if (!lesson) return;
		actionOutput = lesson.steps[currentStep].action.map((line) => line.split(''));
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lesson || !actionOutput.length) return;
		const key = e.key;
		if (modifiers.includes(key)) return;
		e.preventDefault();

		if (key !== actionOutput[currentRow][currentChar]) return;

		if (endOfRow()) {
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
		updateRenderView();
		currentStep++;

		if (endOfLesson()) {
			resetView();
			onendlesson?.(lesson.id);
		} else {
			loadStep();
		}
	}

	function updateRenderView() {
		if (!lesson) return;
		const step = lesson.steps[currentStep];
		if (!step.render) return;

		if (step.type === 'dom') {
			codeData.pushHtml(step.action);
		} else if (step.type === 'style') {
			codeData.pushCss(step.action);
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
						>
							{char}
						</span>
					{/each}
				</div>
			{/each}
		</div>

		<div class="code-lesson">
			<h1 class="code-lesson__title">Lesson:</h1>
			<p class="code-lesson__desc">{lesson.steps[currentStep].desc}</p>
		</div>
	</div>
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
		padding: 1rem;
		overflow-y: auto;
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
	}

	.complete,
	.correct {
		color: var(--color-code-correct);
		border-bottom: 1px solid var(--color-code-correct);
		font-weight: bold;
	}

	.cursor {
		animation: cursorBlink 1.25s ease infinite;
	}
</style>
