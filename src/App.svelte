<script>
  import Typer from "./Typer.svelte";
  let key;
  let keyCode;
  // let code = [
  //   "<div>",
  //   "  <h1>Hello World</h1>",
  //   "  <div>",
  //   "    <h2>Yes Yes Y'all</h2>",
  //   "  </div>",
  //   "</div>"
  // ];

  let code = [
    ".parent {",
    "  background: red;",
    "  color: yellow;",
    "  font-family: 'Roboto', serif;",
    "}"
  ];
</script>

<style>

</style>

<main>
  <Typer {code} />
</main>
