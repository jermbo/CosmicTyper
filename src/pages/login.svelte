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
      if ($adminUser.user) {
        $goto("/admin");
      }
    }
  }
</script>

<!-- routify:options name="login" -->
<section class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Login</h1>
  </header>
  <div class="fields">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" bind:value={username} />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" bind:value={password} />
      </div>
    </div>
    <button class="button is-primary" on:click={handleLogin}>Login</button>
  </div>
</section>
