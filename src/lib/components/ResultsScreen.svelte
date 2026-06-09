<script lang="ts">
	import type { Attempt, LessonResult } from '$lib/types';
	import { formatDuration } from '$lib/utils/format';

	interface Props {
		lessonTitle: string;
		result: LessonResult;
		/** Most recent prior attempt for this lesson/learner, before this run. */
		previous: Attempt | null;
		ontryagain?: () => void;
		ondone?: () => void;
	}

	let { lessonTitle, result, previous, ontryagain, ondone }: Props = $props();

	// Comparison lines vs. the previous attempt.
	let comparisons = $derived.by(() => {
		if (!previous) return ['First time completing this lesson 🎉'];

		const lines: string[] = [];

		const accDelta = result.accuracy - previous.accuracy;
		if (accDelta > 0) lines.push(`Better than last time! ↑ ${accDelta}% accuracy`);
		else if (accDelta < 0) lines.push(`↓ ${Math.abs(accDelta)}% accuracy vs. last time`);
		else lines.push('Same accuracy as last time');

		const timeDelta = Math.round(previous.duration - result.duration);
		if (timeDelta > 0) lines.push(`Faster! ↓ ${formatDuration(timeDelta)} vs. last time`);
		else if (timeDelta < 0)
			lines.push(`↑ ${formatDuration(Math.abs(timeDelta))} slower than last time`);

		return lines;
	});
</script>

<div class="overlay" role="dialog" aria-modal="true" aria-label="Lesson results">
	<div class="card">
		<p class="eyebrow">Lesson complete</p>
		<h2 class="title">{lessonTitle}</h2>

		<div class="stats">
			<div class="stat">
				<span class="stat-value">{formatDuration(result.duration)}</span>
				<span class="stat-label">Time</span>
			</div>
			<div class="stat">
				<span class="stat-value">{result.keystrokes}</span>
				<span class="stat-label">Keystrokes</span>
			</div>
			<div class="stat">
				<span class="stat-value">{result.mistakes}</span>
				<span class="stat-label">Mistakes</span>
			</div>
			<div class="stat">
				<span class="stat-value">{result.accuracy}%</span>
				<span class="stat-label">Accuracy</span>
			</div>
		</div>

		<ul class="comparisons">
			{#each comparisons as line}
				<li>{line}</li>
			{/each}
		</ul>

		<div class="actions">
			<button class="btn btn-ghost" onclick={() => ontryagain?.()}>Try Again</button>
			<button class="btn btn-primary" onclick={() => ondone?.()}>Done</button>
		</div>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: rgba(54, 54, 54, 0.55);
	}

	.card {
		background: var(--color-white);
		border-radius: 14px;
		padding: 2rem;
		max-width: 520px;
		width: 100%;
		text-align: center;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
	}

	.eyebrow {
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: var(--size-7);
		color: var(--color-grey-dark);
		margin: 0;
	}

	.title {
		font-size: var(--size-3);
		margin: 0.25rem 0 1.5rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem 0.5rem;
		background: var(--color-grey-lighter);
		border-radius: 8px;
	}

	.stat-value {
		font-size: var(--size-4);
		font-weight: 700;
		color: var(--color-dark);
	}

	.stat-label {
		font-size: var(--size-7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-grey-dark);
	}

	.comparisons {
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.comparisons li {
		font-size: var(--size-6);
		color: var(--color-dark);
	}

	.actions {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
	}

	.btn {
		font-family: inherit;
		font-size: var(--size-6);
		padding: 0.6rem 1.5rem;
		border-radius: 6px;
		border: 2px solid transparent;
		cursor: pointer;
	}

	.btn-primary {
		background: var(--color-blue);
		color: var(--color-white);
	}

	.btn-ghost {
		background: transparent;
		border-color: var(--color-grey-light);
		color: var(--color-dark);
	}

	@media (max-width: 520px) {
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
