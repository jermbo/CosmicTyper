<script lang="ts">
	import { untrack } from 'svelte';
	import { cloneLines } from '$lib/utils/clone';
	import './admin.css';

	type LineItem = { _key: string; text: string };

	let {
		lessonId,
		lines = $bindable<string[]>([])
	}: {
		lessonId: string;
		lines?: string[];
	} = $props();

	function toItems(source: string[]): LineItem[] {
		return cloneLines(source).map((text) => ({
			_key: crypto.randomUUID(),
			text
		}));
	}

	let items = $state<LineItem[]>([]);
	let expanded = $state<Set<string>>(new Set());
	let dragIndex = $state<number | null>(null);
	let dropIndex = $state<number | null>(null);

	$effect.pre(() => {
		lessonId;
		items = untrack(() => toItems(lines));
		expanded = new Set();
	});

	const allExpanded = $derived(items.length > 0 && expanded.size === items.length);

	function syncOut() {
		lines = items.map((item) => item.text);
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
		expanded = new Set(items.map((item) => item._key));
	}

	function collapseAll() {
		expanded = new Set();
	}

	function linePreview(text: string): string {
		const trimmed = text.trim();
		if (!trimmed) return '(empty line)';
		return trimmed.length > 64 ? trimmed.slice(0, 64) + '…' : trimmed;
	}

	function addLine() {
		const key = crypto.randomUUID();
		items = [...items, { _key: key, text: '' }];
		expanded = new Set([...expanded, key]);
		syncOut();
	}

	function removeLine(index: number) {
		const key = items[index]._key;
		items = items.filter((_, i) => i !== index);
		const next = new Set(expanded);
		next.delete(key);
		expanded = next;
		syncOut();
	}

	function updateLine(index: number, value: string) {
		items = items.map((item, i) => (i === index ? { ...item, text: value } : item));
		syncOut();
	}

	function moveLine(index: number, direction: -1 | 1) {
		const target = index + direction;
		if (target < 0 || target >= items.length) return;
		const next = [...items];
		[next[index], next[target]] = [next[target], next[index]];
		items = next;
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
		const next = [...items];
		const [item] = next.splice(dragIndex, 1);
		next.splice(index, 0, item);
		items = next;
		dragIndex = null;
		dropIndex = null;
		syncOut();
	}

	function onDragEnd() {
		dragIndex = null;
		dropIndex = null;
	}
</script>

<div class="lines-editor">
	<div class="lines-editor-head">
		<div class="head-top">
			<h3 class="admin-section-title">Lines</h3>
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
		<p class="hint">Collapse for a bird's-eye view, then drag to reorder. Click a line to edit.</p>
	</div>

	<div class="line-list" role="list">
		{#each items as item, i (item._key)}
			{@const open = isExpanded(item._key)}
			<div
				class="line-row"
				class:collapsed={!open}
				class:dragging={dragIndex === i}
				class:drop-target={dropIndex === i && dragIndex !== i}
				role="listitem"
				ondragover={(e) => onDragOver(e, i)}
				ondrop={() => onDrop(i)}
			>
				<button
					type="button"
					class="admin-btn icon drag"
					title="Drag to reorder"
					draggable="true"
					ondragstart={() => onDragStart(i)}
					ondragend={onDragEnd}
					aria-label="Drag line {i + 1}"
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
					class="line-toggle"
					aria-expanded={open}
					onclick={() => toggle(item._key)}
				>
					<span class="chevron" class:open={open}></span>
					<span class="line-num">{i + 1}</span>
					<span class="line-preview">{linePreview(item.text)}</span>
				</button>

				{#if open}
					<input
						type="text"
						class="line-input"
						value={item.text}
						placeholder="Line {i + 1}"
						oninput={(e) => updateLine(i, e.currentTarget.value)}
					/>
				{/if}

				<div class="line-actions">
					<button
						type="button"
						class="admin-btn icon"
						title="Move up"
						disabled={i === 0}
						onclick={() => moveLine(i, -1)}
						aria-label="Move line up"
					>↑</button>
					<button
						type="button"
						class="admin-btn icon"
						title="Move down"
						disabled={i === items.length - 1}
						onclick={() => moveLine(i, 1)}
						aria-label="Move line down"
					>↓</button>
					<button
						type="button"
						class="admin-btn icon danger"
						title="Remove line"
						onclick={() => removeLine(i)}
						aria-label="Remove line"
					>×</button>
				</div>
			</div>
		{/each}
	</div>

	<button type="button" class="add-line" onclick={addLine}>+ Add line</button>
</div>

<style>
	.lines-editor-head {
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

	.lines-editor-head .hint {
		margin: 0;
		color: var(--color-grey-dark);
		font-size: var(--size-6);
	}

	.line-list {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.line-row {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.6rem;
		border: 2px solid var(--color-grey-light);
		border-radius: 8px;
		background: var(--color-white);
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.line-row.collapsed {
		grid-template-columns: auto 1fr auto;
		border-color: var(--color-grey-lighter);
	}

	.line-row.collapsed:hover {
		border-color: var(--color-grey);
	}

	.line-row:not(.collapsed) {
		grid-template-columns: auto 1fr 1fr auto;
	}

	.line-row.dragging {
		opacity: 0.45;
	}

	.line-row.drop-target {
		border-color: var(--color-blue);
		box-shadow: 0 0 0 3px rgba(53, 170, 220, 0.2);
	}

	.line-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
		padding: 0.35rem 0.5rem;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font: inherit;
		border-radius: 6px;
	}

	.line-toggle:hover {
		background: var(--color-grey-lighter);
	}

	.chevron {
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		border-right: 2px solid var(--color-grey-dark);
		border-bottom: 2px solid var(--color-grey-dark);
		transform: rotate(-45deg);
		transition: transform 0.15s;
		flex-shrink: 0;
	}

	.chevron.open {
		transform: rotate(45deg);
	}

	.line-num {
		font-size: var(--size-7);
		font-weight: 700;
		color: var(--color-grey-dark);
		flex-shrink: 0;
		min-width: 1.5rem;
	}

	.line-preview {
		font-size: var(--size-6);
		color: var(--color-dark);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	.line-row:not(.collapsed) .line-preview {
		display: none;
	}

	.line-input {
		font: inherit;
		padding: 0.5rem 0.65rem;
		border: 2px solid var(--color-grey-light);
		border-radius: 6px;
		min-width: 0;
	}

	.line-input:focus {
		outline: none;
		border-color: var(--color-blue);
		box-shadow: 0 0 0 3px rgba(53, 170, 220, 0.15);
	}

	.line-actions {
		display: flex;
		gap: 0.25rem;
	}

	.add-line {
		margin-top: 0.5rem;
		align-self: flex-start;
		font: inherit;
		font-weight: 600;
		padding: 0.55rem 0.9rem;
		border: 2px dashed var(--color-grey);
		background: transparent;
		border-radius: 8px;
		cursor: pointer;
		color: var(--color-grey-dark);
	}

	.add-line:hover {
		border-color: var(--color-blue);
		color: var(--color-blue);
	}

	@media (max-width: 640px) {
		.head-top {
			flex-direction: column;
			align-items: flex-start;
		}

		.line-row:not(.collapsed) {
			grid-template-columns: auto 1fr;
			grid-template-rows: auto auto;
		}

		.line-row:not(.collapsed) .line-actions {
			grid-column: 1 / -1;
			justify-content: flex-end;
		}
	}
</style>
