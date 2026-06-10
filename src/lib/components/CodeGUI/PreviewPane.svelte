<script lang="ts">
	import Preview from './Preview.svelte';

	interface Props {
		title: string;
		html: string[];
		css: string[];
		collapsed: boolean;
		/** Which edge the pane sits on, so the chevron points the right way. */
		side: 'left' | 'right';
		pulse?: boolean;
		ontoggle?: () => void;
	}

	let { title, html, css, collapsed, side, pulse = false, ontoggle }: Props = $props();

	// Chevron points toward where the pane content goes when expanded.
	let expandChevron = $derived(side === 'left' ? '›' : '‹');
	let collapseChevron = $derived(side === 'left' ? '‹' : '›');
</script>

{#if collapsed}
	<button
		class="strip"
		title="Expand {title}"
		aria-label="Expand {title}"
		onclick={() => ontoggle?.()}
	>
		<span class="chevron">{expandChevron}</span>
		<span class="strip-label">{title}</span>
	</button>
{:else}
	<div class="pane" class:pulse>
		<div class="pane-header">
			<span class="pane-label">{title}</span>
			<button
				class="collapse-btn"
				title="Collapse {title}"
				aria-label="Collapse {title}"
				onclick={() => ontoggle?.()}
			>
				{collapseChevron}
			</button>
		</div>
		<div class="frame">
			<Preview {html} {css} title="{title} preview" />
		</div>
	</div>
{/if}

<style>
	.pane {
		flex: 1 1 0;
		min-width: 0;
		display: flex;
		flex-direction: column;
		min-height: 0;
		background: var(--color-white);
	}

	.pane-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		flex-shrink: 0;
		padding: 0.15rem 0.3rem 0.15rem 0.6rem;
		background: var(--color-grey-lighter);
		border-bottom: 1px solid var(--color-grey-light);
	}

	.pane-label {
		font-size: var(--size-7);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-grey-dark);
	}

	.collapse-btn {
		flex-shrink: 0;
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: var(--size-5);
		line-height: 1;
		color: var(--color-grey-dark);
	}

	.collapse-btn:hover {
		background: var(--color-grey-light);
		color: var(--color-dark);
	}

	.frame {
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	.pane.pulse .frame {
		animation: renderPulse 0.6s ease;
	}

	@keyframes renderPulse {
		0% {
			box-shadow: inset 0 0 0 3px var(--color-primary);
		}
		100% {
			box-shadow: inset 0 0 0 3px transparent;
		}
	}

	/* Collapsed: a thin clickable strip with a vertical label. */
	.strip {
		flex: 0 0 2.2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0;
		border: none;
		background: var(--color-grey-lighter);
		cursor: pointer;
		font-family: inherit;
		color: var(--color-grey-dark);
		transition: background 0.15s ease;
	}

	.strip:hover {
		background: var(--color-grey-light);
		color: var(--color-dark);
	}

	.chevron {
		font-size: var(--size-5);
		line-height: 1;
	}

	.strip-label {
		writing-mode: vertical-rl;
		font-size: var(--size-7);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	@media (max-width: 768px) {
		.strip {
			flex: 0 0 auto;
			flex-direction: row;
			justify-content: flex-start;
			gap: 0.4rem;
			padding: 0.4rem 0.6rem;
		}

		.strip-label {
			writing-mode: horizontal-tb;
		}
	}
</style>
