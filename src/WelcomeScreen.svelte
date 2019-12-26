<script>
  import { STATE } from "./stores/AppState.js";
  import welcomeQuestions from "./data/welcomeQuestions.js";

  $: qIndex = 0;
  const rightNow = Date.now();
  // Setting Threshold to 18 hours.
  const resetThreshold = 5000; // 1000 * 60 * 60 * 18;

  let userObj = JSON.parse(localStorage.getItem("userObj")) || {
    lesson: "html-css",
    level: "easy"
  };

  if (rightNow - userObj.time < resetThreshold) {
    STATE.update(() => "LESSON_SELECT");
  } else {
    resetUserData();
  }

  function resetUserData() {
    localStorage.clear("userObj");
  }

  function answerQuestion({ key, type }) {
    userObj[key] = type;
  }

  function submitAnswers() {
    userObj.time = Date.now();
    localStorage.setItem("userObj", JSON.stringify(userObj));
    console.log(JSON.parse(localStorage.getItem("userObj")));
    STATE.update(() => "LESSON_SELECT");
  }
</script>

<div class="container">
  <h1>Welcome To Typer</h1>
  <p>Please answer a couple of questions before we get started.</p>

  <section class="question">
    <h1 class="question__title">{welcomeQuestions[qIndex].question}</h1>
    {#each welcomeQuestions[qIndex].possibleAnswers as answer}
      <button on:click={() => answerQuestion(answer.action)}>
        {answer.label}
      </button>
    {/each}
  </section>

  {#if qIndex < welcomeQuestions.length - 1}
    <button on:click={() => qIndex++}>Next</button>
  {:else if qIndex > 0 && qIndex < welcomeQuestions.length - 1}
    <button on:click={() => qIndex--}>Previous</button>
    <button on:click={() => qIndex++}>Next</button>
  {:else}
    <button on:click={() => qIndex--}>Previous</button>
    <button on:click={() => submitAnswers()}>Submit</button>
  {/if}
</div>
