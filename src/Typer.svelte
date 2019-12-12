<script>
  import { createEventDispatcher } from "svelte";

  export let lesson;

  const dispatch = createEventDispatcher();

  let currentLesson = 0;
  let currentRow = 0;
  let currentChar = 0;
  let codeOutput;

  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];
  getLesson();
  function getLesson() {
    codeOutput = lesson.steps[currentLesson].code.map(c => c.split(""));
  }

  function handleKeydown(e) {
    const key = e.key;
    if (isModifier(key)) {
      return;
    }

    if (key == codeOutput[currentRow][currentChar]) {
      if (endOfRow()) {
        currentRow++;
        currentChar = -1;
      }

      currentChar++;

      if (endOfStep()) {
        currentRow = 0;
        currentChar = 0;
        lessonNav("next");
      }
    }
  }

  function endOfRow() {
    return currentChar >= codeOutput[currentRow].length - 1;
  }

  function endOfStep() {
    return currentRow > codeOutput.length - 1;
  }

  function endOfLesson() {
    return currentLesson > lesson.steps.length - 1;
  }

  function isModifier(key) {
    return modifiers.some(mod => mod == key);
  }

  function lessonNav(direction) {
    if (direction == "prev") {
      currentLesson = currentLesson <= 0 ? 0 : --currentLesson;
    } else if (direction == "next") {
      currentLesson =
        currentLesson >= lesson.length - 1
          ? lesson.length - 1
          : ++currentLesson;
    }

    if (endOfLesson()) {
      dispatch("endOfLesson");
    } else {
      getLesson();
    }
  }
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />

<div class="lesson-wrapper">
  <div class="lesson">
    <h1 class="lesson__title">Lesson:</h1>
    <p class="lesson__desc">{lesson.steps[currentLesson].desc}</p>
    {#if currentLesson > 0}
      <button on:click={() => lessonNav('prev')}>Prev Step</button>
    {/if}
    {#if currentLesson < lesson.steps.length - 1}
      <button on:click={() => lessonNav('next')}>Next Step</button>
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
