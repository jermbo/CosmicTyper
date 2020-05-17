<script>
  import { onMount } from "svelte";
  import { state } from "../../../store";
  import { unslugify } from "../../../utils";
  import { url, goto, params } from "@sveltech/routify";

  import { AdminTypingSteps } from "../../../components";
  import { CodeBlock } from "../../../components/common-ui";

  import { DIFFICULTY_TYPES } from "../../../utils";

  import HTMLStep from "../../../components/Admin/HTMLStep.svelte";

  const { webLessons } = state;
  const { lessonId } = $params;

  let editingLesson = {};

  function findLesson() {
    const title = unslugify(lessonId);
    editingLesson = $webLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$webLessons.length) {
      $goto("web-lessons-admin");
    }
    findLesson();
  });

  function handleSave() {
    console.log("Save Web Lesson");
  }

  function addStep() {
    const newStep = {
      type: "",
      desc: "",
      action: [],
      render: true,
    };
    editingLesson.steps = [...editingLesson.steps, newStep];
  }
</script>

<style>
  .sticky {
    position: sticky;
    top: 60px;
  }
</style>

<!-- routify:options name="web-lesson-single-admin" -->
{#if editingLesson}
  <header>
    <a class="button is-small is-info" href={$url('web-lessons-admin')}>Back</a>
    <div class="level">
      <h1 class="is-size-3">{editingLesson.title}</h1>
      <a class="button is-small is-danger is-outlined" href={handleSave}>
        <span class="icon">
          <i class="fas fa-edit" />
        </span>
        <span>Edit</span>
      </a>
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

      <button class="button is-primary" on:click={addStep}>Add New Step</button>

      {#if editingLesson.steps && editingLesson.steps.length}
        <div class="small">
          {#each editingLesson.steps as step, index}
            <HTMLStep {index} bind:step />
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
