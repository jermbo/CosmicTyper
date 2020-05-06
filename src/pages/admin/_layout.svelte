<script>
  import { onMount } from "svelte";
  import { url } from "@sveltech/routify";
  import { state, getAdminUserAction } from "../../store";
  const { adminUser } = state;

  onMount(async () => await authAdmin());

  async function authAdmin() {
    if (!$adminUser.isLoggedIn) {
      await getAdminUserAction();
    }
  }
</script>

<section class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    {#if $adminUser.isLoggedIn}
      <slot />
    {:else}
      <p>You gotta login to see this page.</p>
      <a class="button is-small is-info" href={$url('login')}>Go to Login</a>
    {/if}
  </header>
</section>
