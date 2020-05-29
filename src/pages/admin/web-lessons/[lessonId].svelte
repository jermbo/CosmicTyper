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
      findLesson();
    }
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
      id: newId,
    };
    lessonDup.steps = [...oldSteps, newStep];

    const oldErrors = stepErrors || [];
    stepErrors = [...oldErrors, { id: newId, hasErrors: true }];
    console.log(stepErrors);
  }

  function deleteStep({ detail }) {
    const { index } = detail;
    console.log(index);
    const otherSteps = lessonDup.steps.filter((step, i) => i !== index);
    lessonDup.steps = [...otherSteps];
    console.log(lessonDup.steps);

    const otherErrors = stepErrors.filter((step, i) => i !== index);
    stepErrors = [...otherErrors];
    console.log(stepErrors);
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
  $: isValid = !errors.title && !errors.steps && !errors.childres;
  $: stepErrors = [];

  // TODO: figure out why steps is not validating properly.
  $: errors = {
    title: !lessonDup.title ? "Title is required" : "",
    steps: lessonDup.steps && !lessonDup.steps ? "Need lesson steps" : "",
    children: stepErrors.some((c) => c.hasErrors)
      ? "Need to correct all step validation issues"
      : "",
  };
  $: console.log(!lessonDup.steps);
  $: console.log(!errors.steps);
</script>

<!-- routify:options name="web-lesson-single-admin" -->
{#if lessonDup}
  <header>
    <a class="button is-small is-info" href={$url('web-lessons-admin')}>Back</a>
    <div class="level">
      <h1 class="is-size-3">{lessonDup.title || 'The Lesson'}</h1>
      <div class="actions">
        {#if lessonDup.id}
          <button
            class="button is-small is-primary"
            on:click|preventDefault={updateLesson}
            disabled={!isValid}>
            Update lesson
          </button>
          <button
            class="button is-small is-danger is-outlined"
            href={null}
            on:click|preventDefault={deleteLesson}>
            Delete lesson
          </button>
        {:else}
          <button
            class="button is-small is-primary"
            href={null}
            on:click|preventDefault={addLesson}
            disabled={!isValid}>
            Add Lesson
          </button>
        {/if}
      </div>
    </div>
  </header>

  <div class="columns">
    <div class="column is-half">
      <div class="field">
        <label class="label">Lesson Title</label>
        <div class="control">
          <input
            class="input"
            class:is-danger={errors.title}
            type="text"
            bind:value={lessonDup.title}
            placeholder="Lesson Title" />
        </div>
        {#if errors.title}
          <p class="help is-danger">{errors.title}</p>
        {/if}
      </div>

      <div class="field">
        <label class="label">Difficulty</label>
        <div class="control">
          <div class="select">
            <select bind:value={lessonDup.difficulty}>
              {#each DIFFICULTY_TYPES as type}
                <option value={type}>{type}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>

      <button class="button is-primary" on:click={addStep}>Add New Step</button>
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
    <div class="column is-half">
      <div class="sticky">
        <p>Raw Data</p>
        <CodeBlock data={lessonDup} />
      </div>
    </div>
  </div>
{/if}
