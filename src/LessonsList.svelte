<script>
  import { STATE, CURRENT_LESSON_INDEX } from "./stores/AppState.js";

  export let lessons = [];

  function selectLesson(index) {
    CURRENT_LESSON_INDEX.update(() => index);
    STATE.update(() => "LESSON_STARTED");
  }
</script>

<div class="container">
  <div class="inner">
    <h1>Lesson Select</h1>
    <p>Select a lesson you have not completed yet.</p>
    <div class="lessons-select">
      {#each lessons as lesson, index}
        <button class="btn" on:click|preventDefault={() => selectLesson(index)}>
          {lesson.title}
        </button>
      {/each}
    </div>
  </div>
</div>
