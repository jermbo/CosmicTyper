<script>
  import { url } from "@sveltech/routify";
</script>

<!-- routify:options name="admin" -->
<section class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">For Authorized Personal Only</h1>
    <p>If you are seeing this, you are authorized to see this.</p>
    <p>Choose what area you would like to view and edit</p>
    <a class="button is-small is-info" href={$url('admin-web-lessons')}>
      Web Lessons Admin
    </a>
    <a class="button is-small is-info" href={$url('admin-typing-lessons')}>
      Typing Lessons Admin
    </a>
  </header>
</section>
