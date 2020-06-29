<script>
  import { onMount } from "svelte";
  import { state } from "../../../store";
  import { addWebLesson, deleteWebLesson } from "../../../store";
  import { unslugify } from "../../../utils";
  import { url, goto, params } from "@sveltech/routify";
  import axios from "axios";

  import { AdminTypingSteps } from "../../../components";
  import { CodeBlock } from "../../../components/common-ui";
  import HTMLStep from "../../../components/Admin/HTMLStep.svelte";

  import { DIFFICULTY_TYPES } from "../../../utils";

  const { webLessons, adminUser } = state;
  const { lessonId } = $params;

  let lessonDup = {};

  onMount(() => {
    if (!$webLessons.length) {
      return $goto("web-lessons-admin");
    }

    if (lessonId !== "new") {
      return findLesson();
    }

    lessonDup = {
      title: "",
      difficulty: "easy",
      steps: [],
    };
  });

  function findLesson() {
    const title = unslugify(lessonId);
    lessonDup = $webLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];

    const newValidation = lessonDup.steps.map((step) => ({
      id: step.id,
      hasErrors: false,
    }));

    stepErrors = [...newValidation];
  }

  async function updateLesson() {
    try {
      const id = lessonDup.id;
      const resp = await axios.put(
        `http://localhost:1337/web-lessons/${id}`,
        lessonDup,
        {
          headers: { Authorization: `Bearer ${$adminUser.token}` },
        },
      );
      const data = await resp.data;
      $goto("web-lessons-admin");
    } catch (err) {
      console.log(err.response.data.data.errors);
    }
  }

  async function deleteLesson() {
    try {
      const id = lessonDup.id;
      const resp = await axios.delete(
        `http://localhost:1337/web-lessons/${id}`,
        {
          headers: { Authorization: `Bearer ${$adminUser.token}` },
        },
      );
      const data = await resp.data;
      deleteWebLesson(id);
      $goto("web-lessons-admin");
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function addLesson() {
    try {
      const resp = await axios.post(
        `http://localhost:1337/web-lessons/`,
        lessonDup,
        {
          headers: { Authorization: `Bearer ${$adminUser.token}` },
        },
      );
      const data = await resp.data;
      addWebLesson(data);
      $goto("web-lessons-admin");
    } catch (err) {
      console.log(err.response.data.data.errors);
    }
  }

  function addStep() {
    const oldSteps = lessonDup.steps || [];
    const newId = oldSteps.length + 1;
    const newStep = {
      type: "",
      desc: "",
      action: [],
      render: true,
      id: newId,
    };
    lessonDup.steps = [...oldSteps, newStep];

    const oldErrors = stepErrors || [];
    stepErrors = [...oldErrors, { id: newId, hasErrors: true }];
  }

  function deleteStep({ detail }) {
    const { index } = detail;
    const otherSteps = lessonDup.steps.filter((step, i) => i !== index);
    lessonDup.steps = [...otherSteps];

    const otherErrors = stepErrors.filter((step, i) => i !== index);
    stepErrors = [...otherErrors];
  }

  function updateStepValidation({ detail }) {
    const oldErrors = stepErrors.map((step) => {
      if (step.id == detail.id) {
        step.hasErrors = detail.hasErrors;
      }
      return step;
    });
    stepErrors = [...oldErrors];
  }

  // Simple Custom Form Validation
  $: isValid = !errors.title && !errors.steps && !errors.children;
  $: stepErrors = [];
  $: errors = {
    title: !lessonDup.title ? "Title is required" : "",
    steps:
      lessonDup.steps && !lessonDup.steps.length ? "Need lesson steps" : "",
    children: stepErrors.some((c) => c.hasErrors)
      ? "Need to correct all step validation issues"
      : "",
  };
</script>

<!-- routify:options name="web-lesson-single-admin" -->
{#if lessonDup}
  <header class="page-header">
    <div class="page-header__info">
      <h1 class="page__title">{lessonDup.title || 'New Lesson'}</h1>
    </div>

    <div class="page-actions">
      {#if lessonDup.id}
        <button
          class="button"
          on:click|preventDefault={updateLesson}
          disabled={!isValid}>
          Update lesson
        </button>
        <button
          class="button"
          href={null}
          on:click|preventDefault={deleteLesson}>
          Delete lesson
        </button>
      {:else}
        <button
          class="button"
          href={null}
          on:click|preventDefault={addLesson}
          disabled={!isValid}>
          Add Lesson
        </button>
      {/if}
    </div>
  </header>

  <div class="page-body">

    <div class="admin-lesson">

      <div class="lesson-edit">
        <div class="form-field">
          <label class="label">Lesson Title</label>
          <input
            type="text"
            class="input"
            class:is-danger={errors.title}
            bind:value={lessonDup.title}
            placeholder="Lesson Title" />
          {#if errors.title}
            <p class="help is-danger">{errors.title}</p>
          {/if}
        </div>
        <!-- /form-field -->

        <div class="form-field">
          <label class="label">Difficulty</label>

          <select class="select" bind:value={lessonDup.difficulty}>
            {#each DIFFICULTY_TYPES as type}
              <option value={type}>{type}</option>
            {/each}
          </select>

        </div>
        <!-- TODO: Put Language Options Here -->

        <div class="lesson-steps">
          <p>Lesson Steps:</p>
          <button class="button" on:click={addStep}>Add New Step</button>
          {#if errors.children}
            <p class="help is-danger">{errors.children}</p>
          {/if}
          {#if errors.steps}
            <p class="help is-danger">{errors.steps}</p>
          {/if}
          {#if lessonDup.steps && lessonDup.steps.length}
            <div class="small">
              {#each lessonDup.steps as step, index}
                <HTMLStep
                  {index}
                  bind:step
                  on:validate={updateStepValidation}
                  on:removeStep={deleteStep} />
              {/each}
            </div>
          {/if}
        </div>

      </div>
      <!-- /lesson-edit -->

      <div class="lesson-raw">
        <div class="sticky">
          <label>Raw Data</label>
          <CodeBlock data={lessonDup} />
        </div>
      </div>
      <!-- /lesson-raw -->

    </div>
  </div>
{/if}
