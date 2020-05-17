<script>
  import { onMount } from "svelte";
  import { state } from "../../../store";
  import { unslugify } from "../../../utils";
  import { url, goto, params } from "@sveltech/routify";

  import { AdminTypingSteps } from "../../../components";
  import { CodeBlock } from "../../../components/common-ui";

  import { DIFFICULTY_TYPES } from "../../../utils";

  const { typingLessons } = state;
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
    findLesson();
  });

  function handleSave() {
    console.log("Save Web Lesson");
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
      <a class="button is-small is-success" href={handleSave}>Save</a>
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
