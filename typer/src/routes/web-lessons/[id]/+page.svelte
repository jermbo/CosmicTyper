<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import CodeGUI from '$lib/components/CodeGUI/CodeGUI.svelte';
	import { lessonsStore } from '$lib/stores/lessons.svelte';
	import type { WebLesson } from '$lib/types';

	let lesson = $state<WebLesson | null>(null);

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

	function markComplete(lessonId: string) {
		lessonsStore.toggleWebLesson(lessonId);
		goto('/web-lessons');
	}
</script>

<CodeGUI {lesson} onsectionfinished={markComplete} />
