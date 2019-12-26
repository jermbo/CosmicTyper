<script>
  import LessonsList from "./LessonsList.svelte";
  import Lesson from "./Lesson.svelte";
  import WelcomeScreen from "./WelcomeScreen.svelte";

  import { STATE, CURRENT_LESSON_INDEX, LESSONS } from "./stores/AppState.js";

  let mainState;
  STATE.subscribe(newState => {
    mainState = newState;
  });

  let lessonIndex;
  CURRENT_LESSON_INDEX.subscribe(index => {
    lessonIndex = index;
  });

  let allLessons;
  LESSONS.subscribe(data => {
    allLessons = data;
  });
</script>

<style lang="scss" global>
  @import "./styles/styles.scss";
</style>

<main>
  <p class="app-state">App State: {mainState} | Lesson Index: {lessonIndex}</p>

  {#if mainState == 'WELCOME_SCREEN'}
    <WelcomeScreen />
  {/if}

  {#if mainState == 'LESSON_SELECT'}
    <LessonsList />
  {/if}

  {#if mainState == 'LESSON_STARTED' || mainState == 'LESSON_ENDED'}
    <Lesson />
  {/if}
</main>
