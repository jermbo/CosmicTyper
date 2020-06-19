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
<div class="container">
  <section class="page-container">
    <header class="page">
      <h1 class="page__title">Typing Lessons Admin</h1>
      <button
        on:click={$goto('typing-lesson-single-admin', { lessonId: 'new' })}
        class="button is-primary">
        Add New
      </button>
    </header>
    <AdminLessonsList baseURL="typing-lessons" lessons={$typingLessons} />
  </section>
</div>
