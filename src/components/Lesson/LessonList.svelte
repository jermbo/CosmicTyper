<script>
  // Life Cycle
  import { createEventDispatcher } from "svelte";

  // Props - Imports
  export let lessons = [];

  // Local Variables
  const dispatch = createEventDispatcher();

  function selectLesson(index) {
    dispatch("lessonSelect", index);
  }
</script>

<div class="lessons-select">
  {#each lessons as lesson, index}
    <button class="btn" on:click|preventDefault={() => selectLesson(index)}>
      {lesson.title}
    </button>
  {/each}
</div>
