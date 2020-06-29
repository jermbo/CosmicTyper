<script>
  import { onMount } from "svelte";
  import { state, getAdminUserAction } from "../store";
  import { goto } from "@sveltech/routify";
  import { form } from "svelte-forms";
  const { adminUser, loginErrors } = state;

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
    if (!$adminUser.isLoggedIn) {
      await getAdminUserAction({ username, password });
      if ($adminUser.isLoggedIn) {
        $goto("/admin");
      }
    }
  }
</script>

<!-- routify:options name="login" -->
<section class="page">
  <div class="page-header">
    <h1 class="page__title">Login</h1>
  </div>
  <div class="page-body">
    <form class="form" on:submit|preventDefault={handleSubmit}>
      <div class="form-field">
        <label class="label">User Name</label>
        <input
          type="text"
          class="input"
          placeholder="User Name"
          bind:value={username} />

        {#if $myForm.dirty && $myForm.username.errors.includes('required')}
          <p class="form-error">This username is required</p>
        {/if}
      </div>

      <div class="form-field">
        <label class="label">Password</label>
        <input
          type="password"
          class="input"
          placeholder="Password"
          bind:value={password} />

        {#if $myForm.dirty && $myForm.password.errors.includes('required')}
          <p class="form-danger">This password is required</p>
        {/if}
      </div>

      <div class="form-actions">
        <button class="button -primary" disabled={!$myForm.valid}>
          Submit
        </button>
      </div>
      {#if $loginErrors.length > 0}
        <div class="form-messages">
          {#each $loginErrors as error}
            <p class="form-danger">{error.message}</p>
          {/each}
        </div>
      {/if}
    </form>
  </div>
</section>
