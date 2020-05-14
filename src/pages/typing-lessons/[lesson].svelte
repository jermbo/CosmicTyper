<script>
  import { onMount } from "svelte";
  import { state, updateTypingLesson } from "../../store";
  import { goto, params } from "@sveltech/routify";
  import { unslugify } from "../../utils";
  import TypingGUI from "../../components/TypingGUI/TypingGUI.svelte";

  const { typingLessons } = state;
  let specificLesson = null;

  onMount(() => {
    if (!$typingLessons.length) {
      $goto("typing-lessons");
    }
    findLesson();
  });

  function findLesson() {
    const title = unslugify($params.lesson);
    specificLesson = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  function markComplete({ detail: id }) {
    updateTypingLesson(id);
    $goto("typing-lessons");
  }
</script>

<TypingGUI lesson={specificLesson} on:sectionFinished={markComplete} />
