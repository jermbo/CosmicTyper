<script lang="ts">
	import '$lib/components/admin/admin.css';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const difficultyClass = (d: string) => `pill pill-${d}`;
</script>

<svelte:head>
	<title>Lessons — Admin</title>
</svelte:head>

<header class="admin-page-head">
	<h1>Lessons</h1>
	<p class="sub">Edit content in <code>data/lessons/</code> — changes go live on save.</p>
</header>

<details class="admin-card section" open>
	<summary class="section-summary">
		<span class="chevron" aria-hidden="true"></span>
		<span class="summary-text">
			<strong>Web lessons</strong>
			<span class="section-count">{data.webLessons.length} lessons</span>
		</span>
	</summary>
	<div class="section-body">
		<form method="POST" action="?/newWeb" class="new-form">
			<button type="submit" class="admin-btn primary">+ New web lesson</button>
		</form>
		<ul class="lesson-list">
			{#each data.webLessons as lesson (lesson.id)}
				<li>
					<a href="/admin/web/{lesson.id}">
						<span class="title">{lesson.title}</span>
						<span class="meta">
							<span class={difficultyClass(lesson.difficulty)}>{lesson.difficulty}</span>
							<span class="count">{lesson.steps.length} steps</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</details>

<details class="admin-card section" open>
	<summary class="section-summary">
		<span class="chevron" aria-hidden="true"></span>
		<span class="summary-text">
			<strong>Typing lessons</strong>
			<span class="section-count">{data.typingLessons.length} lessons</span>
		</span>
	</summary>
	<div class="section-body">
		<form method="POST" action="?/newTyping" class="new-form">
			<button type="submit" class="admin-btn primary">+ New typing lesson</button>
		</form>
		<ul class="lesson-list">
			{#each data.typingLessons as lesson (lesson.id)}
				<li>
					<a href="/admin/typing/{lesson.id}">
						<span class="title">{lesson.title}</span>
						<span class="meta">
							<span class={difficultyClass(lesson.difficulty)}>{lesson.difficulty}</span>
							<span class="count">{lesson.steps.length} lines</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</details>

<style>
	.section {
		margin-bottom: 1.25rem;
	}

	.section-summary {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding-bottom: 0.75rem;
		cursor: pointer;
		list-style: none;
	}

	.section-summary::-webkit-details-marker {
		display: none;
	}

	.summary-text {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		font-size: var(--size-4);
	}

	.chevron {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		border-right: 2px solid var(--color-grey-dark);
		border-bottom: 2px solid var(--color-grey-dark);
		transform: rotate(45deg);
		transition: transform 0.15s;
		flex-shrink: 0;
	}

	details:not([open]) .chevron {
		transform: rotate(-45deg);
	}

	.section-count {
		font-size: var(--size-7);
		font-weight: 400;
		color: var(--color-grey-dark);
	}

	.section-body {
		border-top: 1px solid var(--color-grey-lighter);
		padding-top: 1rem;
	}

	.new-form {
		margin: 0 0 0.85rem;
	}

	.lesson-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border: 1px solid var(--color-grey-light);
		border-radius: 8px;
		overflow: hidden;
	}

	.lesson-list li + li {
		border-top: 1px solid var(--color-grey-lighter);
	}

	.lesson-list a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.9rem 1rem;
		text-decoration: none;
		color: inherit;
		transition: background 0.12s;
	}

	.lesson-list a:hover {
		background: var(--color-grey-lighter);
	}

	.title {
		font-weight: 600;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		flex-shrink: 0;
	}

	.pill {
		font-size: var(--size-7);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.pill-easy {
		background: #e8f8f0;
		color: #1a7a42;
	}

	.pill-medium {
		background: #fdf3e8;
		color: #8a5a1a;
	}

	.pill-hard {
		background: #fde8eb;
		color: var(--color-cherry);
	}

	.count {
		font-size: var(--size-7);
		color: var(--color-grey-dark);
		white-space: nowrap;
	}

	@media (max-width: 540px) {
		.lesson-list a {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
