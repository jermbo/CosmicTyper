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

<section class="page">
  {#if !$adminUser.isLoggedIn}
    <div class="page-header">
      <h1 class="page__title">You gotta login to see this page.</h1>
      <a class="button" href={$url('login')}>Go to Login</a>
    </div>
  {:else}
    <slot />
  {/if}
</section>
