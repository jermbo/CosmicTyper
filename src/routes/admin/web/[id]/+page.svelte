<script lang="ts">
	import WebStepEditor from '$lib/components/admin/WebStepEditor.svelte';
	import type { WebStep } from '$lib/types';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let steps = $state<WebStep[]>([]);

	$effect(() => {
		steps = structuredClone(data.lesson.steps);
	});
</script>

<svelte:head>
	<title>{data.lesson.title} — Admin</title>
</svelte:head>

<p class="back"><a href="/admin">← All lessons</a></p>

<h1>Edit web lesson</h1>

{#if form?.saved}
	<p class="success" role="status">Saved.</p>
{/if}
{#if form?.error}
	<p class="error" role="alert">{form.error}</p>
{/if}

<form
	method="POST"
	action="?/save"
	class="editor"
	onsubmit={(e) => {
		const input = e.currentTarget.querySelector('input[name=steps]') as HTMLInputElement;
		input.value = JSON.stringify(steps);
	}}
>
	<div class="row">
		<label>
			Title
			<input type="text" name="title" value={data.lesson.title} required />
		</label>
		<label>
			Difficulty
			<select name="difficulty">
				<option value="easy" selected={data.lesson.difficulty === 'easy'}>easy</option>
				<option value="medium" selected={data.lesson.difficulty === 'medium'}>medium</option>
				<option value="hard" selected={data.lesson.difficulty === 'hard'}>hard</option>
			</select>
		</label>
	</div>

	<WebStepEditor bind:steps />
	<input type="hidden" name="steps" value="" />

	<div class="actions">
		<button type="submit" class="primary">Save</button>
	</div>
</form>

<form method="POST" action="?/delete" class="danger-zone" onsubmit={(e) => !confirm('Delete this lesson?') && e.preventDefault()}>
	<button type="submit" class="danger">Delete lesson</button>
</form>

<style>
	.back {
		margin: 0 0 1rem;
	}

	.back a {
		color: var(--color-grey-dark);
		text-decoration: none;
		font-size: var(--size-6);
	}

	h1 {
		margin: 0 0 1.5rem;
		font-size: var(--size-3);
	}

	.editor {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		background: var(--color-white);
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 1px 6px rgba(0, 0, 6, 0.06);
	}

	.row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: var(--size-6);
		font-weight: 600;
	}

	input,
	select {
		font: inherit;
		font-weight: 400;
		padding: 0.6rem 0.75rem;
		border: 2px solid var(--color-grey-light);
		border-radius: 6px;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
	}

	button {
		font: inherit;
		padding: 0.65rem 1.25rem;
		border-radius: 6px;
		border: none;
		cursor: pointer;
	}

	.primary {
		background: var(--color-dark);
		color: var(--color-white);
		font-weight: 600;
	}

	.danger-zone {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-grey-light);
	}

	.danger {
		background: transparent;
		color: var(--color-cherry);
		border: 1px solid var(--color-cherry);
	}

	.success {
		margin: 0 0 1rem;
		padding: 0.6rem 0.75rem;
		background: #e8f8f0;
		color: #1a7a42;
		border-radius: 6px;
	}

	.error {
		margin: 0 0 1rem;
		padding: 0.6rem 0.75rem;
		background: #fde8eb;
		color: var(--color-cherry);
		border-radius: 6px;
	}
</style>
