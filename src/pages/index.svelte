<script>
  import { _ } from "svelte-i18n";
</script>

<!-- routify:options name="home" -->
<section class="welcome">
  <h1 class="welcome__title">
    <span class="-thin">{$_('page.home.welcome')}</span>
    <br />
    <span class="-heavy">Student Typer</span>
  </h1>
  <p class="welcome__subtitle">{$_('page.home.slogan')}</p>
</section>
