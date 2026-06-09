<script lang="ts">
	import type { WebLesson, LessonResult } from '$lib/types';
	import Typer from './Typer.svelte';
	import HTMLOutput from './HTMLOutput.svelte';
	import CodeOutput from './CodeOutput.svelte';

	interface Props {
		lesson: WebLesson | null;
		oncomplete?: (result: LessonResult) => void;
	}

	let { lesson, oncomplete }: Props = $props();
</script>

<div class="code-gui">
	<div class="code-view">
		<Typer {lesson} {oncomplete} />
	</div>
	<div class="render-view">
		<HTMLOutput />
	</div>
	<div class="mini-maps">
		<CodeOutput />
	</div>
</div>

<style>
	.code-gui {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: minmax(50vh, 80vh) minmax(15vh, 50vh);
		grid-template-areas:
			'code render render'
			'code minimap minimap';
		height: calc(100vh - var(--navbar-height));
		width: 100vw;
		position: fixed;
		top: var(--navbar-height);
		left: 0;
	}

	.code-view {
		grid-area: code;
	}

	.render-view {
		grid-area: render;
	}

	.mini-maps {
		grid-area: minimap;
	}
</style>
