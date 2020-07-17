<script>
  import { Nav } from "../components";
  import { Loading } from "../components/common-ui";
</script>

<Nav />

<main class="main-wrapper">
  <slot />
</main>

<Loading />
