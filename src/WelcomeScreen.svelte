<script>
  // Components
  import Loading from "./Loading.svelte";

  // Stores
  import { STATE, LESSONS } from "./stores/AppState.js";
  // Data -
  import welcomeQuestions from "./data/welcomeQuestions.js";

  import welcome from "./scripts/welcome.js";

  // Local variables
  $: qIndex = 0;

  const rightNow = Date.now();
  // Setting Threshold to 18 hours.
  const resetThreshold = 5000; // 1000 * 60 * 60 * 18;
  let userObj = JSON.parse(localStorage.getItem("userObj")) || {};

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
    userObj.lesson = userObj.lesson || "html-css";
    userObj.level = userObj.level || "easy";
    userObj.time = Date.now();
    localStorage.setItem("userObj", JSON.stringify(userObj));
    STATE.update(() => "LESSON_SELECT");
  }

  // Eventually this will come from database
  import LESSONS_FROM_STORAGE from "./data/lessons.js";
  getLessons();

  $: fetchingData = true;

  async function getLessons() {
    const _lessons = await simulateDataLoad(LESSONS_FROM_STORAGE);
    localStorage.setItem("lesson", JSON.stringify(_lessons));
    LESSONS.update(() => _lessons);
    STATE.update(() => "WELCOME_SCREEN");
    localStorage.setItem("app_state", "WELCOME_SCREEN");
    fetchingData = false;
  }

  /**
   * ----------------------------------------------------
   * Simulating the wait time for loading data.
   * Eventually this will be replaced with an acutal call
   * to an api, but in the mean time I want to lay down
   * a good foundation for making the updates later.
   * ----------------------------------------------------
   *
   */
  function simulateDataLoad(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 5000);
    });
  }
</script>

<div class="container">
  <div class="inner">
    <h1>Welcome To Typer</h1>
    {#if fetchingData}
      <Loading />
    {:else}
      <p>Please answer a couple of questions before we get started.</p>

      <section class="question">
        <h1 class="question__title">{welcomeQuestions[qIndex].question}</h1>
        {#each welcomeQuestions[qIndex].possibleAnswers as answer}
          <button
            class="btn"
            class:selected={answer.action.type == userObj[answer.action.key]}
            on:click={() => answerQuestion(answer.action)}>
            {answer.label}
          </button>
        {/each}
      </section>

      <div class="btns">
        {#if qIndex < welcomeQuestions.length - 1}
          <button class="btn" on:click={() => qIndex++}>Next</button>
        {:else if qIndex > 0 && qIndex < welcomeQuestions.length - 1}
          <button class="btn -secondary" on:click={() => qIndex--}>
            Previous
          </button>
          <button class="btn" on:click={() => qIndex++}>Next</button>
        {:else}
          <button class="btn -secondary" on:click={() => qIndex--}>
            Previous
          </button>
          <button class="btn" on:click={() => submitAnswers()}>Submit</button>
        {/if}
      </div>
    {/if}

  </div>
</div>
