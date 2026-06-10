<script lang="ts">
	import type { WebLesson, LessonResult } from '$lib/types';
	import Typer from './Typer.svelte';
	import HTMLOutput from './HTMLOutput.svelte';
	import CodeOutput from './CodeOutput.svelte';
	import ResizableSplit from './ResizableSplit.svelte';
	import { buildLessonOutput } from '$lib/utils/lesson';

	interface Props {
		lesson: WebLesson | null;
		oncomplete?: (result: LessonResult) => void;
	}

	let { lesson, oncomplete }: Props = $props();

	// The finished output to show as the "Goal" the learner builds toward.
	let target = $derived(buildLessonOutput(lesson));
</script>

<div class="code-gui">
	<ResizableSplit direction="row" fraction={0.46} defaultFraction={0.46} min={260}>
		{#snippet a()}
			<div class="fill">
				<Typer {lesson} {oncomplete} />
			</div>
		{/snippet}

		{#snippet b()}
			<ResizableSplit direction="column" fraction={0.62} defaultFraction={0.62} min={120}>
				{#snippet a()}
					<div class="fill">
						<HTMLOutput targetHtml={target.html} targetCss={target.css} />
					</div>
				{/snippet}
				{#snippet b()}
					<div class="fill">
						<CodeOutput />
					</div>
				{/snippet}
			</ResizableSplit>
		{/snippet}
	</ResizableSplit>
</div>

<style>
	.code-gui {
		height: calc(100vh - var(--navbar-height));
		width: 100vw;
		position: fixed;
		top: var(--navbar-height);
		left: 0;
	}

	.fill {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
