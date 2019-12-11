<script>
  export let lessons;

  let currentLesson = 0;
  let currentRow = 0;
  let currentChar = 0;
  let codeOutput;

  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];
  getLesson();
  function getLesson() {
    codeOutput = lessons[currentLesson].code.map(c => c.split(""));
  }

  function handleKeydown(e) {
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
        lessonNav("next");
      }
    }
  }

  function isModifier(key) {
    return modifiers.some(mod => mod == key);
  }

  function lessonNav(direction) {
    if (direction == "prev") {
      currentLesson = currentLesson <= 0 ? 0 : --currentLesson;
    } else if (direction == "next") {
      currentLesson =
        currentLesson >= lessons.length - 1
          ? lessons.length - 1
          : ++currentLesson;
    }

    getLesson();
  }
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />

<div class="lesson-wrapper">
  <div class="lesson">
    <h1 class="lesson__title">Lesson:</h1>
    <p class="lesson__desc">{lessons[currentLesson].desc}</p>
    {#if currentLesson > 0}
      <button on:click={() => lessonNav('prev')}>Prev {currentLesson}</button>
    {/if}
    {#if currentLesson < lessons.length - 1}
      <button on:click={() => lessonNav('next')}>
        Next {currentLesson + 2}
      </button>
    {/if}
  </div>

  <div class="code">
    {#each codeOutput as row, outer}
      <div
        class="row"
        class:completeRow={currentRow > outer}
        class:currentRow={currentRow == outer}>
        {#each row as char, inner}
          <span
            data-id={`${outer}-${inner}`}
            data-char={char}
            class="character"
            class:complete={currentRow > outer}
            class:correct={currentRow == outer && currentChar > inner}
            class:cursor={currentRow == outer && currentChar == inner}>
            {char}
          </span>
        {/each}
      </div>
    {/each}
  </div>

</div>
