<script>
  // Life Cycle
  import { onMount, createEventDispatcher } from "svelte";

  // Components
  import Typer from "./Typer.svelte";
  import HTMLOutput from "./HTMLOutput.svelte";
  import CodeOutput from "./CodeOutput.svelte";

  // Props - Imports
  export let lesson = null;

  // Local Variables
  const dispatch = createEventDispatcher();

  onMount(() => {
    if (lesson) {
      console.log(lesson);
    }
  });

  function onLessonEnded() {
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
</div>
