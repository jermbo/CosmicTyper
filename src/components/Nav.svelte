<script>
  import { Router, Link, Route } from "svelte-routing";
  import { getContext } from "svelte";
  import { ROUTER } from "svelte-routing/src/contexts";

  const { activeRoute } = getContext(ROUTER);
  console.log(activeRoute);

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
    if (isActive) {
      return { class: "navbar-item is-active" };
    }
    return { class: "navbar-item" };
  }

  let isOpen = false;
</script>

<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="assets/images/logo.png" width="125" alt="Student Typer Logo" />
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

  <div id="navbarBasicExample" class="navbar-menu" class:is-active={isOpen}>
    <div class="navbar-start">
      <Link to="/welcome" {getProps}>Welcome</Link>
      <Link to="/web-lessons" {getProps}>Web Lessons</Link>
      <Link to="/typing-lessons" {getProps}>Typing Lessons</Link>
    </div>
  </div>
</nav>
