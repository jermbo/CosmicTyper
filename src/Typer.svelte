<script>
  export let text = "";
  let userKey = "";
  let currentRow = 0;
  let currentChar = 0;
  let html = text.map(t => t.split(""));
  // let html = text.split("");

  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];

  function handleKeydown(e) {
    e.preventDefault();
    const key = e.key;
    if (isModifier(key)) {
      return;
    }
    userKey = key;
    console.log(
      `current ${currentRow} / ${currentChar} =  ${html[currentRow][currentChar]}`
    );
    if (key == html[currentRow][currentChar]) {
      if (currentChar >= html[currentRow].length - 1) {
        currentRow++;
        currentChar = -1;
      }

      currentChar++;

      if (currentRow > html.length - 1) {
        currentRow = 0;
        currentChar = 0;
      }
    }
  }

  function isModifier(key) {
    return modifiers.some(mod => mod == key);
  }

  function isComplete(outer) {
    return currentRow > outer;
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700&display=swap");
  .current {
    background: goldenrod;
  }
  .complete,
  .correct {
    background: lightblue;
  }
  .currentRow {
    background: pink;
  }

  .row {
    height: 25px;
    display: flex;
    font-family: "Roboto Mono", monospace;
  }
  .character {
    padding: 0;
    min-width: 7px;
    height: 100%;
    display: block;
  }
</style>

<svelte:window on:keydown={handleKeydown} />
<p>UserKey: {userKey}</p>
<div>
  {#each html as row, outer}
    <div class="row" class:currentRow={currentRow == outer}>
      {#each row as char, inner}
        <span
          data-id={inner}
          data-char={char}
          class="character"
          class:complete={currentRow > outer}
          class:correct={currentRow == outer && currentChar > inner}
          class:current={currentRow == outer && currentChar == inner}>
          {char}
        </span>
      {/each}
    </div>
  {/each}
</div>
