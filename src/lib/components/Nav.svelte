<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { learnerStore } from '$lib/stores/learner.svelte';
	import LearnerAvatar from './LearnerAvatar.svelte';

	let isOpen = $state(false);

	let learner = $derived(learnerStore.activeLearner);
	let brandHref = $derived(learner ? '/dashboard' : '/');

	function isActive(path: string): boolean {
		return page.url.pathname.startsWith(path);
	}

	function switchLearner() {
		learnerStore.deactivate();
		isOpen = false;
		goto('/');
	}
</script>

<nav aria-label="main navigation">
	<div class="nav-brand">
		<a href={brandHref} class="brand-link">
			<span class="brand-name">Student Typer</span>
		</a>

		<button
			class="burger"
			class:is-open={isOpen}
			aria-label="menu"
			aria-expanded={isOpen}
			onclick={() => (isOpen = !isOpen)}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>

	{#if learner}
		<div class="nav-menu" class:is-open={isOpen}>
			<a href="/web-lessons" class="nav-link" class:active={isActive('/web-lessons')}>
				Web Lessons
			</a>
			<a href="/typing-lessons" class="nav-link" class:active={isActive('/typing-lessons')}>
				Typing Lessons
			</a>
		</div>

		<div class="nav-learner">
			<a href="/dashboard" class="learner-link" title={learner.name}>
				<LearnerAvatar name={learner.name} color={learner.color} size={32} />
				<span class="learner-name">{learner.name}</span>
			</a>
			<button class="switch-btn" onclick={switchLearner}>Switch</button>
		</div>
	{/if}
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--navbar-height);
		background: var(--color-white);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: stretch;
		z-index: 100;
		padding: 0 1rem;
	}

	.nav-brand {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.brand-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: var(--color-dark);
	}

	.brand-name {
		font-size: var(--size-5);
		font-weight: 500;
		margin-left: 0.5rem;
	}

	.nav-menu {
		display: flex;
		align-items: stretch;
		margin-left: 1rem;
	}

	.nav-learner {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-left: auto;
	}

	.learner-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--color-dark);
	}

	.learner-name {
		font-size: var(--size-6);
		font-weight: 500;
	}

	.switch-btn {
		font-family: inherit;
		font-size: var(--size-7);
		padding: 0.3rem 0.7rem;
		border: 1px solid var(--color-grey-light);
		border-radius: 4px;
		background: var(--color-white);
		color: var(--color-grey-dark);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.switch-btn:hover {
		border-color: var(--color-blue);
		color: var(--color-blue);
	}

	.nav-link {
		display: flex;
		align-items: center;
		padding: 0 1rem;
		text-decoration: none;
		color: var(--color-dark);
		border-bottom: 3px solid transparent;
		transition: border-color 0.2s ease;
	}

	.nav-link:hover,
	.nav-link.active {
		border-bottom-color: var(--color-primary);
		color: var(--color-dark);
	}

	.burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		margin-left: auto;
	}

	.burger span {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--color-dark);
		transition: all 0.2s ease;
	}

	.burger.is-open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.burger.is-open span:nth-child(2) {
		opacity: 0;
	}
	.burger.is-open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	@media (max-width: 768px) {
		nav {
			flex-wrap: wrap;
			height: auto;
			min-height: var(--navbar-height);
		}

		.nav-brand {
			width: 100%;
			justify-content: space-between;
			height: var(--navbar-height);
		}

		.burger {
			display: flex;
		}

		.nav-menu {
			display: none;
			flex-direction: column;
			width: 100%;
			margin-left: 0;
			padding-bottom: 0.5rem;
		}

		.nav-learner {
			width: 100%;
			margin-left: 0;
			justify-content: space-between;
			padding: 0.5rem;
			border-top: 1px solid var(--color-grey-lighter);
		}

		.nav-menu.is-open {
			display: flex;
		}

		.nav-link {
			padding: 0.5rem 0;
			border-bottom: none;
			border-left: 3px solid transparent;
			padding-left: 0.5rem;
		}

		.nav-link:hover,
		.nav-link.active {
			border-bottom: none;
			border-left-color: var(--color-primary);
		}
	}
</style>
