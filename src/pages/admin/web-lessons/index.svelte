<script>
  import { onMount } from "svelte";
  import { AdminLessonsList } from "../../../components";
  import { state, getWebLessonsAction } from "../../../store";

  const { webLessons } = state;

  onMount(async () => await getWebLessons());

  async function getWebLessons() {
    if (!$webLessons.length) {
      await getWebLessonsAction();
    }
  }
</script>

<!-- routify:options name="admin-web-lessons" -->
<div class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Web Lessons Admin</h1>
  </header>

  <AdminLessonsList lessons={$webLessons} />
</div>
