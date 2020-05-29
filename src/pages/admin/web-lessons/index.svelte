<script>
  import { onMount } from "svelte";
  import { AdminLessonsList } from "../../../components";
  import { state, getWebLessonsAction } from "../../../store";
  import { goto } from "@sveltech/routify";

  const { webLessons } = state;

  onMount(async () => {
    if (!$webLessons.length) {
      await getWebLessonsAction();
    }
  });
</script>

<!-- routify:options name="web-lessons-admin" -->
<div class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Web Lessons Admin</h1>
    <button
      on:click={$goto('web-lesson-single-admin', { lessonId: 'new' })}
      class="button is-primary">
      Add New
    </button>
  </header>

  <AdminLessonsList lessons={$webLessons} />
</div>
