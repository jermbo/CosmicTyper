<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin Login — CosmicTyper</title>
</svelte:head>

<div class="login">
	<form method="POST" class="card">
		<h1>Admin</h1>
		<p class="hint">Enter the admin password to edit lessons.</p>

		{#if form?.error}
			<p class="error" role="alert">{form.error}</p>
		{/if}

		<label>
			Password
			<input type="password" name="password" required autocomplete="current-password" />
		</label>

		<button type="submit">Sign in</button>
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

	.card {
		background: var(--color-white);
		border-radius: 8px;
		padding: 2rem;
		width: 100%;
		max-width: 360px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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

	label {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: var(--size-6);
		font-weight: 600;
	}

	input {
		font: inherit;
		padding: 0.6rem 0.75rem;
		border: 2px solid var(--color-grey-light);
		border-radius: 6px;
	}

	input:focus {
		outline: none;
		border-color: var(--color-blue);
	}

	button {
		font: inherit;
		font-weight: 600;
		padding: 0.75rem 1rem;
		border: none;
		border-radius: 6px;
		background: var(--color-dark);
		color: var(--color-white);
		cursor: pointer;
	}

	button:hover {
		opacity: 0.9;
	}

	.error {
		margin: 0;
		padding: 0.6rem 0.75rem;
		background: #fde8eb;
		color: var(--color-cherry);
		border-radius: 6px;
		font-size: var(--size-6);
	}
</style>
