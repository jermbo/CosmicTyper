<script>
  import { onMount } from "svelte";
  import { state } from "../../../../store";
  import { url, goto, params } from "@sveltech/routify";

  import { AdminTypingLessonEdit } from "../../../../components";

  const { typingLessons } = state;
  const { lessonId } = $params;

  let lessonData = null;

  function findLesson() {
    const title = lessonId
      .split("_")
      .join(" ")
      .toLowerCase();
    lessonData = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$typingLessons.length) {
      $goto("/admin/typing-lessons");
    }
    findLesson();
  });
</script>

<!-- routify:options name="admin-typing-lesson-single" -->
{#if lessonData}
  <div class="container">
    <header>
      <a class="button is-small is-info" href={$url('admin-typing-lessons')}>
        Back
      </a>
      <div class="level">
        <h1 class="is-size-3">{lessonData.title}</h1>
        <a class="button is-small is-success" href={$url(`${lessonId}/edit`)}>
          Save
        </a>
      </div>
    </header>
    <AdminTypingLessonEdit {lessonData} />
  </div>
{/if}
