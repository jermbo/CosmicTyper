<script>
  import { onMount } from "svelte";
  import { state, updateTypingLesson } from "../../store";
  import { goto, params } from "@sveltech/routify";
  import TypingGUI from "../../components/TypingGUI/TypingGUI.svelte";

  const { typingLessons } = state;
  let specificLesson = null;

  function findLesson() {
    const title = $params.lesson
      .split("_")
      .join(" ")
      .toLowerCase();
    specificLesson = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$typingLessons.length) {
      $goto("/typing-lessons");
    }
    findLesson();
  });

  function markComplete({ detail: id }) {
    updateTypingLesson(id);
    $goto("/typing-lessons");
  }
</script>

<div class="container">
  <TypingGUI lesson={specificLesson} on:sectionFinished={markComplete} />
</div>
