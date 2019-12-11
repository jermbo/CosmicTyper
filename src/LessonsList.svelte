<script>
  import { createEventDispatcher } from "svelte";

  export let lessons;

  const dispatch = createEventDispatcher();

  function selectLesson(index) {
    dispatch("lessonSelect", { index });
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
