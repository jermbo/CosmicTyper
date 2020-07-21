<script>
  import { onMount } from "svelte";
  import { state } from "../../store";
  import { goto, params } from "@sveltech/routify";
  import { unslugify } from "../../utils";
  import CodeGUI from "../../components/CodeGUI/CodeGUI.svelte";

  const { webLessons } = state;
  let specificLesson = null;

  onMount(() => {
    if (!$webLessons.length) {
      $goto("web-lessons");
    }
    findLesson();
  });

  function findLesson() {
    const title = unslugify($params.lesson);
    specificLesson = $webLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  function markComplete({ detail: id }) {
    $goto("web-lessons");
  }
</script>

<CodeGUI lesson={specificLesson} on:sectionFinished={markComplete} />
