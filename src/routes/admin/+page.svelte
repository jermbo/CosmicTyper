<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Lessons — Admin</title>
</svelte:head>

<h1>Lessons</h1>
<p class="intro">Edit lesson content stored in <code>data/lessons/</code>. Changes are live after save.</p>

<section>
	<div class="section-head">
		<h2>Web lessons</h2>
		<form method="POST" action="?/newWeb">
			<button type="submit">+ New web lesson</button>
		</form>
	</div>
	<ul class="lesson-list">
		{#each data.webLessons as lesson (lesson.id)}
			<li>
				<a href="/admin/web/{lesson.id}">
					<span class="title">{lesson.title}</span>
					<span class="meta">{lesson.difficulty} · {lesson.steps.length} steps</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<section>
	<div class="section-head">
		<h2>Typing lessons</h2>
		<form method="POST" action="?/newTyping">
			<button type="submit">+ New typing lesson</button>
		</form>
	</div>
	<ul class="lesson-list">
		{#each data.typingLessons as lesson (lesson.id)}
			<li>
				<a href="/admin/typing/{lesson.id}">
					<span class="title">{lesson.title}</span>
					<span class="meta">{lesson.difficulty} · {lesson.steps.length} lines</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	h1 {
		margin: 0 0 0.5rem;
		font-size: var(--size-2);
	}

	.intro {
		margin: 0 0 2rem;
		color: var(--color-grey-dark);
	}

	section {
		margin-bottom: 2.5rem;
	}

	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	h2 {
		margin: 0;
		font-size: var(--size-4);
	}

	.section-head button {
		font: inherit;
		font-size: var(--size-6);
		padding: 0.4rem 0.75rem;
		border: none;
		border-radius: 6px;
		background: var(--color-blue);
		color: var(--color-white);
		cursor: pointer;
	}

	.lesson-list {
		list-style: none;
		margin: 0;
		padding: 0;
		background: var(--color-white);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
	}

	.lesson-list li + li {
		border-top: 1px solid var(--color-grey-lighter);
	}

	.lesson-list a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.85rem 1rem;
		text-decoration: none;
		color: inherit;
	}

	.lesson-list a:hover {
		background: var(--color-grey-lighter);
	}

	.title {
		font-weight: 600;
	}

	.meta {
		font-size: var(--size-7);
		color: var(--color-grey-dark);
		white-space: nowrap;
	}
</style>
