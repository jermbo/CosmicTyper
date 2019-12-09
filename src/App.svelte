<script>
  import Typer from "./Typer.svelte";
  let key;
  let keyCode;
  let text = "<div><h1>Hello World</h1></div>";
</script>

<style>

</style>

<main>
  <Typer {text} />
</main>
