<script lang="ts">
	import { LAYOUT, FINGER_NAMES, FINGER_OF } from './layout';
	import { keyForChar } from './charMap';

	interface Props {
		nextChar: string | null; // the character the learner must type next, null hides highlight
	}

	let { nextChar }: Props = $props();

	let target = $derived(nextChar === null ? null : keyForChar(nextChar));
	let finger = $derived(target ? (FINGER_OF[target.code] ?? null) : null);

	// Always the Shift on the opposite hand from the character key.
	let shiftCode = $derived(
		target?.shift && finger ? (finger.startsWith('l-') ? 'ShiftRight' : 'ShiftLeft') : null
	);

	let label = $derived(finger ? FINGER_NAMES[finger] + (target?.shift ? ' + shift' : '') : '');
</script>

<!-- Decorative reinforcement of what's already on screen — hidden from screen readers. -->
<div class="keyboard" aria-hidden="true">
	{#each LAYOUT as row, i (i)}
		<div class="krow">
			{#each row as key (key.code)}
				<div
					class="key finger-{key.finger}"
					class:ghost={key.ghost}
					class:active={key.code === target?.code || key.code === shiftCode}
					style:--w={key.width ?? 1}
				>
					{key.legend}
					{#if key.homing}<span class="bump"></span>{/if}
				</div>
			{/each}
		</div>
	{/each}
	<!-- &nbsp; keeps the label's line box when there's no finger to name, so nothing jumps. -->
	<div class="finger-label">{label}&nbsp;</div>
</div>

<style>
	.keyboard {
		max-width: 820px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.krow {
		display: flex;
		gap: 4px;
	}

	.key {
		position: relative;
		flex: var(--w) 1 0;
		min-width: 0;
		height: 2.1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 6px;
		font-size: 0.75rem;
		color: var(--color-grey-dark);
		background: var(--color-grey-lighter);
		white-space: nowrap;
		overflow: hidden;
	}

	.key.ghost {
		visibility: hidden;
	}

	/* Soft, desaturated finger-zone tints — the highlight must stay the loudest thing here. */
	.finger-l-pinky {
		background: #f4d3dc;
	}
	.finger-l-ring {
		background: #f9e0c7;
	}
	.finger-l-middle {
		background: #f7efc5;
	}
	.finger-l-index {
		background: #dbedcf;
	}
	.finger-r-index {
		background: #cfe8e4;
	}
	.finger-r-middle {
		background: #d1e0f2;
	}
	.finger-r-ring {
		background: #dfd6ee;
	}
	.finger-r-pinky {
		background: #efd6ec;
	}
	.finger-thumb {
		background: #e6e6e2;
	}

	.key.active {
		background: var(--color-dark);
		color: var(--color-white);
		font-weight: bold;
		/* Global prefers-reduced-motion rule in app.css turns this into a steady highlight. */
		animation: guidePulse 1.25s ease infinite;
	}

	/* Home-row bump on F and J, like a physical keyboard. */
	.bump {
		position: absolute;
		bottom: 4px;
		left: 50%;
		transform: translateX(-50%);
		width: 8px;
		height: 2px;
		border-radius: 1px;
		background: currentColor;
		opacity: 0.5;
	}

	.finger-label {
		text-align: center;
		font-size: var(--size-7);
		color: var(--color-grey-dark);
		padding-top: 2px;
	}

	@keyframes guidePulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 var(--color-primary);
		}
		50% {
			box-shadow: 0 0 0 5px var(--color-primary);
		}
	}
</style>
