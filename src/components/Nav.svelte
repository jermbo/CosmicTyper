<script>
  import { isActive, url } from "@sveltech/routify";
  let isOpen = false;
  const links = [
    ["/web-lessons", "Web Lessons"],
    ["/typing-lessons", "Typing Lessons"],
    ["/settings", "Settings"],
    ["/admin", "Admin"],
  ];
</script>

<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href={$url('/')}>
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
  </div>
</nav>
