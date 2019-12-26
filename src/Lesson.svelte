<script>
  import Typer from "./Typer.svelte";
  import HTMLRender from "./HTMLRender.svelte";
  import CodeDisplay from "./CodeDisplay.svelte";

  import { STATE, CURRENT_LESSON_INDEX, LESSONS } from "./stores/AppState.js";

  export let lesson;
</script>

<Typer {lesson} />
<HTMLRender />
<CodeDisplay />
