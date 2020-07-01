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
<section class="page">
  <header class="page-header">
    <div class="page-header__info">
      <h1 class="page__title">Typing Lessons</h1>
      <p class="page__subtitle">
        In this section, you can work on your general typing skills.
      </p>
    </div>
  </header>
  <div class="page-body">
    {#if $typingLessons.length}
      <LessonsList baseURL="typing-lessons" lessons={$typingLessons} />
    {/if}
  </div>
</section>
