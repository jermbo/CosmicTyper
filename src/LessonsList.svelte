<script>
  import { STATE, CURRENT_LESSON_INDEX } from "./stores/AppState.js";

  export let lessons;

  let lesson;
  CURRENT_LESSON_INDEX.subscribe(lessonIndex => {
    lesson = lessonIndex;
  });

  function selectLesson(index) {
    CURRENT_LESSON_INDEX.update(() => index);
    STATE.update(() => "LESSON_STARTED");
  }
</script>

<div class="lessons-select">
  {#each lessons as lesson, index}
    <button
      on:click|preventDefault={() => selectLesson(index)}
      class="lesson-btn">
      {lesson.title}
    </button>
  {/each}
</div>
