<script>
  // Life Cycle
  import { createEventDispatcher } from "svelte";

  // Components
  import Typer from "../Typer/Typer.svelte";
  import HTMLRender from "../Typer/HTMLRender.svelte";
  import CodeDisplay from "../Typer/CodeDisplay.svelte";

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
