<script lang="ts">
	import { untrack } from 'svelte';
	import type { WebStep } from '$lib/types';
	import { cloneWebSteps } from '$lib/utils/clone';
	import './admin.css';

	type EditableStep = WebStep & { _key: string };

	let {
		lessonId,
		steps = $bindable<WebStep[]>([])
	}: {
		lessonId: string;
		steps?: WebStep[];
	} = $props();

	function toEditable(source: WebStep[]): EditableStep[] {
		return cloneWebSteps(source).map((step) => ({
			...step,
			_key: crypto.randomUUID()
		}));
	}

	let editable = $state<EditableStep[]>([]);
	let expanded = $state<Set<string>>(new Set());
	let dragIndex = $state<number | null>(null);
	let dropIndex = $state<number | null>(null);

	$effect.pre(() => {
		lessonId;
		editable = untrack(() => toEditable(steps));
		expanded = new Set();
	});

	const allExpanded = $derived(editable.length > 0 && expanded.size === editable.length);

	function syncOut() {
		steps = editable.map(({ _key: _, ...step }) => step);
	}

	function isExpanded(key: string): boolean {
		return expanded.has(key);
	}

	function toggle(key: string) {
		const next = new Set(expanded);
		if (next.has(key)) next.delete(key);
		else next.add(key);
		expanded = next;
	}

	function expandAll() {
		expanded = new Set(editable.map((s) => s._key));
	}

	function collapseAll() {
		expanded = new Set();
	}

	function addStep() {
		const key = crypto.randomUUID();
		editable = [
			...editable,
			{ _key: key, type: 'dom', desc: '', render: true, action: [''] }
		];
		expanded = new Set([...expanded, key]);
		syncOut();
	}

	function removeStep(index: number) {
		if (!confirm('Remove this step?')) return;
		const key = editable[index]._key;
		editable = editable.filter((_, i) => i !== index);
		const next = new Set(expanded);
		next.delete(key);
		expanded = next;
		syncOut();
	}

	function moveStep(index: number, direction: -1 | 1) {
		const target = index + direction;
		if (target < 0 || target >= editable.length) return;
		const next = [...editable];
		[next[index], next[target]] = [next[target], next[index]];
		editable = next;
		syncOut();
	}

	function updateAction(index: number, raw: string) {
		const action = raw.split('\n').map((line) => line.replace(/\r$/, ''));
		editable = editable.map((step, i) => (i === index ? { ...step, action } : step));
		syncOut();
	}

	function patchStep(index: number, patch: Partial<WebStep>) {
		editable = editable.map((step, i) => (i === index ? { ...step, ...patch } : step));
		syncOut();
	}

	function onDragStart(index: number) {
		dragIndex = index;
	}

	function onDragOver(e: DragEvent, index: number) {
		e.preventDefault();
		if (dragIndex !== null && dragIndex !== index) dropIndex = index;
	}

	function onDrop(index: number) {
		if (dragIndex === null || dragIndex === index) {
			dragIndex = null;
			dropIndex = null;
			return;
		}
		const next = [...editable];
		const [item] = next.splice(dragIndex, 1);
		next.splice(index, 0, item);
		editable = next;
		dragIndex = null;
		dropIndex = null;
		syncOut();
	}

	function onDragEnd() {
		dragIndex = null;
		dropIndex = null;
	}

	function stepPreview(step: EditableStep): string {
		const first = step.action.find((line) => line.trim()) ?? '';
		return first.length > 48 ? first.slice(0, 48) + '…' : first || 'No code yet';
	}

	function stepSummary(step: EditableStep): string {
		const desc = step.desc.trim();
		if (desc) return desc.length > 72 ? desc.slice(0, 72) + '…' : desc;
		return stepPreview(step);
	}
</script>

