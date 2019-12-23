<script>
  import Loading from "./Loading.svelte";
  import LessonsList from "./LessonsList.svelte";
  import Lesson from "./Lesson.svelte";
  import UserInput from "./UserInput.svelte";
  import { STATE, CURRENT_LESSON_INDEX, LESSONS } from "./stores/AppState.js";
  import AllLessons from "./lessons/lessons.js";

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

  /**
   * ----------------------------------------------------
   * Simulating the wait time for loading data.
   * Eventually this will be replaced with an acutal call
   * to an api, but in the mean time I want to lay down
   * a good foundation for making the updates later.
   * ----------------------------------------------------
   *
   */

  let lessons = getLessons();
  async function getLessons() {
    const items = await simulateDataLoad(AllLessons);
    const data = [...items.lessons];
    LESSONS.update(() => data);
    return data;
  }

  function simulateDataLoad(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        STATE.update(() => "LESSON_SELECT");
        resolve(data);
      }, 2500);
    });
  }
</script>

<style lang="scss" global>
  @import "./styles/styles.scss";
</style>

<main>
  <p class="app-state">App State: {mainState} | Lesson Index: {lessonIndex}</p>
  {#if mainState == 'LOADING'}
    <Loading />
  {/if}

  {#if mainState == 'USER_INPUT'}
    <UserInput />
  {/if}

  {#if mainState == 'LESSON_SELECT'}
    {#await lessons}
      <p>Building Lesson List</p>
    {:then data}
      <LessonsList lessons={data} />
    {/await}
  {/if}

  {#if mainState == 'LESSON_STARTED' || mainState == 'LESSON_ENDED'}
    <Lesson lesson={allLessons[lessonIndex]} />
  {/if}
</main>
