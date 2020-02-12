<script>
  import { createEventDispatcher } from "svelte";

  import { HTML_CODE, CSS_CODE } from "Stores/CodeState.js";

  export let lesson;

  let currentLesson = 0;
  let currentRow = 0;
  let currentChar = 0;
  let actionOutput;

  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];
  getLesson();

  function getLesson() {
    actionOutput = lesson.steps[currentLesson].action.map((c) => c.split(""));
  }

  function handleKeydown(e) {
    const key = e.key;
    if (isModifier(key)) {
      return;
    }

    if (key == actionOutput[currentRow][currentChar]) {
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
    return currentChar >= actionOutput[currentRow].length - 1;
  }

  function endOfStep() {
    return currentRow > actionOutput.length - 1;
  }

  function endOfLesson() {
    return currentLesson > lesson.steps.length - 1;
  }

  function isModifier(key) {
    return modifiers.some((mod) => mod == key);
  }

  const dispatch = createEventDispatcher();

  function endLesson(index) {
    dispatch("endLesson", index);
  }

  function lessonNav(direction) {
    updateRenderView();

    const len = lesson.length - 1;
    currentLesson = currentLesson >= len ? len : ++currentLesson;

    if (endOfLesson()) {
      endLesson();
      currentLesson = 0;
      currentRow = 0;
      currentChar = 0;

      resetRenderView();
    } else {
      getLesson();
    }
  }

  function updateRenderView() {
    if (!lesson.steps[currentLesson].render) {
      return;
    }

    const type = lesson.steps[currentLesson].type;
    if (type == "dom") {
      HTML_CODE.update((code) => {
        code.push(...lesson.steps[currentLesson].action);
        return code;
      });
    } else if (type == "style") {
      CSS_CODE.update((code) => {
        code.push(...lesson.steps[currentLesson].action);
        return code;
      });
    }
  }

  function resetRenderView() {
    HTML_CODE.update((code) => []);
    CSS_CODE.update((code) => []);
  }
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />

<div class="code-container">

  <div class="code-lesson">
    <h1 class="code-lesson__title">Lesson:</h1>
    <p class="code-lesson__desc">{lesson.steps[currentLesson].desc}</p>
  </div>

  <div class="code-block">
    {#each actionOutput as row, outer}
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
