<script>
  import { onMount } from "svelte";
  import { LessonsList } from "../../components";
  import { state, getTypingLessonsAction } from "../../store";

  const { typingLessons } = state;

  onMount(async () => {
    if (!$typingLessons.length) {
      await getTypingLessonsAction();
    }
  });
</script>

<!-- routify:options name="typing-lessons" -->
<section class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Typing Lessons</h1>
    <p>In this section, you can work on your general typing skills.</p>
  </header>
  {#if $typingLessons.length}
    <LessonsList baseURL="typing-lessons" lessons={$typingLessons} />
  {/if}
</section>
