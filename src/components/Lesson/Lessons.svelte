<script>
  // Svelte
  import { onMount, createEventDispatcher } from "svelte";

  // Stores
  import { LESSONS } from "Stores/LessonsState.js";
  import { USER_OBJ } from "Stores/UserState.js";

  // Components
  import Loading from "../UI/Loading.svelte";
  import LessonList from "./LessonList.svelte";
  import Lesson from "./Lesson.svelte";

  // Helpers and Enums
  import { setLsItem } from "Scripts/LocalStorageHelper.js";
  import { LSKeyEnums, AppStateEnums } from "Scripts/enum.js";
  import SimulateLoadTime from "Scripts/SimulateLoadTime.js";

  // Eventually this will come from database
  import LESSONS_FROM_STORAGE from "Data/lessons.js";

  // Reactive variables
  $: lessonIndex = $LESSONS.index;

  const dispatch = createEventDispatcher();

  function selectLesson({ detail }) {
    updateLessonIndex(detail);
  }

  function lessonEnded() {
    updateLessonIndex(-1);
  }

  function triggerChangeDifficulty() {
    dispatch("changeDifficulty", AppStateEnums.appStart);
  }

  function updateLessonIndex(index) {
    LESSONS.update(obj => {
      obj.index = index;
      return obj;
    });
    setLsItem(LSKeyEnums.lessons, $LESSONS);
  }

  async function getLessons() {
    const lessons = await SimulateLoadTime(LESSONS_FROM_STORAGE, 2500);
    LESSONS.update(obj => {
      obj.allLessons.push(...lessons);
      return obj;
    });
    setLsItem(LSKeyEnums.lessons, $LESSONS);
  }

  onMount(async () => {
    if (!$LESSONS.allLessons.length) {
      getLessons();
    }
  });
</script>

{#if lessonIndex == -1}
  <div class="container">
    <div class="inner">
      <h1>Lesson Select</h1>

      {#if !$LESSONS.allLessons.length}
        <Loading text="Loading Lessons...." />
      {:else}
        <p>Select a lesson.</p>
        <LessonList
          on:lessonSelect={selectLesson}
          lessons={$LESSONS.allLessons} />

        <div class="btns">
          <button class="btn" on:click|once={() => triggerChangeDifficulty()}>
            Change Difficulty
          </button>
        </div>
      {/if}

    </div>
  </div>
{:else if lessonIndex >= 0}
  <Lesson
    on:sectionFinished={lessonEnded}
    lesson={$LESSONS.allLessons[lessonIndex]} />
{/if}
