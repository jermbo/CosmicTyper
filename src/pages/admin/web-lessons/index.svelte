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
<section class="page-container">
  <header class="page">
    <h1 class="page__title">Web Lessons Admin</h1>
    <button
      on:click={$goto('web-lesson-single-admin', { lessonId: 'new' })}
      class="button">
      Add New
    </button>
  </header>
  <AdminLessonsList lessons={$webLessons} />
</section>
