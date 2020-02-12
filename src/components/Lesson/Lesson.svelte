<script>
  // Life Cycle
  import { createEventDispatcher } from "svelte";

  // Stores
  import { LESSONS } from "Stores/LessonsState.js";
  import { USER_OBJ } from "Stores/UserState.js";

  // Components
  import CodeGUI from "Comps/CodeGUI/CodeGUI.svelte";
  import TypingGUI from "Comps/TypingGUI/TypingGUI.svelte";

  // Props - Imports
  export let lesson;

  // Local Variables
  const dispatch = createEventDispatcher();

  $: lessonType = $USER_OBJ.lesson_type;

  function sectionFinished() {
    dispatch("sectionFinished");
  }
</script>

{#if lessonType == 'html-css'}
  <CodeGUI on:sectionFinished={sectionFinished} {lesson} />
{:else}
  <TypingGUI on:sectionFinished={sectionFinished} {lesson} />
{/if}
