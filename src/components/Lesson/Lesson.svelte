<script>
  // Life Cycle
  import { createEventDispatcher } from "svelte";

  // Components
  import Typer from "Comps/Typer/Typer.svelte";
  import HTMLRender from "Comps/Typer/HTMLRender.svelte";
  import CodeDisplay from "Comps/Typer/CodeDisplay.svelte";

  // Props - Imports
  export let lesson;

  // Local Variables
  const dispatch = createEventDispatcher();

  function onLessonEnded() {
    alert("all done");
    dispatch("sectionFinished");
  }
</script>

<Typer on:endLesson={onLessonEnded} {lesson} />
<HTMLRender />
<CodeDisplay />
