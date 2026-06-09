<script lang="ts">
	import { PALETTE } from '$lib/constants';

	interface Props {
		value: string;
		onchange?: (hex: string) => void;
	}

	let { value = $bindable(), onchange }: Props = $props();

	function select(hex: string) {
		value = hex;
		onchange?.(hex);
	}
</script>

<div class="palette" role="radiogroup" aria-label="Avatar color">
	{#each PALETTE as color (color.hex)}
		<button
			type="button"
			class="swatch"
			class:selected={value === color.hex}
			style="--swatch: {color.hex}"
			role="radio"
			aria-checked={value === color.hex}
			aria-label={color.name}
			title={color.name}
			onclick={() => select(color.hex)}
		></button>
	{/each}
</div>

<style>
	.palette {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.swatch {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--swatch);
		border: 3px solid transparent;
		cursor: pointer;
		padding: 0;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.swatch:hover {
		transform: scale(1.1);
	}

	.swatch.selected {
		border-color: var(--color-dark);
		box-shadow: 0 0 0 2px var(--color-white) inset;
	}

	.swatch:focus-visible {
		outline: 2px solid var(--color-dark);
		outline-offset: 2px;
	}
</style>
