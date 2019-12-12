<script>
  import Typer from "./Typer.svelte";
  import HTMLRender from "./HTMLRender.svelte";
  import CodeDisplay from "./CodeDisplay.svelte";

  export let lesson;
</script>

<style>
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>

<Typer {lesson} />
<HTMLRender />
<CodeDisplay />
