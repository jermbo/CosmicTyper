<script lang="ts">
	import { untrack } from 'svelte';
	import type { TypingLesson } from '$lib/types';

	interface Props {
		lesson: TypingLesson | null;
		onsectionfinished?: (id: string) => void;
	}

	let { lesson, onsectionfinished }: Props = $props();

	let currentStep = $state(0);
	let currentChar = $state(0);

	// Derived so it updates when currentStep advances without re-triggering the effect
	let actionOutput = $derived(lesson ? lesson.steps[currentStep]?.split('') ?? [] : []);

	const modifiers = ['CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'Tab'];

	// Only re-run when lesson itself changes; untrack prevents currentStep/currentChar
	// from being tracked as dependencies here
	$effect(() => {
		lesson;
		untrack(() => {
			currentStep = 0;
			currentChar = 0;
		});
	});

	function handleKeydown(e: KeyboardEvent) {
		if (!lesson || !actionOutput.length) return;
		const key = e.key;
		if (modifiers.includes(key)) return;
		e.preventDefault();

		if (key !== actionOutput[currentChar]) return;

		currentChar++;

		if (endOfStep()) {
			currentChar = 0;
			currentStep++;

			if (endOfLesson()) {
				currentStep = 0;
				onsectionfinished?.(lesson.id);
			}
		}
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
	<div class="typing-inner">
		{#if lesson}
			<div class="row">
				{#each actionOutput as char, index}
					<span
						class="character"
						class:correct={currentChar > index}
						class:cursor={currentChar === index}
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
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		height: calc(100vh - var(--navbar-height));
		width: 100vw;
		position: fixed;
		top: var(--navbar-height);
		left: 0;
	}

	.typing-inner {
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
</style>
