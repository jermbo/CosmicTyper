<script>
  import { onMount } from "svelte";
  import { isActive, url, goto } from "@sveltech/routify";
  import { state, getAdminUserAction, logoutAdminUser } from "../store";
  const { adminUser } = state;

  $: shouldDisplayAdmin = JSON.stringify($adminUser) !== "{}";

  let isOpen = false;
  const links = [
    ["web-lessons", "Web Lessons"],
    ["typing-lessons", "Typing Lessons"],
    ["settings", "Settings"],
  ];

  async function handleLogOut() {
    await logoutAdminUser();
    $goto("home");
  }
</script>

<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href={$url('home')}>
      <img src="/assets/images/icon.png" alt="Student Typer Logo" />
      <span class="ml-2 is-size-5 has-text-weight-medium has-margin-left-6">
        Student Typer
      </span>
    </a>

    <a
      role="button"
      class="navbar-burger burger"
      class:is-active={isOpen}
      on:click={() => {
        isOpen = !isOpen;
      }}
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      href={null}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div class="navbar-menu" class:is-active={isOpen}>
    <div class="navbar-start">
      {#each links as [path, name]}
        <a
          class="navbar-item"
          href={$url(path)}
          class:is-active={$isActive(path)}>
          {name}
        </a>
      {/each}
    </div>

    {#if shouldDisplayAdmin}
      <div class="navbar-end">
        <a class="navbar-item" href={$url('admin')}>Admin</a>
        {#if $adminUser.isLoggedIn}
          <a class="navbar-item" href={null} on:click={() => handleLogOut()}>
            Log Out
          </a>
        {:else}
          <a class="navbar-item" href={$url('login')}>Log In</a>
        {/if}
      </div>
    {/if}
  </div>
</nav>
