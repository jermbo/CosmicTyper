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

<fieldset class="palette">
	<legend class="sr-only">Avatar color</legend>
	{#each PALETTE as color (color.hex)}
		<label class="swatch-label" title={color.name}>
			<input
				type="radio"
				name="avatar-color"
				value={color.hex}
				checked={value === color.hex}
				aria-label={color.name}
				onchange={() => select(color.hex)}
			/>
			<span class="swatch" style="--swatch: {color.hex}"></span>
		</label>
	{/each}
</fieldset>

<style>
	.palette {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		border: none;
		padding: 0;
		margin: 0;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.swatch-label {
		cursor: pointer;
	}

	.swatch-label input[type='radio'] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.swatch {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--swatch);
		border: 3px solid transparent;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.swatch-label:hover .swatch {
		transform: scale(1.1);
	}

	input[type='radio']:checked + .swatch {
		border-color: var(--color-dark);
		box-shadow: 0 0 0 2px var(--color-white) inset;
	}

	input[type='radio']:focus-visible + .swatch {
		outline: 2px solid var(--color-dark);
		outline-offset: 2px;
	}
</style>
