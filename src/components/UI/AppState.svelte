<script>
  // Stores
  import { APP_STATE, IS_DEBUG } from "Stores/AppState.js";
  import { LESSONS } from "Stores/LessonsState.js";

  // Reactive variables
  $: appState = $APP_STATE.state;
  $: lessonIndex = $LESSONS.index;

  window.clearLS = function() {
    clearStorage();
  };

  function clearStorage() {
    console.clear();
    localStorage.clear();
    window.location.reload();
  }
</script>

{#if $IS_DEBUG}
  <div class="app-state">
    <p>App State: {appState} | Lesson Index: {lessonIndex}</p>
    <button class="btn" on:click={() => clearStorage()}>
      Clear LocalStorage
    </button>
  </div>
{/if}
