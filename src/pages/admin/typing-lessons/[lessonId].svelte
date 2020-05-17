<script>
  import { onMount } from "svelte";
  import { state } from "../../../store";
  import { unslugify } from "../../../utils";
  import { url, goto, params } from "@sveltech/routify";
  import axios from "axios";

  import { AdminTypingSteps } from "../../../components";
  import { CodeBlock } from "../../../components/common-ui";

  import { DIFFICULTY_TYPES } from "../../../utils";

  const { typingLessons, adminUser } = state;
  const { lessonId } = $params;

  let editingLesson = {};

  function findLesson() {
    const title = unslugify(lessonId);
    editingLesson = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$typingLessons.length) {
      $goto("typing-lessons-admin");
    }

    if ($params.lessonId != "new") {
      findLesson();
    }
  });

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
      $goto("typing-lessons-admin");
    } catch (err) {
      console.log(err.response.data.data.errors);
    }
  }
</script>

<!-- routify:options name="typing-lesson-single-admin" -->
{#if editingLesson}
  <header>
    <a class="button is-small is-info" href={$url('typing-lessons-admin')}>
      Back
    </a>
    <div class="level">
      <h1 class="is-size-3">{editingLesson.title}</h1>
      {#if editingLesson.id}
        <a
          class="button is-small is-success"
          href={null}
          on:click|preventDefault={updateLesson}>
          Update lesson
        </a>

        <a
          class="button is-small is-danger"
          href={null}
          on:click|preventDefault={deleteLesson}>
          Delete lesson
        </a>
      {:else}
        <a
          class="button is-small is-success"
          href={null}
          on:click|preventDefault={addLesson}>
          Add Lesson
        </a>
      {/if}

    </div>
  </header>
  <div class="columns">
    <div class="column is-half">
      <div class="field">
        <label class="label">Lesson Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            bind:value={editingLesson.title}
            placeholder="Lesson Name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Difficulty</label>
        <div class="control">
          <div class="select">
            <select bind:value={editingLesson.difficulty}>
              <option value="">Select Option</option>
              {#each DIFFICULTY_TYPES as type}
                <option value={type}>{type}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>

      <AdminTypingSteps bind:steps={editingLesson.steps} />
    </div>
    <div class="column is-half">
      <p>Raw Data</p>
      <CodeBlock data={editingLesson} />
    </div>
  </div>
{/if}
