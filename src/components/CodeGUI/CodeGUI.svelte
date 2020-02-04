<script>
  // Life Cycle
  import { createEventDispatcher } from "svelte";

  // Components
  import Typer from "./Typer.svelte";
  import HTMLOutput from "./HTMLOutput.svelte";
  import CodeOutput from "./CodeOutput.svelte";

  // Props - Imports
  export let lesson;

  // Local Variables
  const dispatch = createEventDispatcher();

  function onLessonEnded() {
    alert("all done");
    dispatch("sectionFinished");
  }
</script>

<div class="code-gui">
  <div class="lesson-area">
    <Typer on:endLesson={onLessonEnded} {lesson} />
  </div>
  <div class="output">
    <HTMLOutput />
  </div>
  <div class="mini-maps">
    <CodeOutput />
  </div>
</div>
