<script>
  let startQuestions = [
    {
      question: "What would you like to practice today?",
      possibleAnswers: [
        {
          label: "HTML & CSS",
          action: {
            key: "lesson",
            type: "html-css"
          }
        },
        {
          label: "General Typing",
          action: {
            key: "lesson",
            type: "typing"
          }
        }
      ]
    },
    {
      question: "Would you like a challenge or take it easy today?",
      possibleAnswers: [
        {
          label: "Take it easy",
          action: {
            key: "level",
            type: "easy"
          }
        },
        {
          label: "Challenge Me",
          action: {
            key: "level",
            type: "hard"
          }
        }
      ]
    }
  ];

  let userObj = {
    lesson: "html-css",
    level: "easy"
  };

  $: qIndex = 0;

  function answerQuestion({ key, type }) {
    userObj[key] = type;
  }

  function submitAnswers() {
    userObj.time = Date.now();
    // console.log(new Intl.DateTimeFormat("en-US").format(userObj.time));
    localStorage.setItem("userObj", JSON.stringify(userObj));
  }
</script>

<div class="container">
  <h1>Welcome To Typer</h1>
  <p>Answer a couple of questions before we get started. {qIndex}</p>

  <section class="question">
    <h1 class="question__title">{startQuestions[qIndex].question}</h1>
    {#each startQuestions[qIndex].possibleAnswers as answer}
      <button on:click={() => answerQuestion(answer.action)}>
        {answer.label}
      </button>
    {/each}
  </section>

  {#if qIndex < startQuestions.length - 1}
    <button on:click={() => qIndex++}>Next</button>
  {:else}
    <button on:click={() => submitAnswers()}>Submit</button>
  {/if}
</div>
