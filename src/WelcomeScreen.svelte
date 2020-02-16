<script>
  // Life Cycle
  import { onMount, createEventDispatcher } from "svelte";

  // Components
  import Loading from "UI/Loading.svelte";

  // Stores
  import { APP_STATE, API_URL } from "Stores/AppState.js";
  import { USER_OBJ } from "Stores/UserState.js";
  import { WELCOME_QUESTIONS } from "Stores/WelcomeState.js";

  // Helpers and Enums
  import { setLsItem } from "Scripts/LocalStorageHelper.js";
  import { LSKeyEnums, AppStateEnums } from "Scripts/enum.js";
  import SimulateLoadTime from "Scripts/SimulateLoadTime.js";

  // Eventually this will come from database
  import TEMP_WELCOME_QUESTIONS from "Data/welcomeQuestions.js";

  // Reactive variables
  $: qIndex = 0;
  $: appState = $APP_STATE.state;

  // Local Variables
  const dispatch = createEventDispatcher();

  function answerQuestion({ key, type }) {
    USER_OBJ.change(key, type);
  }

  function submitAnswers() {
    updateState(AppStateEnums.lessonSelect);
  }

  function updateState(newState) {
    dispatch("updateState", newState);
  }

  async function getQuestions() {
    const response = await fetch(`${$API_URL}/welcomeQuestions`);
    const data = await response.json();
    WELCOME_QUESTIONS.setQuestions(data);
  }

  onMount(async () => {
    if (!$WELCOME_QUESTIONS.length) {
      getQuestions();
    }
  });
</script>

<div class="center-wrapper">
  <div class="inner">
    <h1>Welcome To Typer</h1>
    {#if !$WELCOME_QUESTIONS.length}
      <Loading />
    {:else}
      <p>Please answer a couple of questions before we get started.</p>

      <section class="question">
        <h1 class="question__title">{$WELCOME_QUESTIONS[qIndex].question}</h1>
        {#each $WELCOME_QUESTIONS[qIndex].possible_answers as answer}
          <button
            class="btn"
            class:selected={answer.action.type == $USER_OBJ[answer.action.key]}
            on:click={() => answerQuestion(answer.action)}>
            {answer.label}
          </button>
        {/each}
      </section>

      <div class="btns">
        {#if qIndex < $WELCOME_QUESTIONS.length - 1}
          <button class="btn" on:click={() => qIndex++}>Next</button>
        {:else if qIndex > 0 && qIndex < $WELCOME_QUESTIONS.length - 1}
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
