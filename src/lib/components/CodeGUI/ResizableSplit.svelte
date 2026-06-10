<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		direction?: 'row' | 'column';
		/** Size of pane A as a fraction (0..1) of the container. Bindable. */
		fraction?: number;
		/** Minimum px each pane is allowed to shrink to while dragging. */
		min?: number;
		/** Fraction restored on double-click / reset. Defaults to the initial value. */
		defaultFraction?: number;
		a: Snippet;
		b: Snippet;
	}

	let {
		direction = 'row',
		fraction = $bindable(0.5),
		min = 80,
		defaultFraction,
		a,
		b
	}: Props = $props();

	let container = $state<HTMLDivElement>();
	let dragging = $state(false);

	function clamp(value: number) {
		if (!container) return Math.min(0.95, Math.max(0.05, value));
		const total = direction === 'row' ? container.clientWidth : container.clientHeight;
		const minFrac = total > 0 ? min / total : 0.05;
		return Math.min(1 - minFrac, Math.max(minFrac, value));
	}

	function onpointerdown(e: PointerEvent) {
		e.preventDefault();
		dragging = true;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onpointermove(e: PointerEvent) {
		if (!dragging || !container) return;
		const rect = container.getBoundingClientRect();
		const total = direction === 'row' ? rect.width : rect.height;
		const pos = direction === 'row' ? e.clientX - rect.left : e.clientY - rect.top;
		fraction = clamp(pos / total);
	}

	function onpointerup(e: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		(e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
	}

	function reset() {
		fraction = clamp(defaultFraction ?? 0.5);
	}

	function onkeydown(e: KeyboardEvent) {
		const step = 0.025;
		const dec = direction === 'row' ? 'ArrowLeft' : 'ArrowUp';
		const inc = direction === 'row' ? 'ArrowRight' : 'ArrowDown';
		if (e.key === dec) fraction = clamp(fraction - step);
		else if (e.key === inc) fraction = clamp(fraction + step);
		else if (e.key === 'Enter') reset();
		else return;
		e.preventDefault();
	}
</script>

<div class="split {direction}" class:dragging bind:this={container}>
	<div class="pane a" style="flex-basis: {fraction * 100}%">{@render a()}</div>

	<!-- A draggable window splitter: the ARIA separator pattern is interactive
	     and focusable by design (arrow keys resize, Enter resets). -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="gutter"
		role="separator"
		aria-orientation={direction === 'row' ? 'vertical' : 'horizontal'}
		aria-valuenow={Math.round(fraction * 100)}
		aria-valuemin={0}
		aria-valuemax={100}
		aria-label="Resize panels"
		tabindex="0"
		{onpointerdown}
		{onpointermove}
		{onpointerup}
		{onkeydown}
		ondblclick={reset}
	>
		<span class="grip"></span>
	</div>

	<div class="pane b">{@render b()}</div>
</div>

<style>
	.split {
		display: flex;
		width: 100%;
		height: 100%;
		min-width: 0;
		min-height: 0;
	}

	.split.row {
		flex-direction: row;
	}

	.split.column {
		flex-direction: column;
	}

	.pane {
		overflow: hidden;
		min-width: 0;
		min-height: 0;
		/* Act as a flex container so a single child fills both dimensions,
		   regardless of split direction. */
		display: flex;
		flex-direction: column;
	}

	.pane.a {
		flex-grow: 0;
		flex-shrink: 0;
		/* Animate size on programmatic changes (reset, keyboard, collapse)… */
		transition: flex-basis 0.28s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.pane.b {
		flex: 1 1 0;
	}

	/* …but track the cursor 1:1 while actively dragging. */
	.split.dragging .pane.a {
		transition: none;
	}

	.split.dragging {
		user-select: none;
	}

	.gutter {
		position: relative;
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-code-bg);
		touch-action: none;
		transition: background 0.18s ease;
	}

	.split.row > .gutter {
		width: 8px;
		cursor: col-resize;
	}

	.split.column > .gutter {
		height: 8px;
		cursor: row-resize;
	}

	/* The grip: a small bar that brightens and grows on hover/drag. */
	.grip {
		display: block;
		border-radius: 999px;
		background: var(--color-grey);
		transition:
			background 0.18s ease,
			transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.18s ease;
		opacity: 0.6;
	}

	.split.row > .gutter .grip {
		width: 3px;
		height: 26px;
	}

	.split.column > .gutter .grip {
		width: 26px;
		height: 3px;
	}

	.gutter:hover {
		background: #4f5366;
	}

	.gutter:hover .grip {
		background: var(--color-white);
		opacity: 1;
	}

	.split.row > .gutter:hover .grip {
		transform: scaleY(1.35);
	}

	.split.column > .gutter:hover .grip {
		transform: scaleX(1.35);
	}

	/* Active drag: primary accent + a soft glow so the divider feels "grabbed". */
	.split.dragging > .gutter,
	.gutter:active {
		background: var(--color-primary);
	}

	.split.dragging > .gutter .grip,
	.gutter:active .grip {
		background: var(--color-white);
		opacity: 1;
	}

	.gutter:focus-visible {
		outline: 2px solid var(--color-blue);
		outline-offset: -2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.pane.a,
		.grip {
			transition: none;
		}
	}
</style>
