<script lang="ts">
	import { onMount } from 'svelte';
	import LessonsList from '$lib/components/LessonsList.svelte';
	import { lessonsStore } from '$lib/stores/lessons.svelte';

	onMount(async () => {
		if (!lessonsStore.webLessons.length) {
			await lessonsStore.loadWebLessons();
		}
	});
</script>

<svelte:head>
	<title>Web Lessons — Student Typer</title>
</svelte:head>

<section class="page">
	<header class="page-header">
		<h1>Web Lessons</h1>
		<p>Let's learn how to type, while learning the basics of HTML and CSS.</p>
	</header>

	<LessonsList baseURL="web-lessons" lessons={lessonsStore.webLessons} />
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
