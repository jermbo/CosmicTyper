<script>
  export let code = "";
  let userKey = "";
  let currentRow = 0;
  let currentChar = 0;
  let codeOutput = code.map(c => c.split(""));

  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];

  function handleKeydown(e) {
    e.preventDefault();
    const key = e.key;
    if (isModifier(key)) {
      return;
    }
    userKey = key;
    if (key == codeOutput[currentRow][currentChar]) {
      if (currentChar >= codeOutput[currentRow].length - 1) {
        currentRow++;
        currentChar = -1;
      }

      currentChar++;

      if (currentRow > codeOutput.length - 1) {
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
  p {
    margin: 0;
    margin-bottom: 10px;
  }
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

  .parent {
    background: yellow;
    width: 40vw;
    height: 100vh;
  }

  .row {
    min-height: 25px;
    display: flex;
    flex-wrap: wrap;
    font-family: "Roboto Mono", monospace;
  }

  .character {
    padding: 0;
    min-width: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<svelte:window on:keydown={handleKeydown} />
<div class="parent">
  <p>UserKey: {userKey}</p>
  {#each codeOutput as row, outer}
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
