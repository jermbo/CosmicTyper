<script>
  // Life Cycle
  import { onMount, createEventDispatcher } from "svelte";

  // Props - Imports
  export let lesson = null;

  // Local Varialbes
  const dispatch = createEventDispatcher();

  let currentLesson = 0;
  let currentChar = 0;
  let actionOutput = [];
  let lessonOver = false;

  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];

  $: if (lesson) {
    getLesson();
  }

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

  function endLesson() {
    currentLesson = 0;
    currentChar = 0;
    dispatch("sectionFinished");
  }

  function lessonNav() {
    currentLesson++;
    if (endOfLesson()) {
      lessonOver = true;
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
</div>
