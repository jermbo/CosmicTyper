<script lang="ts">
	import '$lib/components/admin/admin.css';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin Login — CosmicTyper</title>
</svelte:head>

<div class="login">
	<form method="POST" class="admin-card login-card">
		<h1>CosmicTyper Admin</h1>
		<p class="hint">Sign in to edit lessons.</p>

		{#if form?.error}
			<p class="admin-flash error" role="alert">{form.error}</p>
		{/if}

		<label class="admin-field">
			Password
			<input type="password" name="password" required autocomplete="current-password" />
		</label>

		<button type="submit" class="admin-btn primary">Sign in</button>
	</form>
</div>

<style>
	.login {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.login-card {
		width: 100%;
		max-width: 380px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		margin: 0;
		font-size: var(--size-3);
	}

	.hint {
		margin: 0;
		color: var(--color-grey-dark);
		font-size: var(--size-6);
	}

	.login-card .admin-btn {
		width: 100%;
	}
</style>
