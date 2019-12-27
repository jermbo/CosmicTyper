<script>
  // Life Cycle
  import { onMount } from "svelte";

  // Components
  import Lessons from "./Lessons.svelte";
  import WelcomeScreen from "./WelcomeScreen.svelte";

  // Stores
  import { APP_STATE } from "./stores/AppState.js";
  import { LESSONS } from "./stores/LessonsState.js";

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
  <p class="app-state">
    App State: {appState} | Lesson Index: {$LESSONS.index}
  </p>

  {#if !appState || appState == 'WELCOME_SCREEN'}
    <WelcomeScreen />
  {/if}

  {#if appState == 'LESSON_SELECT'}
    <Lessons />
  {/if}

</main>
