<script lang="ts">
	import { initials } from '$lib/utils/format';

	interface Props {
		name: string;
		color: string;
		size?: number;
	}

	let { name, color, size = 64 }: Props = $props();

	let label = $derived(initials(name));
</script>

<span
	class="avatar"
	style="--avatar-size: {size}px; --avatar-color: {color}; --avatar-font: {Math.round(
		size * 0.4
	)}px;"
	aria-hidden="true"
>
	{label}
</span>

<style>
	.avatar {
		width: var(--avatar-size);
		height: var(--avatar-size);
		border-radius: 50%;
		background: var(--avatar-color);
		color: var(--color-white);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: var(--avatar-font);
		font-weight: 700;
		line-height: 1;
		flex-shrink: 0;
		user-select: none;
	}
</style>
