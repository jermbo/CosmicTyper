<script lang="ts">
	import { page } from '$app/state';

	let isOpen = $state(false);

	function isActive(path: string): boolean {
		return page.url.pathname.startsWith(path);
	}
</script>

<nav aria-label="main navigation">
	<div class="nav-brand">
		<a href="/welcome" class="brand-link">
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

	<div class="nav-menu" class:is-open={isOpen}>
		<a href="/web-lessons" class="nav-link" class:active={isActive('/web-lessons')}>
			Web Lessons
		</a>
		<a href="/typing-lessons" class="nav-link" class:active={isActive('/typing-lessons')}>
			Typing Lessons
		</a>
	</div>
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
