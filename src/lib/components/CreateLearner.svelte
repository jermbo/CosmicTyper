<script lang="ts">
	import LearnerAvatar from './LearnerAvatar.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import { PALETTE, MAX_NAME_LENGTH } from '$lib/constants';

	interface Props {
		oncreate?: (name: string, color: string) => void;
		oncancel?: () => void;
	}

	let { oncreate, oncancel }: Props = $props();

	let name = $state('');
	let color = $state<string>(PALETTE[0].hex);

	let trimmed = $derived(name.trim());
	let canSubmit = $derived(trimmed.length > 0);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!canSubmit) return;
		oncreate?.(trimmed, color);
	}
</script>

<form class="create" onsubmit={submit}>
	<div class="preview">
		<LearnerAvatar name={trimmed || '?'} {color} size={96} />
	</div>

	<label class="field">
		<span class="field-label">Your name</span>
		<input
			class="name-input"
			type="text"
			bind:value={name}
			maxlength={MAX_NAME_LENGTH}
			placeholder="e.g. Alex"
			autocomplete="off"
			required
		/>
	</label>

	<div class="field">
		<span class="field-label">Pick a color</span>
		<ColorPicker bind:value={color} />
	</div>

	<div class="actions">
		{#if oncancel}
			<button type="button" class="btn btn-ghost" onclick={() => oncancel?.()}>Cancel</button>
		{/if}
		<button type="submit" class="btn btn-primary" disabled={!canSubmit}>Create</button>
	</div>
</form>

<style>
	.create {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 420px;
		width: 100%;
	}

	.preview {
		display: flex;
		justify-content: center;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.field-label {
		font-weight: 600;
		font-size: var(--size-6);
	}

	.name-input {
		font-size: var(--size-5);
		padding: 0.6rem 0.75rem;
		border: 2px solid var(--color-grey-light);
		border-radius: 6px;
		font-family: inherit;
	}

	.name-input:focus {
		outline: none;
		border-color: var(--color-blue);
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.btn {
		font-size: var(--size-6);
		padding: 0.6rem 1.25rem;
		border-radius: 6px;
		border: 2px solid transparent;
		cursor: pointer;
		font-family: inherit;
	}

	.btn-primary {
		background: var(--color-blue);
		color: var(--color-white);
	}

	.btn-primary:disabled {
		background: var(--color-grey-light);
		cursor: not-allowed;
	}

	.btn-ghost {
		background: transparent;
		border-color: var(--color-grey-light);
		color: var(--color-dark);
	}
</style>
