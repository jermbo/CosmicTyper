<script lang="ts">
	import { codeData } from '$lib/stores/codeData.svelte';

	let tabFocus = $state<'html' | 'css'>('html');

	// Reveal whichever pane just rendered, so the flashing lines are visible.
	$effect(() => {
		tabFocus = codeData.lastTouched;
	});

	// Use Sets for O(1) flash lookups instead of Array.includes.
	let recentHtmlSet = $derived(new Set(codeData.recentHtml));
	let recentCssSet = $derived(new Set(codeData.recentCss));
</script>

<div class="code-display">
	<div class="tabs" role="tablist" aria-label="Code output">
		<div class="tab-group">
			<button
				type="button"
				class="tab"
				class:focus={tabFocus === 'html'}
				role="tab"
				aria-selected={tabFocus === 'html'}
				aria-controls="code-panel-html"
				id="tab-html"
				onclick={() => (tabFocus = 'html')}
			>
				HTML
			</button>
			<button
				type="button"
				class="tab"
				class:focus={tabFocus === 'css'}
				role="tab"
				aria-selected={tabFocus === 'css'}
				aria-controls="code-panel-css"
				id="tab-css"
				onclick={() => (tabFocus = 'css')}
			>
				CSS
			</button>
		</div>
	</div>

	<div class="displays">
		<div
			id="code-panel-html"
			class="display"
			class:focus={tabFocus === 'html'}
			role="tabpanel"
			aria-labelledby="tab-html"
		>
			<pre class="display-pre"><code
					>{#each codeData.htmlCode as line, i}<span
							class="display-line"
							class:flash={recentHtmlSet.has(i)}
							>{i + 1}: {line}
</span>{/each}</code
				></pre>
		</div>
		<div
			id="code-panel-css"
			class="display"
			class:focus={tabFocus === 'css'}
			role="tabpanel"
			aria-labelledby="tab-css"
		>
			<pre class="display-pre"><code
					>{#each codeData.cssCode as line, i}<span
							class="display-line"
							class:flash={recentCssSet.has(i)}
							>{i + 1}: {line}
</span>{/each}</code
				></pre>
		</div>
	</div>
</div>

<style>
	.code-display {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.tabs {
		display: flex;
		justify-content: space-between;
		box-shadow: 0 -5px 0px var(--color-code-bg);
	}

	.tab-group {
		display: flex;
	}

	.tab {
		cursor: pointer;
		padding: calc(var(--padding) / 2);
		border-top: 4px solid transparent;
		border-left: none;
		border-right: none;
		border-bottom: none;
		background: none;
		font-family: var(--font-family);
		font-size: var(--size-6);
		transition: all 0.25s ease;
	}

	.tab:hover,
	.tab.focus {
		background: #d4d4db;
		border-top-color: var(--color-cherry);
	}

	.tab:focus-visible {
		outline: 2px solid var(--color-blue);
		outline-offset: -2px;
	}

	.displays {
		background: #d4d4db;
		padding: calc(var(--padding) / 2);
		height: calc(100% - 37px);
		position: relative;
	}

	.display {
		transition: opacity 0.25s ease;
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow-x: auto;
		background: #d4d4db;
	}

	.display-pre {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow-x: auto;
		background: transparent;
	}

	.display-pre code {
		display: block;
		font-family: inherit;
	}

	.display.focus {
		opacity: 1;
	}

	.display-line {
		display: block;
		padding: 4px calc(var(--padding) / 2);
	}

	.display-line:nth-child(even) {
		background: #e8e9ed;
	}

	/* Flash the lines that just rendered, tying typed code → output. */
	.display-line.flash {
		animation: lineFlash 1s ease;
	}

	@keyframes lineFlash {
		0% {
			background: var(--color-primary);
		}
		100% {
			background: transparent;
		}
	}
</style>
