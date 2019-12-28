<script>
  // Stores
  import { APP_STATE } from "Stores/AppState.js";
  import { LESSONS } from "Stores/LessonsState.js";

  // Reactive variables
  $: appState = $APP_STATE.state;
  $: lessonIndex = $LESSONS.index;
</script>

<p class="app-state">App State: {appState} | Lesson Index: {lessonIndex}</p>
