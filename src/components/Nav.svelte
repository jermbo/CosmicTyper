<script>
  import { Link, link } from "svelte-routing";
  import { getContext } from "svelte";
  import { ROUTER } from "svelte-routing/src/contexts";

  const { activeRoute } = getContext(ROUTER);

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
    <a class="navbar-item" href="/" use:link>
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

  <div id="navbarBasicExample" class="navbar-menu" class:is-active={isOpen}>
    <div class="navbar-start">
      <Link to="/web-lessons" {getProps}>Web Lessons</Link>
      <Link to="/typing-lessons" {getProps}>Typing Lessons</Link>
    </div>
  </div>
</nav>
