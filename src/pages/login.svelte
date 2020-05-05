<script>
  import { onMount } from "svelte";
  import { state, getAdminUserAction } from "../store";
  import { goto } from "@sveltech/routify";
  const { adminUser } = state;

  let username = "";
  let password = "";

  onMount(async () => await getAdminUser());

  async function getAdminUser() {
    if (!$adminUser || !$adminUser.user) {
      await getAdminUserAction();
    }

    if ($adminUser.user) {
      $goto("admin");
    }
  }

  async function handleLogin() {
    if (!$adminUser.user) {
      await getAdminUserAction({ username, password });
      $goto("/admin");
    }
  }
</script>

<!-- routify:options name="login" -->
<input type="text" bind:value={username} />
<br />
<input type="password" bind:value={password} />
<br />
<button on:click={handleLogin}>Login</button>
