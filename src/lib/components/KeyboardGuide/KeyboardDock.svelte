<script lang="ts">
	import KeyboardGuide from './KeyboardGuide.svelte';
	import { prefsStore } from '$lib/stores/prefs.svelte';

	interface Props {
		nextChar: string | null;
	}

	let { nextChar }: Props = $props();

	let show = $derived(prefsStore.keyboardGuide);
</script>

<button
	class="toggle"
	type="button"
	aria-pressed={show}
	title={show ? 'Hide keyboard guide' : 'Show keyboard guide'}
	onclick={() => prefsStore.setKeyboardGuide(!show)}
>
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<rect x="2" y="6" width="20" height="12" rx="2" />
		<path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6" />
	</svg>
	<span class="sr-only">Keyboard guide</span>
</button>

<!-- Stays in the DOM so it can slide on and off screen; inert either way (aria-hidden inside). -->
<div class="overlay" class:off={!show}>
	<KeyboardGuide {nextChar} />
</div>

<style>
	.toggle {
		position: fixed;
		right: 0.9rem;
		bottom: 0.9rem;
		z-index: 60;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.6rem;
		height: 2.6rem;
		border: none;
		border-radius: 50%;
		background: var(--color-dark);
		color: var(--color-white);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
		cursor: pointer;
	}

	.toggle:hover {
		background: #000;
	}

	.toggle[aria-pressed='false'] {
		opacity: 0.75;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	.overlay {
		position: fixed;
		left: 50%;
		bottom: 0;
		z-index: 50;
		width: min(860px, calc(100vw - 2rem));
		padding: 0.75rem 0.75rem 0.5rem;
		background: var(--color-white);
		border-radius: 12px 12px 0 0;
		box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.18);
		transform: translateX(-50%);
		transition: transform 0.3s ease;
	}

	/* Slid off screen; a sliver of shadow never lingers because it moves fully past the edge. */
	.overlay.off {
		transform: translate(-50%, 105%);
	}

	/* A physical-keyboard map is meaningless on touch-only devices. */
	@media (hover: none) and (pointer: coarse) {
		.toggle,
		.overlay {
			display: none;
		}
	}

	/* Too narrow to read the keys — hide rather than squeeze. */
	@media (max-width: 460px) {
		.toggle,
		.overlay {
			display: none;
		}
	}
</style>
