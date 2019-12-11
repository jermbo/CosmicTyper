<script>
  import { createEventDispatcher } from "svelte";
  import Typer from "./Typer.svelte";
  import CodeDisplay from "./CodeDisplay.svelte";

  export let lesson;
  const dispatch = createEventDispatcher();

  function backToLessonSelect() {
    dispatch("backToLessonSelect");
  }
</script>

<Typer {lesson} />
<!-- <HTMLRender /> -->
<CodeDisplay />
<!-- <button on:click={() => backToLessonSelect()}>Select New Lesson</button> -->
