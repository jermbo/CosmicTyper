<script lang="ts">
	import { codeData } from '$lib/stores/codeData.svelte';
	import PreviewPane from './PreviewPane.svelte';
	import ResizableSplit from './ResizableSplit.svelte';

	interface Props {
		targetHtml: string[];
		targetCss: string[];
	}

	let { targetHtml, targetCss }: Props = $props();

	let goalCollapsed = $state(false);
	let yoursCollapsed = $state(false);
	// Divider position when both panes are open; preserved across collapses.
	let fraction = $state(0.5);

	let bothOpen = $derived(!goalCollapsed && !yoursCollapsed);

	// Pulse the "Yours" pane whenever a step renders new output, so the learner
	// feels the cause → effect of what they just typed.
	let renderedCount = $derived(codeData.htmlCode.length + codeData.cssCode.length);
	let pulse = $state(false);
	let pulseTimer: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		// Track the count; skip the initial empty state.
		if (renderedCount === 0) return;
		pulse = true;
		if (pulseTimer) clearTimeout(pulseTimer);
		pulseTimer = setTimeout(() => (pulse = false), 600);
	});
</script>

{#if bothOpen}
	<div class="render-pane">
		<ResizableSplit direction="row" bind:fraction defaultFraction={0.5} min={120}>
			{#snippet a()}
				<PreviewPane
					title="🎯 Goal"
					html={targetHtml}
					css={targetCss}
					side="left"
					collapsed={false}
					ontoggle={() => (goalCollapsed = true)}
				/>
			{/snippet}
			{#snippet b()}
				<PreviewPane
					title="✨ Yours"
					html={codeData.htmlCode}
					css={codeData.cssCode}
					side="right"
					collapsed={false}
					{pulse}
					ontoggle={() => (yoursCollapsed = true)}
				/>
			{/snippet}
		</ResizableSplit>
	</div>
{:else}
	<div class="render-pane stack">
		<PreviewPane
			title="🎯 Goal"
			html={targetHtml}
			css={targetCss}
			side="left"
			collapsed={goalCollapsed}
			ontoggle={() => (goalCollapsed = !goalCollapsed)}
		/>
		<PreviewPane
			title="✨ Yours"
			html={codeData.htmlCode}
			css={codeData.cssCode}
			side="right"
			collapsed={yoursCollapsed}
			{pulse}
			ontoggle={() => (yoursCollapsed = !yoursCollapsed)}
		/>
	</div>
{/if}

<style>
	.render-pane {
		height: 100%;
		background: var(--color-code-bg);
	}

	.render-pane.stack {
		display: flex;
		gap: 2px;
	}
</style>
