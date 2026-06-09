<script lang="ts">
	import { codeData } from '$lib/stores/codeData.svelte';

	const openStyle = '<style>';
	const closeStyle = '</style>';

	let cssBlock = $derived(`${openStyle} ${codeData.cssCode.join('')} ${closeStyle}`);
	let htmlBlock = $derived(codeData.htmlCode.join(''));
</script>

<div class="render">
	{@html cssBlock}
	{@html htmlBlock}
</div>

<style>
	.render {
		width: 100%;
		height: 100%;
		overflow: auto;
		background: var(--color-white);
	}

	/* Reset inherited framework styles so preview renders like a browser */
	.render :global(head),
	.render :global(meta),
	.render :global(title),
	.render :global(link),
	.render :global(style),
	.render :global(script) {
		display: none;
	}

	.render :global(body) {
		display: block;
		margin: 8px;
	}

	.render :global(p) {
		display: block;
		margin: 1em 0;
	}

	.render :global(div) {
		display: block;
	}

	.render :global(h1) {
		display: block;
		font-size: 2em;
		font-weight: bold;
		margin: 0.67em 0;
	}

	.render :global(h2) {
		display: block;
		font-size: 1.5em;
		font-weight: bold;
		margin: 0.83em 0;
	}

	.render :global(h3) {
		display: block;
		font-size: 1.17em;
		font-weight: bold;
		margin: 1em 0;
	}

	.render :global(ul),
	.render :global(ol) {
		display: block;
		margin: 1em 0;
		padding-left: 40px;
	}

	.render :global(li) {
		display: list-item;
	}

	.render :global(table) {
		display: table;
		border-collapse: separate;
		border-spacing: 2px;
	}

	.render :global(a) {
		color: -webkit-link;
		text-decoration: underline;
	}

	.render :global(strong),
	.render :global(b) {
		font-weight: bold;
	}

	.render :global(em),
	.render :global(i) {
		font-style: italic;
	}
</style>
