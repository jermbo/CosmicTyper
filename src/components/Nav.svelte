<script>
  import { onMount } from "svelte";
  import { isActive, url, goto } from "@sveltech/routify";
  import { state, getAdminUserAction, logoutAdminUser } from "../store";
  import { _, locale, locales } from "svelte-i18n";

  const { adminUser, userSettings } = state;

  $: mode = $userSettings.mode || "dark";
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

  function toggleMode() {
    $userSettings.mode = mode == "dark" ? "light" : "dark";
  }
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">

  <a class="navbar-brand" href={$url('/')}>
    <img src="/assets/images/icon.png" alt="Student Typer Logo" />
    <span class="">Student Typer</span>
  </a>

  <div class="navbar-start">
    {#each links as [path, name]}
      <a
        class="navbar-item"
        href={$url(path)}
        class:is-active={$isActive(path)}>
        {$_(`page.${path}.nav`, { default: 'Web Lessons' })}
      </a>
    {/each}
  </div>

  <div>
    <select bind:value={$locale}>
      {#each $locales as locale}
        <option value={locale}>{locale}</option>
      {/each}
    </select>
    <button on:click={toggleMode}>Toggle Mode {mode}</button>
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
</nav>
