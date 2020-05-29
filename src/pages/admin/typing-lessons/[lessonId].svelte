<script>
  import { onMount } from "svelte";
  import { state } from "../../../store";
  import { addTypingLesson, deleteTypingLesson } from "../../../store";
  import { unslugify } from "../../../utils";
  import { url, goto, params } from "@sveltech/routify";
  import axios from "axios";

  import { AdminTypingSteps } from "../../../components";
  import { CodeBlock } from "../../../components/common-ui";

  import { DIFFICULTY_TYPES } from "../../../utils";

  const { typingLessons, adminUser } = state;
  const { lessonId } = $params;

  let editingLesson = {};

  onMount(() => {
    if (!$typingLessons.length) {
      return $goto("typing-lessons-admin");
    }

    if ($params.lessonId != "new") {
      findLesson();
    }
  });

  function findLesson() {
    const title = unslugify(lessonId);
    editingLesson = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  async function updateLesson() {
    try {
      const id = editingLesson.id;
      const resp = await axios.put(
        `http://localhost:1337/typing-lessons/${id}`,
        editingLesson,
        {
          headers: { Authorization: `Bearer ${$adminUser.token}` },
        },
      );
      const data = await resp.data;
      $goto("typing-lessons-admin");
    } catch (err) {
      console.log(err.response.data.data.errors);
    }
  }

  async function deleteLesson() {
    try {
      const id = editingLesson.id;
      const resp = await axios.delete(
        `http://localhost:1337/typing-lessons/${id}`,
        {
          headers: { Authorization: `Bearer ${$adminUser.token}` },
        },
      );
      const data = await resp.data;
      deleteTypingLesson(id);
      $goto("typing-lessons-admin");
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function addLesson() {
    try {
      const resp = await axios.post(
        `http://localhost:1337/typing-lessons/`,
        editingLesson,
        {
          headers: { Authorization: `Bearer ${$adminUser.token}` },
        },
      );
      const data = await resp.data;
      addTypingLesson(data);
      $goto("typing-lessons-admin");
    } catch (err) {
      console.log(err.response.data.data.errors);
    }
  }

  // Simple Custom Form Validation
  $: isValid = !errors.title && !errors.steps && !errors.emptyLines;
  $: errors = {
    title: !editingLesson.title ? "Title is required" : "",
    steps:
      editingLesson.steps && editingLesson.steps.length - 2 < 0
        ? "Need at lest 2 steps in a lesson"
        : "",
    emptyLines:
      editingLesson.steps && editingLesson.steps.some((step) => !step.length)
        ? "There can not be any empty lines"
        : "",
  };
</script>

<!-- routify:options name="typing-lesson-single-admin" -->
{#if editingLesson}
  <header>
    <a class="button is-small is-info" href={$url('typing-lessons-admin')}>
      Back
    </a>
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

      <AdminTypingSteps
        bind:steps={editingLesson.steps}
        stepError={errors.steps}
        emptyLines={errors.emptyLines} />
    </div>
    <div class="column is-half">
      <p>Raw Data</p>
      <CodeBlock data={editingLesson} />
    </div>
  </div>
{/if}
