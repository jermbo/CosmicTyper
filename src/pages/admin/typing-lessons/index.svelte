<script>
  import { onMount } from "svelte";
  import { AdminLessonsList } from "../../../components";
  import { state, getTypingLessonsAction } from "../../../store";
  import { goto } from "@sveltech/routify";

  const { typingLessons } = state;

  onMount(async () => {
    if (!$typingLessons.length) {
      await getTypingLessonsAction();
    }
  });
</script>

<!-- routify:options name="typing-lessons-admin" -->
<header class="page-header">
  <div class="page-header__info">
    <h1 class="page__title">Typing Lessons Admin</h1>
  </div>
  <div class="page-actions">
    <button
      on:click={$goto('typing-lesson-single-admin', { lessonId: 'new' })}
      class="button is-primary">
      Add New
    </button>
  </div>
</header>
<div class="page-body">
  <AdminLessonsList baseURL="typing-lessons" lessons={$typingLessons} />
</div>
