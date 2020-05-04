<script>
  import { onMount } from "svelte";
  import { state, updateWebLesson } from "../../store";
  import { url, goto, params } from "@sveltech/routify";
  import CodeGUI from "../../components/CodeGUI/CodeGUI.svelte";

  const { webLessons } = state;

  let specificLesson = null;

  function findLesson() {
    const title = $params.lesson
      .split("_")
      .join(" ")
      .toLowerCase();
    specificLesson = $webLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$webLessons.length) {
      $goto("/web-lessons");
    }
    findLesson();
  });

  function markComplete({ detail: id }) {
    updateWebLesson(id);
    $goto("/web-lessons");
  }
</script>

<div class="container">
  <CodeGUI lesson={specificLesson} on:sectionFinished={markComplete} />
</div>
