<script>
  import { onMount } from "svelte";
  import { LessonsList } from "../../components";
  import { state, getWebLessonsAction } from "../../store";
  import { _ } from "svelte-i18n";

  const { webLessons } = state;

  onMount(async () => {
    if (!$webLessons.length) {
      await getWebLessonsAction();
    }
  });
</script>

<!-- routify:options name="web-lessons" -->
<div class="page">
  <div class="page-header">
    <div class="page-header__info">
      <h1 class="page__title">
        {$_(`page.web-lessons.page_heading`, { default: 'Web Lessons' })}
      </h1>
      <p class="page__subtitle">
        {$_(`page.web-lessons.description`, { default: 'Web Lessons' })}
      </p>
    </div>
  </div>

  <div class="page-body">
    {#if $webLessons.length}
      <LessonsList baseURL="web-lessons" lessons={$webLessons} />
    {/if}
  </div>
</div>