<div class="step-editor">
	<div class="step-editor-head">
		<div class="head-top">
			<h3 class="admin-section-title">Steps</h3>
			<div class="head-actions">
				<button type="button" class="admin-btn ghost small" onclick={expandAll} disabled={allExpanded}>
					Expand all
				</button>
				<button
					type="button"
					class="admin-btn ghost small"
					onclick={collapseAll}
					disabled={expanded.size === 0}
				>
					Collapse all
				</button>
			</div>
		</div>
		<p class="hint">Collapse steps for an overview, then drag to reorder. Click a step to expand and edit.</p>
	</div>

	<div class="step-list" role="list">
		{#each editable as step, i (step._key)}
			{@const open = isExpanded(step._key)}
			<article
				class="step-card"
				class:collapsed={!open}
				class:dragging={dragIndex === i}
				class:drop-target={dropIndex === i && dragIndex !== i}
				role="listitem"
				ondragover={(e) => onDragOver(e, i)}
				ondrop={() => onDrop(i)}
			>
				<header class="step-toolbar">
					<button
						type="button"
						class="admin-btn icon drag"
						title="Drag to reorder"
						draggable="true"
						ondragstart={() => onDragStart(i)}
						ondragend={onDragEnd}
						aria-label="Drag step {i + 1}"
					>
						<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
							<circle cx="4" cy="3" r="1.2" fill="currentColor" />
							<circle cx="10" cy="3" r="1.2" fill="currentColor" />
							<circle cx="4" cy="7" r="1.2" fill="currentColor" />
							<circle cx="10" cy="7" r="1.2" fill="currentColor" />
							<circle cx="4" cy="11" r="1.2" fill="currentColor" />
							<circle cx="10" cy="11" r="1.2" fill="currentColor" />
						</svg>
					</button>

					<button
						type="button"
						class="step-toggle"
						aria-expanded={open}
						onclick={() => toggle(step._key)}
					>
						<span class="chevron" class:open={open}></span>
						<span class="step-badge">Step {i + 1}</span>
						<span class="type-pill" class:style={step.type === 'style'}>
							{step.type === 'dom' ? 'HTML' : 'CSS'}
						</span>
						{#if !step.render}
							<span class="no-preview-pill">no preview</span>
						{/if}
						<span class="step-summary" title={stepSummary(step)}>{stepSummary(step)}</span>
					</button>

					<div class="step-toolbar-right">
						<button
							type="button"
							class="admin-btn icon"
							title="Move up"
							disabled={i === 0}
							onclick={() => moveStep(i, -1)}
							aria-label="Move step up"
						>↑</button>
						<button
							type="button"
							class="admin-btn icon"
							title="Move down"
							disabled={i === editable.length - 1}
							onclick={() => moveStep(i, 1)}
							aria-label="Move step down"
						>↓</button>
						<button
							type="button"
							class="admin-btn icon danger"
							title="Remove step"
							onclick={() => removeStep(i)}
							aria-label="Remove step"
						>×</button>
					</div>
				</header>

				{#if open}
					<div class="step-body">
						<div class="step-options">
							<label class="admin-field compact">
								Type
								<select
									value={step.type}
									onchange={(e) => patchStep(i, { type: e.currentTarget.value as WebStep['type'] })}
								>
									<option value="dom">HTML (dom)</option>
									<option value="style">CSS (style)</option>
								</select>
							</label>

							<label class="toggle-field">
								<input
									type="checkbox"
									checked={step.render}
									onchange={(e) => patchStep(i, { render: e.currentTarget.checked })}
								/>
								<span>Update live preview when this step is complete</span>
							</label>
						</div>

						<label class="admin-field">
							Instruction
							<textarea
								rows="2"
								value={step.desc}
								placeholder="Tell the learner what to do in plain English…"
								oninput={(e) => patchStep(i, { desc: e.currentTarget.value })}
							></textarea>
						</label>

						<label class="admin-field">
							Code to type
							<span class="hint">One line per row — exactly what appears in the typer</span>
							<textarea
								rows="7"
								value={step.action.join('\n')}
								oninput={(e) => updateAction(i, e.currentTarget.value)}
							></textarea>
						</label>
					</div>
				{/if}
			</article>
		{/each}
	</div>

	<button type="button" class="add-step" onclick={addStep}>+ Add step</button>
</div>

<style>
	.step-editor-head {
		margin-bottom: 0.75rem;
	}

	.head-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.35rem;
	}

	.head-actions {
		display: flex;
		gap: 0.5rem;
	}

	.admin-btn.small {
		padding: 0.35rem 0.7rem;
		font-size: var(--size-7);
	}

	.step-editor-head .hint {
		margin: 0;
		color: var(--color-grey-dark);
		font-size: var(--size-6);
	}

	.step-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.step-card {
		border: 2px solid var(--color-grey-light);
		border-radius: 10px;
		overflow: hidden;
		background: var(--color-white);
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.step-card.collapsed {
		border-color: var(--color-grey-lighter);
	}

	.step-card.collapsed:hover {
		border-color: var(--color-grey);
	}

	.step-card.dragging {
		opacity: 0.45;
	}

	.step-card.drop-target {
		border-color: var(--color-blue);
		box-shadow: 0 0 0 3px rgba(53, 170, 220, 0.2);
	}

	.step-toolbar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.65rem;
		background: var(--color-grey-lighter);
	}

	.step-card:not(.collapsed) .step-toolbar {
		border-bottom: 1px solid var(--color-grey-light);
	}

	.step-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
		min-width: 0;
		padding: 0.35rem 0.5rem;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font: inherit;
		border-radius: 6px;
	}

	.step-toggle:hover {
		background: rgba(0, 0, 0, 0.04);
	}

	.chevron {
		display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
		border-right: 2px solid var(--color-grey-dark);
		border-bottom: 2px solid var(--color-grey-dark);
		transform: rotate(-45deg);
		transition: transform 0.15s;
		flex-shrink: 0;
		margin-right: 0.15rem;
	}

	.chevron.open {
		transform: rotate(45deg);
	}

	.step-toolbar-right {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	.step-badge {
		font-weight: 700;
		font-size: var(--size-6);
		white-space: nowrap;
	}

	.type-pill {
		font-size: var(--size-7);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
		background: #e8f4fc;
		color: #1a6a8a;
		flex-shrink: 0;
	}

	.type-pill.style {
		background: #fdf3e8;
		color: #8a5a1a;
	}

	.no-preview-pill {
		font-size: var(--size-7);
		color: var(--color-grey-dark);
		flex-shrink: 0;
	}

	.step-summary {
		font-size: var(--size-6);
		color: var(--color-grey-dark);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	.step-card:not(.collapsed) .step-summary {
		display: none;
	}

	.step-body {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.step-options {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 1rem 1.5rem;
	}

	.admin-field.compact {
		width: auto;
		min-width: 160px;
	}

	.toggle-field {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: var(--size-6);
		font-weight: 500;
		margin: 0;
		cursor: pointer;
		flex: 1;
		min-width: 220px;
	}

	.toggle-field input {
		width: 1rem;
		height: 1rem;
		accent-color: var(--color-blue);
		flex-shrink: 0;
	}

	.add-step {
		margin-top: 0.35rem;
		align-self: flex-start;
		font: inherit;
		font-weight: 600;
		padding: 0.65rem 1rem;
		border: 2px dashed var(--color-grey);
		background: transparent;
		border-radius: 8px;
		cursor: pointer;
		color: var(--color-grey-dark);
	}

	.add-step:hover {
		border-color: var(--color-blue);
		color: var(--color-blue);
	}

	@media (max-width: 720px) {
		.head-top {
			flex-direction: column;
			align-items: flex-start;
		}

		.step-options {
			flex-direction: column;
			align-items: stretch;
		}

		.admin-field.compact {
			width: 100%;
		}
	}
</style>
