<script>
  import { url } from "@sveltech/routify";
</script>

<!-- routify:options name="admin" -->
<section class="page">
  <header class="page-header">
    <h1 class="page__title">Typer Admin Page</h1>
    <p class="page__subtitle">Please select an area you would like to view.</p>
  </header>
  <div class="page-body">
    <a class="button" href={$url('web-lessons-admin')}>Web Lessons Admin</a>
    <a class="button" href={$url('typing-lessons-admin')}>
      Typing Lessons Admin
    </a>
  </div>
</section>
