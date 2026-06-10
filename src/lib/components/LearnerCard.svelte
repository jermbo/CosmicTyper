<script lang="ts">
	import type { Learner } from '$lib/types';
	import LearnerAvatar from './LearnerAvatar.svelte';
	import { relativeDate } from '$lib/utils/format';

	interface Props {
		learner: Learner;
		onselect?: (id: string) => void;
	}

	let { learner, onselect }: Props = $props();
</script>

<button class="card" onclick={() => onselect?.(learner.id)}>
	<LearnerAvatar name={learner.name} color={learner.color} size={72} />
	<span class="name">{learner.name}</span>
	<span class="last-seen">Last seen {relativeDate(learner.lastActiveAt)}</span>
</button>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
		padding: 1.5rem 1rem;
		background: var(--color-white);
		border: 2px solid var(--color-grey-light);
		border-radius: 12px;
		cursor: pointer;
		font-family: inherit;
		text-align: center;
		transition:
			transform 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.card:hover {
		transform: translateY(-3px);
		border-color: var(--color-blue);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
	}

	.name {
		font-size: var(--size-5);
		font-weight: 600;
		color: var(--color-dark);
	}

	.last-seen {
		font-size: var(--size-7);
		color: var(--color-grey-dark);
	}
</style>
