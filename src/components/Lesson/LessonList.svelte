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

<ul class="lesson-list">
  {#each lessons as lesson, index}
    <li class="lesson-item" class:hasCompleted={lesson.hasCompleted}>
      <a
        href={null}
        class="lesson-link"
        on:click|preventDefault={() => selectLesson(index)}>
        {lesson.title}
      </a>
    </li>
  {/each}
</ul>
