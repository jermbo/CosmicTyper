<script>
  // Life Cycle
  import { beforeUpdate } from "svelte";

  // Components
  import AppState from "UI/AppState.svelte";
  import WelcomeScreen from "./WelcomeScreen.svelte";
  import LessonsScreen from "./LessonsScreen.svelte";

  // Stores
  import { APP_STATE, IS_DEBUG } from "Stores/AppState.js";
  import { USER_OBJ } from "Stores/UserState.js";

  // Helpers and Enums
  import { setLsItem } from "Scripts/LocalStorageHelper.js";
  import { LSKeyEnums, AppStateEnums } from "Scripts/enum.js";

  // Reactive variables
  $: appState = $APP_STATE.state;

  const rightNow = Date.now();
  // Setting Threshold to 18 hours.
  const resetThreshold = 1000 * 60 * 60 * 18;

  function changeAppState({ detail }) {
    APP_STATE.setState(detail);
  }

  beforeUpdate(() => {
    if (rightNow - $USER_OBJ.active_time > resetThreshold) {
      localStorage.clear();
      window.location.reload();
    }
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
    <WelcomeScreen on:updateState={changeAppState} />
  {/if}

  {#if appState == AppStateEnums.lessonSelect}
    <LessonsScreen on:changeDifficulty={changeAppState} />
  {/if}

</main>
