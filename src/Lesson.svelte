<script>
  import Typer from "./Typer.svelte";
  import HTMLRender from "./HTMLRender.svelte";
  import CodeDisplay from "./CodeDisplay.svelte";

  export let lesson;
</script>

<Typer {lesson} />
<HTMLRender />
<CodeDisplay />
