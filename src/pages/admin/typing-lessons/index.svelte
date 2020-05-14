<script>
  import { onMount } from "svelte";
  import { AdminLessonsList } from "../../../components";
  import { state, getTypingLessonsAction } from "../../../store";

  const { typingLessons } = state;

  onMount(async () => {
    if (!$typingLessons.length) {
      await getTypingLessonsAction();
    }
  });
</script>

<!-- routify:options name="admin-typing-lessons" -->
<div class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Typing Lessons Admin</h1>
  </header>

  <AdminLessonsList baseURL="typing-lessons" lessons={$typingLessons} />
</div>
