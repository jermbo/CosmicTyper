<script>
  import { onMount } from "svelte";
  import { state } from "../../../../store";
  import { url, goto, params } from "@sveltech/routify";

  import { AdminTypingSteps } from "../../../../components";

  const { typingLessons } = state;
  const { lessonId } = $params;
  const DIFFICULTY_TYPES = ["easy", "medium", "hard"];

  let editingLesson = {};

  function findLesson() {
    const title = lessonId
      .split("_")
      .join(" ")
      .toLowerCase();
    editingLesson = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$typingLessons.length) {
      $goto("/admin/typing-lessons");
    }
    findLesson();
  });
</script>

<!-- routify:options name="admin-typing-lesson-single" -->
{#if editingLesson}
  <div class="container">
    <header>
      <a class="button is-small is-info" href={$url('admin-typing-lessons')}>
        Back
      </a>
      <div class="level">
        <h1 class="is-size-3">{editingLesson.title}</h1>
        <a class="button is-small is-success" href={$url(`${lessonId}/edit`)}>
          Save
        </a>
      </div>
    </header>

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

      <AdminTypingSteps bind:steps={editingLesson.steps} />
    </div>
  </div>

  <pre>{JSON.stringify(editingLesson, null, 2)}</pre>
{/if}
