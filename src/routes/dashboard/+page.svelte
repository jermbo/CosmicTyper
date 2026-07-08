<script lang="ts">
	import { onMount } from 'svelte';
	import LearnerAvatar from '$lib/components/LearnerAvatar.svelte';
	import { learnerStore } from '$lib/stores/learner.svelte';
	import { attemptsStore } from '$lib/stores/attempts.svelte';
	import { lessonsStore } from '$lib/stores/lessons.svelte';
	import { formatPracticeTime, relativeDate } from '$lib/utils/format';
	import { slugify } from '$lib/utils/lesson';

	let learner = $derived(learnerStore.activeLearner);

	let myAttempts = $derived(learner ? attemptsStore.forLearner(learner.id) : []);

	let lessonsCompleted = $derived(learner ? attemptsStore.completedLessonIds(learner.id).size : 0);

	let avgAccuracy = $derived(
		myAttempts.length
			? Math.round(myAttempts.reduce((sum, a) => sum + a.accuracy, 0) / myAttempts.length)
			: 0
	);

	let totalTime = $derived(myAttempts.reduce((sum, a) => sum + a.duration, 0));

	let recentActivity = $derived(
		[...myAttempts].sort((a, b) => b.completedAt.localeCompare(a.completedAt)).slice(0, 5)
	);

	// Keys this learner has been missing lately — empty means a generic home-row warm-up.
	let troubleKeys = $derived(learner ? attemptsStore.troubleKeys(learner.id) : []);

	// Next uncompleted lesson across both lists, if any.
	let continueLesson = $derived.by(() => {
		if (!learner) return null;
		const completed = attemptsStore.completedLessonIds(learner.id);
		const web = lessonsStore.webLessons.find((l) => !completed.has(l.id));
		if (web) return { title: web.title, href: `/web-lessons/${slugify(web.title)}` };
		const typing = lessonsStore.typingLessons.find((l) => !completed.has(l.id));
		if (typing) return { title: typing.title, href: `/typing-lessons/${slugify(typing.title)}` };
		return null;
	});

	onMount(() => {
		// Lessons power the activity titles and the "continue learning" shortcut.
		if (!lessonsStore.webLessons.length) lessonsStore.loadWebLessons();
		if (!lessonsStore.typingLessons.length) lessonsStore.loadTypingLessons();
	});
</script>

<svelte:head>
	<title>Dashboard — Student Typer</title>
</svelte:head>

