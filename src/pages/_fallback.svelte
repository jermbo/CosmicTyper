<script>
  import { url } from "@sveltech/routify";
</script>

<style>
  .huge {
    font-size: 12rem;
  }
</style>

<div class="e404">
  <div class="huge">404</div>
  <div class="big">
    Page not found.
    <a href={$url('/')}>Go back</a>
  </div>
</div>
