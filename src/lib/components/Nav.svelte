<script>
</script>

<nav class="bg-slate-100 shadow">
	<div class="flex items-center gap-2 px-4">
		<a href="/" class="logo">
			<img class="block h-6 w-auto" src="images/icon.png" alt="Cosmic Typer" />
			<span class="whitespace-nowrap">Student Typer</span>
		</a>

		<a href="/web-lessons" aria-current="page" class="nav">Web Lessons</a>
		<a href="/typing-lessons" class="nav">Typing Lessons</a>
	</div>
</nav>

<style lang="scss">
	.logo {
		@apply flex items-center justify-items-center gap-2;
	}

	.nav {
		@apply p-4 border-b-2 border-transparent;

		&:hover,
		&:focus-visible,
		&[aria-current='page'] {
			@apply border-teal-400;
		}
	}
</style>
