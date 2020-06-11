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
<div class="container">
  <section class="page-container">
    <header class="page">
      <h1 class="page__title">Typing Lessons</h1>
      <p class="page__desc">
        In this section, you can work on your general typing skills.
      </p>
    </header>
    {#if $typingLessons.length}
      <LessonsList baseURL="typing-lessons" lessons={$typingLessons} />
    {/if}
  </section>
</div>
