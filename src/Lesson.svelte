<script>
  import { createEventDispatcher } from "svelte";
  import Typer from "./Typer.svelte";
  import CodeDisplay from "./CodeDisplay.svelte";

  export let lesson;
  console.log(lesson);
</script>

<style>
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>

<Typer {lesson} />
<!-- <HTMLRender /> -->
<CodeDisplay />
<!-- <button on:click={() => backToLessonSelect()}>Select New Lesson</button> -->
