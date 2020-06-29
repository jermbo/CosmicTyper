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
      <div class="page-header__info">
        <h1 class="page__title">Restricted Access</h1>
        <p class="page__subtitle">
          You need to be logged in to view the admin area
        </p>
      </div>
    </div>
    <div class="page-body">
      <a class="button" href={$url('login')}>Go to Login</a>
    </div>
  {:else}
    <slot />
  {/if}
</section>
