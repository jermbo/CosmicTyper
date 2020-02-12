<script>
  import { createEventDispatcher } from "svelte";
  // Props - Imports
  export let lesson;

  let currentLesson = 0;
  let currentChar = 0;
  let actionOutput;

  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];
  getLesson();

  function getLesson() {
    actionOutput = lesson.steps[currentLesson].split("");
  }

  function handleKeydown(e) {
    const key = e.key;
    if (isModifier(key)) {
      return;
    }

    if (key == actionOutput[currentChar]) {
      currentChar++;

      if (endOfStep()) {
        currentChar = 0;
        lessonNav();
      }
    }
  }

  const dispatch = createEventDispatcher();

  function endLesson() {
    // alert("all done");
    dispatch("sectionFinished");
  }

  function lessonNav() {
    // updateRenderView();
    currentLesson++;
    if (endOfLesson()) {
      endLesson();
      currentLesson = 0;
      currentChar = 0;
    } else {
      getLesson();
    }
  }

  function endOfLesson() {
    return currentLesson > lesson.steps.length - 1;
  }

  function endOfStep() {
    return currentChar > actionOutput.length - 1;
  }

  function isModifier(key) {
    return modifiers.some((mod) => mod == key);
  }
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />

<div class="typing-wrapper">
  <div class="typing-inner">
    <div class="row">
      {#each actionOutput as char, index}
        <span
          data-id={`i-${index}`}
          data-char={char}
          class="character"
          class:correct={currentChar > index}
          class:cursor={currentChar == index}>
          {char}
        </span>
      {/each}
    </div>
  </div>
  <div class="lesson-nav">
    <button on:click|preventDefault={() => onLessonEnded()} class="btn">
      Back to Lesson Select
    </button>
  </div>
</div>
