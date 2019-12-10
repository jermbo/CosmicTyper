<script>
  import Typer from "./Typer.svelte";
  export let lessons;

  // let code = [
  //   "<div>",
  //   "  <h1>Hello World</h1>",
  //   "  <div>",
  //   "    <h2>Yes Yes Y'all</h2>",
  //   "  </div>",
  //   "</div>"
  // ];

  // let code = [
  //   ".parent {",
  //   "  background: red;",
  //   "  color: yellow;",
  //   "  font-family: 'Roboto', serif;",
  //   "}"
  // ];

  console.log(lessons);
</script>

<style lang="scss" global>
  @import "./styles/styles.scss";
</style>

<main>
  <Typer {lessons} />
</main>
