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

  let editingLesson = {};

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
    editingLesson = $webLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];

    const newValidation = editingLesson.steps.map((step) => ({
      id: step.id,
      hasErrors: false,
    }));

    stepErrors = [...newValidation];
  }

  async function updateLesson() {
    try {
      const id = editingLesson.id;
      const resp = await axios.put(
        `http://localhost:1337/web-lessons/${id}`,
        editingLesson,
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
      const id = editingLesson.id;
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
        editingLesson,
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
    const oldSteps = editingLesson.steps || [];
    const newId = oldSteps.length + 1;
    const newStep = {
      type: "",
      desc: "",
      action: [],
      id: newId,
    };
    editingLesson.steps = [...oldSteps, newStep];

    const oldErrors = stepErrors || [];
    stepErrors = [...oldErrors, { id: newId, hasErrors: true }];
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
    title: !editingLesson.title ? "Title is required" : "",
    steps: !editingLesson.steps ? "Need lesson steps" : "",
    children: stepErrors.some((c) => c.hasErrors)
      ? "Need to correct all step validation issues"
      : "",
  };
</script>

<!-- routify:options name="web-lesson-single-admin" -->
{#if editingLesson}
  <header>
    <a class="button is-small is-info" href={$url('web-lessons-admin')}>Back</a>
    <div class="level">
      <h1 class="is-size-3">{editingLesson.title || 'The Lesson'}</h1>
      <div class="actions">
        {#if editingLesson.id}
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
            bind:value={editingLesson.title}
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
            <select bind:value={editingLesson.difficulty}>
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

      {#if editingLesson.steps && editingLesson.steps.length}
        <div class="small">
          {#each editingLesson.steps as step, index}
            <HTMLStep bind:step on:validate={updateStepValidation} />
          {/each}
        </div>
      {/if}
    </div>
    <div class="column is-half">
      <div class="sticky">
        <p>Raw Data</p>
        <CodeBlock data={editingLesson} />
      </div>
    </div>
  </div>
{/if}
