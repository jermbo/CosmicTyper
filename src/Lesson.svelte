<script>
  // Life Cycle
  import { createEventDispatcher } from "svelte";

  // Components
  import Typer from "./Typer.svelte";
  import HTMLRender from "./HTMLRender.svelte";
  import CodeDisplay from "./CodeDisplay.svelte";

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
