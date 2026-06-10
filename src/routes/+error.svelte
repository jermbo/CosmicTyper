<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="not-found">
	<h1>{page.status}</h1>
	<p>{page.error?.message ?? 'Something went wrong.'}</p>
	<a href="/">Go home</a>
</section>

<style>
	.not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: calc(100vh - var(--navbar-height));
		gap: 1rem;
		text-align: center;
	}

	h1 {
		font-size: var(--size-1);
		font-weight: 700;
		margin: 0;
	}

	p {
		font-size: var(--size-4);
		color: var(--color-grey-dark);
		margin: 0;
	}

	a {
		color: var(--color-blue);
	}
</style>
