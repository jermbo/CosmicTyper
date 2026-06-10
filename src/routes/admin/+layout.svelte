<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();
	const isLogin = $derived(page.url.pathname === '/admin/login');
</script>

{#if isLogin}
	{@render children()}
{:else}
	<div class="admin">
		<header class="admin-header">
			<a href="/admin" class="brand">CosmicTyper Admin</a>
			<nav>
				<a href="/">← Back to app</a>
				<form method="POST" action="/admin/logout">
					<button type="submit">Sign out</button>
				</form>
			</nav>
		</header>
		<main class="admin-main">
			{@render children()}
		</main>
	</div>
{/if}

<style>
	.admin {
		min-height: 100vh;
	}

	.admin-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: var(--color-dark);
		color: var(--color-white);
	}

	.brand {
		color: inherit;
		font-weight: 700;
		font-size: var(--size-5);
		text-decoration: none;
	}

	.admin-header nav {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.admin-header a {
		color: var(--color-grey-light);
		text-decoration: none;
		font-size: var(--size-6);
	}

	.admin-header a:hover {
		color: var(--color-white);
	}

	.admin-header form {
		margin: 0;
	}

	.admin-header button {
		font: inherit;
		font-size: var(--size-6);
		background: transparent;
		border: 1px solid var(--color-grey);
		color: var(--color-white);
		padding: 0.35rem 0.75rem;
		border-radius: 4px;
		cursor: pointer;
	}

	.admin-main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 1.5rem 1.75rem 3rem;
	}
</style>