{#if learner}
	<section class="dashboard">
		<header class="dash-header">
			<LearnerAvatar name={learner.name} color={learner.color} size={64} />
			<div>
				<h1>Welcome back, {learner.name}!</h1>
				<p>Ready for some typing practice?</p>
			</div>
		</header>

		<div class="stats-strip">
			<div class="stat">
				<span class="stat-value">{lessonsCompleted}</span>
				<span class="stat-label">Lessons completed</span>
			</div>
			<div class="stat">
				<span class="stat-value">{avgAccuracy}%</span>
				<span class="stat-label">Average accuracy</span>
			</div>
			<div class="stat">
				<span class="stat-value">{formatPracticeTime(totalTime)}</span>
				<span class="stat-label">Time practiced</span>
			</div>
		</div>

		{#if continueLesson}
			<div class="continue">
				<div>
					<p class="continue-eyebrow">Continue learning</p>
					<p class="continue-title">{continueLesson.title}</p>
				</div>
				<a class="btn btn-primary" href={continueLesson.href}>Resume</a>
			</div>
		{/if}

		<div class="warmup">
			<div>
				<p class="warmup-eyebrow">Warm-up</p>
				{#if troubleKeys.length}
					<p class="warmup-desc">Keys to practice</p>
					<div class="keycaps">
						{#each troubleKeys as key (key)}
							<span class="keycap">{key === ' ' ? 'space' : key}</span>
						{/each}
					</div>
				{:else}
					<p class="warmup-desc">A quick round on the home row</p>
				{/if}
			</div>
			<a class="btn btn-primary" href="/warm-up">Warm up</a>
		</div>

		<section class="panel">
			<h2>Recent activity</h2>
			{#if recentActivity.length}
				<ul class="activity">
					{#each recentActivity as attempt (attempt.id)}
						<li class="activity-row">
							<span class="activity-title">{lessonsStore.titleFor(attempt.lessonId)}</span>
							<span class="activity-date">{relativeDate(attempt.completedAt)}</span>
							<span class="activity-accuracy">{attempt.accuracy}%</span>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="empty">No lessons completed yet — pick one below to get started!</p>
			{/if}
		</section>

		<nav class="quick-nav" aria-label="Lesson sections">
			<a class="nav-card" href="/web-lessons">
				<span class="nav-card-title">Web Lessons</span>
				<span class="nav-card-desc">Learn HTML &amp; CSS while you type</span>
			</a>
			<a class="nav-card" href="/typing-lessons">
				<span class="nav-card-title">Typing Lessons</span>
				<span class="nav-card-desc">Practice your general typing</span>
			</a>
		</nav>
	</section>
{/if}

<style>
	.dashboard {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.dash-header {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.dash-header h1 {
		font-size: var(--size-3);
		margin: 0;
	}

	.dash-header p {
		margin: 0.25rem 0 0;
		color: var(--color-grey-dark);
	}

	.stats-strip {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.stat {
		background: var(--color-white);
		border-radius: 10px;
		padding: 1.25rem 1rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
	}

	.stat-value {
		font-size: var(--size-2);
		font-weight: 700;
		color: var(--color-dark);
	}

	.stat-label {
		font-size: var(--size-7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-grey-dark);
	}

	.continue {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		background: var(--color-code-bg);
		color: var(--color-white);
		border-radius: 10px;
		padding: 1.25rem 1.5rem;
	}

	.continue-eyebrow {
		margin: 0;
		font-size: var(--size-7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.8;
	}

	.continue-title {
		margin: 0.25rem 0 0;
		font-size: var(--size-4);
		font-weight: 600;
	}

	.warmup {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		background: var(--color-white);
		border-radius: 10px;
		padding: 1.25rem 1.5rem;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
	}

	.warmup-eyebrow {
		margin: 0;
		font-size: var(--size-7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-grey-dark);
	}

	.warmup-desc {
		margin: 0.25rem 0 0;
		font-size: var(--size-5);
		font-weight: 600;
	}

	.keycaps {
		display: flex;
		gap: 0.4rem;
		margin-top: 0.6rem;
	}

	.keycap {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2.1rem;
		height: 2.1rem;
		padding: 0 0.5rem;
		border: 2px solid var(--color-grey-light);
		border-bottom-width: 4px;
		border-radius: 8px;
		font-size: var(--size-5);
		font-weight: 700;
		background: var(--color-grey-lighter);
	}

	.panel {
		background: var(--color-white);
		border-radius: 10px;
		padding: 1.25rem 1.5rem;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
	}

	.panel h2 {
		margin: 0 0 1rem;
		font-size: var(--size-5);
	}

	.activity {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.activity-row {
		display: grid;
		grid-template-columns: 1fr auto auto;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 0;
		border-bottom: 1px solid var(--color-grey-lighter);
	}

	.activity-row:last-child {
		border-bottom: none;
	}

	.activity-title {
		font-weight: 500;
	}

	.activity-date {
		font-size: var(--size-7);
		color: var(--color-grey-dark);
	}

	.activity-accuracy {
		font-weight: 700;
		color: var(--color-code-correct);
	}

	.empty {
		margin: 0;
		color: var(--color-grey-dark);
	}

	.quick-nav {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.nav-card {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 1.25rem 1.5rem;
		background: var(--color-white);
		border: 2px solid var(--color-grey-light);
		border-radius: 10px;
		text-decoration: none;
		color: var(--color-dark);
		transition:
			border-color 0.15s ease,
			transform 0.15s ease;
	}

	.nav-card:hover {
		border-color: var(--color-blue);
		transform: translateY(-2px);
	}

	.nav-card-title {
		font-size: var(--size-5);
		font-weight: 600;
	}

	.nav-card-desc {
		font-size: var(--size-7);
		color: var(--color-grey-dark);
	}

	.btn {
		font-family: inherit;
		font-size: var(--size-6);
		padding: 0.6rem 1.5rem;
		border-radius: 6px;
		text-decoration: none;
		white-space: nowrap;
	}

	.btn-primary {
		background: var(--color-blue);
		color: var(--color-white);
	}

	@media (max-width: 600px) {
		.stats-strip,
		.quick-nav {
			grid-template-columns: 1fr;
		}
	}
</style>
