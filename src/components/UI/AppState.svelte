<script>
  // Stores
  import { APP_STATE } from "Stores/AppState.js";
  import { LESSONS } from "Stores/LessonsState.js";

  // Reactive variables
  $: appState = $APP_STATE.state;
  $: lessonIndex = $LESSONS.index;

  function clearLS() {
    localStorage.clear();
    window.location.reload();
  }
</script>

<div class="app-state">
  <p>App State: {appState} | Lesson Index: {lessonIndex}</p>
  <button class="btn" on:click={() => clearLS()}>Clear LocalStorage</button>
</div>
