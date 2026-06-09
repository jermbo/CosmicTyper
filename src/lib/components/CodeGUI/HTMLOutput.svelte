<script lang="ts">
	import { codeData } from '$lib/stores/codeData.svelte';
	import PreviewPane from './PreviewPane.svelte';

	interface Props {
		targetHtml: string[];
		targetCss: string[];
	}

	let { targetHtml, targetCss }: Props = $props();

	let goalCollapsed = $state(false);
	let yoursCollapsed = $state(false);

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

<div class="render-pane">
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

<style>
	.render-pane {
		display: flex;
		height: 100%;
		gap: 2px;
		background: var(--color-code-bg);
	}

	@media (max-width: 768px) {
		.render-pane {
			flex-direction: column;
		}
	}
</style>
