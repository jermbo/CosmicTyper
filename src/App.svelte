<script>
  import { state } from "./store/store";
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  const { adminUser, userSettings } = state;
  $: mode = $userSettings.mode || "dark";
</script>

<style global lang="scss">
  @import "scss/styles.scss";
</style>

<div class="global-wrapper" class:mode-light={mode == 'light'}>
  <Router {routes} />
</div>
