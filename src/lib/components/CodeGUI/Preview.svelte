<script lang="ts">
	interface Props {
		html: string[];
		css: string[];
		title?: string;
	}

	let { html, css, title = 'Lesson preview' }: Props = $props();

	// A real, isolated document. The sandbox attribute (no allow-*) disables
	// scripts/forms — these are HTML/CSS lessons — and keeps the lesson's
	// styles from leaking into the app. Leading doctype forces standards mode;
	// the browser builds head/body, so it tolerates lesson scaffolding.
	let srcdoc = $derived(
		`<!doctype html><meta charset="utf-8"><style>${css.join('')}</style>${html.join('')}`
	);
</script>

<iframe class="preview" {title} {srcdoc} sandbox=""></iframe>

<style>
	.preview {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
		background: var(--color-white);
	}
</style>
