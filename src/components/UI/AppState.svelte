<script>
  // Stores
  import { APP_STATE } from "../../stores/AppState.js";
  import { LESSONS } from "../../stores/LessonsState.js";

  // Reactive variables
  $: appState = $APP_STATE.state;
  $: lessonIndex = $LESSONS.index;
</script>

<p class="app-state">App State: {appState} | Lesson Index: {lessonIndex}</p>
