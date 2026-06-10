<script lang="ts">
	import type { WebStep } from '$lib/types';

	let {
		steps = $bindable<WebStep[]>([])
	}: {
		steps?: WebStep[];
	} = $props();

	function addStep() {
		steps = [
			...steps,
			{ type: 'dom', desc: '', render: true, action: [''] }
		];
	}

	function removeStep(index: number) {
		steps = steps.filter((_, i) => i !== index);
	}

	function updateAction(index: number, raw: string) {
		const action = raw.split('\n').map((line) => line.replace(/\r$/, ''));
		steps = steps.map((step, i) => (i === index ? { ...step, action } : step));
	}
</script>

<div class="steps">
	{#each steps as step, i (i)}
		<fieldset class="step">
			<legend>Step {i + 1}</legend>

			<div class="step-row">
				<label>
					Type
					<select bind:value={step.type}>
						<option value="dom">dom (HTML)</option>
						<option value="style">style (CSS)</option>
					</select>
				</label>
				<label class="render-label">
					<input type="checkbox" bind:checked={step.render} />
					Update preview when complete
				</label>
				<button type="button" class="remove" onclick={() => removeStep(i)}>Remove</button>
			</div>

			<label>
				Instruction
				<input type="text" bind:value={step.desc} placeholder="What should the learner do?" />
			</label>

			<label>
				Code to type
				<span class="hint">One line per row</span>
				<textarea
					rows="6"
					value={step.action.join('\n')}
					oninput={(e) => updateAction(i, e.currentTarget.value)}
				></textarea>
			</label>
		</fieldset>
	{/each}
</div>

<button type="button" class="add" onclick={addStep}>+ Add step</button>

<style>
	.steps {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.step {
		border: 2px solid var(--color-grey-light);
		border-radius: 8px;
		padding: 1rem;
		margin: 0;
	}

	legend {
		font-weight: 700;
		padding: 0 0.25rem;
	}

	.step-row {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: var(--size-6);
		font-weight: 600;
		flex: 1;
		min-width: 140px;
	}

	.render-label {
		flex-direction: row;
		align-items: center;
		font-weight: 500;
		flex: 0;
		white-space: nowrap;
	}

	.hint {
		font-weight: 400;
		color: var(--color-grey-dark);
		font-size: var(--size-7);
	}

	input,
	select,
	textarea {
		font: inherit;
		font-weight: 400;
		padding: 0.5rem 0.65rem;
		border: 2px solid var(--color-grey-light);
		border-radius: 6px;
	}

	textarea {
		font-family: ui-monospace, monospace;
		font-size: 0.9rem;
		resize: vertical;
	}

	.remove {
		font: inherit;
		font-size: var(--size-7);
		padding: 0.4rem 0.65rem;
		border: 1px solid var(--color-grey);
		background: transparent;
		border-radius: 6px;
		cursor: pointer;
		color: var(--color-grey-dark);
	}

	.add {
		font: inherit;
		align-self: flex-start;
		padding: 0.5rem 0.85rem;
		border: 2px dashed var(--color-grey);
		background: transparent;
		border-radius: 6px;
		cursor: pointer;
		color: var(--color-grey-dark);
	}
</style>
