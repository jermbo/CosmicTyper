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
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Typing Lessons Admin</h1>
    <a
      href={null}
      on:click={$goto('typing-lesson-single-admin', { lessonId: 'new' })}
      class="button is-primary">
      Add New
    </a>
  </header>

  <AdminLessonsList baseURL="typing-lessons" lessons={$typingLessons} />
</div>
