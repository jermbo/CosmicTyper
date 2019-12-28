<script>
  // Life Cycle
  import { onMount } from "svelte";

  // Components
  import Loading from "UI/Loading.svelte";

  // Stores
  import { APP_STATE } from "Stores/AppState.js";
  import { USER_OBJ } from "Stores/UserState.js";

  // Helpers and Enums
  import { getLsItem, setLsItem } from "Scripts/LocalStorageHelper.js";
  import { LSKeyEnums, AppStateEnums } from "Scripts/enum.js";
  import SimulateLoadTime from "Scripts/SimulateLoadTime.js";

  // Eventually this will come from database
  import welcomeQuestions from "Data/welcomeQuestions.js";

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
    updateState(AppStateEnums.lessonSelect);
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
      updateState(AppStateEnums.lessonSelect);
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

    {#if appState == AppStateEnums.appStart}
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
