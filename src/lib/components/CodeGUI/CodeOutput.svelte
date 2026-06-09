<script lang="ts">
	import { codeData } from '$lib/stores/codeData.svelte';

	let tabFocus = $state<'html' | 'css'>('html');

	// Reveal whichever pane just rendered, so the flashing lines are visible.
	$effect(() => {
		tabFocus = codeData.lastTouched;
	});
</script>

<div class="code-display">
	<div class="tabs">
		<div class="tab-group">
			<button class="tab" class:focus={tabFocus === 'html'} onclick={() => (tabFocus = 'html')}>
				HTML
			</button>
			<button class="tab" class:focus={tabFocus === 'css'} onclick={() => (tabFocus = 'css')}>
				CSS
			</button>
		</div>
	</div>

	<div class="displays">
		<pre class="display" class:focus={tabFocus === 'html'}>
			{#each codeData.htmlCode as line, i}
				<div class="display-line" class:flash={codeData.recentHtml.includes(i)}>{i +
						1}: {line}</div>
			{/each}
		</pre>
		<pre class="display" class:focus={tabFocus === 'css'}>
			{#each codeData.cssCode as line, i}
				<div class="display-line" class:flash={codeData.recentCss.includes(i)}>{i + 1}: {line}</div>
			{/each}
		</pre>
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

	.tab:focus {
		outline: none;
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

	.display.focus {
		opacity: 1;
	}

	.display-line {
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
