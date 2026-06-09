<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import TypingGUI from '$lib/components/TypingGUI/TypingGUI.svelte';
	import { lessonsStore } from '$lib/stores/lessons.svelte';
	import type { TypingLesson } from '$lib/types';

	let lesson = $state<TypingLesson | null>(null);

	const id = $derived(page.params.id ?? '');

	onMount(() => {
		if (!lessonsStore.typingLessons.length) {
			goto('/typing-lessons');
			return;
		}
		findLesson();
	});

	function findLesson() {
		const title = id.split('_').join(' ').toLowerCase();
		lesson = lessonsStore.typingLessons.find((l) => l.title.toLowerCase() === title) ?? null;
	}

	function markComplete(lessonId: string) {
		lessonsStore.toggleTypingLesson(lessonId);
		goto('/typing-lessons');
	}
</script>

<TypingGUI {lesson} onsectionfinished={markComplete} />
