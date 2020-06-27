<script>
  import { onMount } from "svelte";
  import { url } from "@sveltech/routify";
  import { state, getAdminUserAction } from "../../store";
  const { adminUser } = state;

  onMount(async () => {
    if (!$adminUser.isLoggedIn) {
      await getAdminUserAction();
    }
  });
</script>

<section class="container">
  {#if $adminUser.isLoggedIn}
    <slot />
  {:else}
    <p>You gotta login to see this page.</p>
    <a class="button" href={$url('login')}>Go to Login</a>
  {/if}
</section>
