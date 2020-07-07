<script>
  import { onMount } from "svelte";
  import { state } from "../../../store";
  import { addTypingLesson, deleteTypingLesson } from "../../../store";
  import { url, goto, params } from "@sveltech/routify";
  import axios from "axios";

  import { AdminTypingSteps } from "../../../components";
  import { CodeBlock } from "../../../components/common-ui";

  import {
    DIFFICULTY_TYPES,
    LANGUAGES,
    API_URL,
    unslugify,
  } from "../../../utils";

  const { typingLessons, adminUser } = state;
  const { lessonId } = $params;

  let lessonDup = {};

  onMount(() => {
    if (!$typingLessons.length) {
      return $goto("typing-lessons-admin");
    }

    if (lessonId != "new") {
      findLesson();
    }
  });

  function findLesson() {
    const title = unslugify(lessonId);
    lessonDup = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  async function updateLesson() {
    try {
      const id = lessonDup.id;
      const resp = await axios.put(`${API_URL}/${id}`, lessonDup, {
        headers: { Authorization: `Bearer ${$adminUser.token}` },
      });
      const data = await resp.data;
      $goto("typing-lessons-admin");
    } catch (err) {
      console.log(err.response.data.data.errors);
    }
  }

  async function deleteLesson() {
    try {
      const id = lessonDup.id;
      const resp = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${$adminUser.token}` },
      });
      const data = await resp.data;
      deleteTypingLesson(id);
      $goto("typing-lessons-admin");
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function addLesson() {
    try {
      const resp = await axios.post(`${API_URL}/typing-lessons/`, lessonDup, {
        headers: { Authorization: `Bearer ${$adminUser.token}` },
      });
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
    title: !lessonDup.title ? "Title is required" : "",
    steps:
      lessonDup.steps && lessonDup.steps.length - 2 < 0
        ? "Need at lest 2 steps in a lesson"
        : "",
    emptyLines:
      lessonDup.steps && lessonDup.steps.some((step) => !step.length)
        ? "There can not be any empty lines"
        : "",
  };
</script>

<!-- routify:options name="typing-lesson-single-admin" -->
{#if lessonDup}
  <div class="page-header">
    <div class="page-header__info">
      <h1 class="page__title">{lessonDup.title || 'The Lesson'}</h1>
    </div>
    <div class="page-actions">
      <div class="page__actions">
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
  </div>

  <div class="page-body">
    <div class="admin-lesson">
      <div class="lesson-edit">

        <div class="form-field">
          <label class="label">Lesson Title</label>
          <input
            class="input"
            class:is-danger={errors.title}
            type="text"
            bind:value={lessonDup.title}
            placeholder="Lesson Title" />
          {#if errors.title}
            <p class="help is-danger">{errors.title}</p>
          {/if}
        </div>

        <div class="form-field">
          <label class="label">Difficulty</label>
          <select class="select" bind:value={lessonDup.difficulty}>
            {#each DIFFICULTY_TYPES as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>

        <div class="form-field">
          <label class="label">Language</label>

          <select class="select" bind:value={lessonDup.language}>
            {#each LANGUAGES as lang}
              <option value={lang}>{lang}</option>
            {/each}
          </select>
        </div>

        <AdminTypingSteps
          bind:steps={lessonDup.steps}
          stepError={errors.steps}
          emptyLines={errors.emptyLines} />

      </div>
      <!-- /lesson-edit -->

      <div class="lesosn-raw">
        <CodeBlock data={lessonDup} />
      </div>
      <!-- /lesson-raw-->
    </div>
  </div>
{/if}
