<script>
  // Stores
  import { LESSONS } from "Stores/LessonsState.js";
  import { USER_OBJ } from "Stores/UserState.js";

  // Components
  import CodeGUI from "Comps/CodeGUI/CodeGUI.svelte";
  import TypingGUI from "Comps/TypingGUI/TypingGUI.svelte";

  // Props - Imports
  export let lesson;

  $: lessonType = $USER_OBJ.lesson_type;
</script>

{#if lessonType == 'html-css'}
  <CodeGUI {lesson} />
{:else}
  <TypingGUI {lesson} />
{/if}
