<script lang="ts">
	import WebStepEditor from '$lib/components/admin/WebStepEditor.svelte';
	import '$lib/components/admin/admin.css';
	import type { WebStep } from '$lib/types';
	import { cloneWebSteps } from '$lib/utils/clone';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let steps = $state<WebStep[]>([]);

	$effect.pre(() => {
		data.lesson.id;
		steps = cloneWebSteps(data.lesson.steps);
	});
</script>

<svelte:head>
	<title>{data.lesson.title} — Admin</title>
</svelte:head>

<div class="admin-editor">
	<header class="admin-page-head">
		<p class="back"><a href="/admin">← All lessons</a></p>
		<h1>{data.lesson.title}</h1>
		<p class="sub">Web lesson · {steps.length} steps · ID {data.lesson.id}</p>
	</header>

	{#if form?.saved}
		<p class="admin-flash success" role="status">Changes saved.</p>
	{/if}
	{#if form?.error}
		<p class="admin-flash error" role="alert">{form.error}</p>
	{/if}

	<form
		method="POST"
		action="?/save"
		class="admin-card editor-form"
		onsubmit={(e) => {
			const input = e.currentTarget.querySelector('input[name=steps]') as HTMLInputElement;
			input.value = JSON.stringify(steps);
		}}
	>
		<div class="admin-meta">
			<label class="admin-field">
				Title
				<input type="text" name="title" value={data.lesson.title} required />
			</label>
			<label class="admin-field">
				Difficulty
				<select name="difficulty">
					<option value="easy" selected={data.lesson.difficulty === 'easy'}>easy</option>
					<option value="medium" selected={data.lesson.difficulty === 'medium'}>medium</option>
					<option value="hard" selected={data.lesson.difficulty === 'hard'}>hard</option>
				</select>
			</label>
		</div>

		<WebStepEditor lessonId={data.lesson.id} bind:steps />
		<input type="hidden" name="steps" value="" />

		<div class="admin-sticky-bar">
			<span class="bar-hint">{steps.length} step{steps.length === 1 ? '' : 's'}</span>
			<button type="submit" class="admin-btn primary">Save changes</button>
		</div>
	</form>

	<div class="admin-danger-zone">
		<form
			method="POST"
			action="?/delete"
			onsubmit={(e) => !confirm('Delete this lesson permanently?') && e.preventDefault()}
		>
			<button type="submit" class="admin-btn danger">Delete lesson</button>
		</form>
	</div>
</div>

<style>
	.editor-form {
		padding-bottom: 0;
	}

	.bar-hint {
		font-size: var(--size-6);
		color: var(--color-grey-dark);
	}
</style>
