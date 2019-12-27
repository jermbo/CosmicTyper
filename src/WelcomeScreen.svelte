<script>
  // Life Cycle
  import { onMount } from "svelte";

  // Components
  import Loading from "./Loading.svelte";

  // Stores
  import { APP_STATE } from "./stores/AppState.js";
  import { USER_OBJ } from "./stores/UserState.js";

  // Helpers and Enums
  import { getLsItem, setLsItem } from "./scripts/LocalStorageHelper.js";
  import { LSKeyEnums } from "./enum.js";

  // Eventually this will come from database
  import welcomeQuestions from "./data/welcomeQuestions.js";

  // Reactive variables
  $: qIndex = 0;
  $: appState = $APP_STATE.state;

  // Local Variables
  const rightNow = Date.now();
  // Setting Threshold to 18 hours.
  const resetThreshold = 250; // 1000 * 60 * 60 * 18;

  function answerQuestion({ key, type }) {
    $USER_OBJ[key] = type;
  }

  function submitAnswers() {
    $USER_OBJ.active_time = Date.now();
    updateState("LESSON_SELECT");
  }

  function updateState(newState) {
    APP_STATE.update(obj => {
      obj.state = newState;
      return obj;
    });
    setLsItem(LSKeyEnums.state, $APP_STATE);
  }

  onMount(async () => {
    if (rightNow - $USER_OBJ.active_time > resetThreshold) {
      updateState("LESSON_SELECT");
    } else {
      // clear stuff
    }
  });
</script>

<div class="container">
  <div class="inner">
    <h1>Welcome To Typer</h1>
    {#if !appState}
      <Loading />
    {/if}

    {#if appState == 'WELCOME_SCREEN'}
      <p>Please answer a couple of questions before we get started.</p>

      <section class="question">
        <h1 class="question__title">{welcomeQuestions[qIndex].question}</h1>
        {#each welcomeQuestions[qIndex].possibleAnswers as answer}
          <button
            class="btn"
            class:selected={answer.action.type == $USER_OBJ[answer.action.key]}
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
