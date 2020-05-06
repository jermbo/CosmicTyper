<script>
  import { onMount } from "svelte";
  import { state, getAdminUserAction } from "../store";
  import { goto } from "@sveltech/routify";
  import { form } from "svelte-forms";
  const { adminUser } = state;

  let username = "jermbo";
  let password = "test123";

  const myForm = form(() => ({
    username: {
      value: username,
      validators: ["required"],
      enabled: true,
    },
    password: {
      value: password,
      validators: ["required"],
      enabled: true,
    },
  }));

  onMount(async () => await authAdmin());

  async function authAdmin() {
    if (!$adminUser) {
      await getAdminUserAction();
    }
    if ($adminUser.isLoggedIn) {
      $goto("admin");
    }
  }

  async function handleSubmit() {
    console.log(!$adminUser.isLoggedIn);
    if (!$adminUser.isLoggedIn) {
      await getAdminUserAction({ username, password });
      if ($adminUser.isLoggedIn) {
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
  <form on:submit|preventDefault={handleSubmit}>

    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="User Name"
          bind:value={username} />
        <span class="icon is-small is-left">
          <i class="fas fa-user" />
        </span>
      </div>
      {#if $myForm.dirty && $myForm.username.errors.includes('required')}
        <p class="help is-danger">This username is required</p>
      {/if}
      {#if $myForm.dirty && $myForm.username.errors.includes('min')}
        <p class="help is-danger">Min is 3</p>
      {/if}
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          placeholder="Password"
          bind:value={password} />
        <span class="icon is-small is-left">
          <i class="fas fa-lock" />
        </span>
      </div>
      {#if $myForm.dirty && $myForm.password.errors.includes('required')}
        <p class="help is-danger">This password is required</p>
      {/if}
    </div>

    <button type="submit" class="button is-primary" disabled={!$myForm.valid}>
      Login
    </button>
  </form>
</section>
