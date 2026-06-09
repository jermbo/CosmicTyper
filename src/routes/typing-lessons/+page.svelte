<script lang="ts">
	import { onMount } from 'svelte';
	import LessonsList from '$lib/components/LessonsList.svelte';
	import { lessonsStore } from '$lib/stores/lessons.svelte';

	onMount(async () => {
		if (!lessonsStore.typingLessons.length) {
			await lessonsStore.loadTypingLessons();
		}
	});
</script>

<section class="page">
	<header class="page-header">
		<h1>Typing Lessons</h1>
		<p>In this section, you can work on your general typing skills.</p>
	</header>

	<LessonsList baseURL="typing-lessons" lessons={lessonsStore.typingLessons} />
</section>

<style>
	.page {
		max-width: 960px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.page-header {
		margin: var(--size-4) 0;
	}

	.page-header h1 {
		font-size: var(--size-3);
		margin: 0 0 0.5rem;
	}

	.page-header p {
		margin: 0;
		color: var(--color-grey-dark);
	}
</style>
