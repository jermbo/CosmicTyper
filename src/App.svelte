<script>
  // Life Cycle
  import { onMount } from "svelte";

  // Components
  import WelcomeScreen from "./WelcomeScreen.svelte";
  import AppState from "UI/AppState.svelte";
  import Lessons from "Comps/Lesson/Lessons.svelte";

  // Stores
  import { APP_STATE, IS_DEBUG } from "./stores/AppState.js";
  import { AppStateEnums } from "./scripts/enum.js";

  // Reactive variables
  $: appState = $APP_STATE.state;

  onMount(() => {
    // check to see if things need to be reset
  });
</script>

<style lang="scss" global>
  @import "./styles/styles.scss";
</style>

<main>
  {#if $IS_DEBUG}
    <AppState />
  {/if}

  {#if !appState || appState == AppStateEnums.appStart}
    <WelcomeScreen />
  {/if}

  {#if appState == AppStateEnums.lessonSelect}
    <Lessons />
  {/if}

</main>
