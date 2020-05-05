<script>
  import { onMount } from "svelte";
  import { goto } from "@sveltech/routify";
  import { state, getAdminUserAction } from "../../store";
  const { adminUser } = state;

  onMount(async () => await getAdminUser());

  async function getAdminUser() {
    if (!$adminUser || !$adminUser.user) {
      await getAdminUserAction();
    }
  }
</script>

{#if $adminUser.user}
  <slot />
{:else}
  <div>{$goto('/login')}</div>
{/if}
