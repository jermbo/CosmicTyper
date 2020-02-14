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
    // alert("all done");
    dispatch("sectionFinished");
  }

  function backToSelect() {}
</script>

<div class="code-gui">
  <div class="code-view">
    <Typer on:endLesson={onLessonEnded} {lesson} />
  </div>
  <div class="render-view">
    <HTMLOutput />
  </div>
  <div class="mini-maps">
    <CodeOutput />
  </div>
  <div class="lesson-nav">
    <button on:click|preventDefault={() => onLessonEnded()} class="btn">
      Back to Lesson Select
    </button>
  </div>
</div>
