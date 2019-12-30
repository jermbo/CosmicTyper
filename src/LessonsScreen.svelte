<script>
  // Svelte
  import { onMount, createEventDispatcher } from "svelte";

  // Stores
  import { LESSONS } from "Stores/LessonsState.js";
  import { USER_OBJ } from "Stores/UserState.js";

  // Components
  import Loading from "UI/Loading.svelte";
  import LessonList from "Comps/Lesson/LessonList.svelte";
  import Lesson from "Comps/Lesson/Lesson.svelte";

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
    LESSONS.changeIndex(index);
  }

  async function getLessons() {
    const lessons = await SimulateLoadTime(LESSONS_FROM_STORAGE, 2500);
    LESSONS.setAllLessons(lessons);
    filterLessons();
  }

  function filterLessons() {
    const lessonType = $USER_OBJ.lesson_type;
    const difficulty = $USER_OBJ.difficulty;
    LESSONS.setFilteredLessons(lessonType, difficulty);
  }

  onMount(async () => {
    if (!$LESSONS.all_lessons.length) {
      getLessons();
    } else {
      filterLessons();
    }
  });
</script>

{#if lessonIndex == -1}
  <div class="container">
    <div class="inner">
      <h1>Lesson Select</h1>

      {#if !$LESSONS.filtered_lessons.length}
        <Loading text="Loading Lessons...." />
      {:else}
        <p>Select a lesson.</p>
        <LessonList
          on:lessonSelect={selectLesson}
          lessons={$LESSONS.filtered_lessons} />

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
    lesson={$LESSONS.filtered_lessons[lessonIndex]} />
{/if}
