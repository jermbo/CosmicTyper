<script>
  import { onMount } from "svelte";
  import { state } from "../store";
  import { navigate } from "svelte-routing";
  import { updateTypingLesson } from "../store";

  import TypingGUI from "./TypingGUI/TypingGUI.svelte";

  const { typingLessons } = state;

  export let id = "";
  let specificLesson = null;

  function findLesson() {
    const title = id
      .split("_")
      .join(" ")
      .toLowerCase();
    specificLesson = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$typingLessons.length) {
      navigate("/typing-lessons");
    }
    findLesson();
  });

  function markComplete({ detail: id }) {
    console.log("mark typing complete", id);
    updateTypingLesson(id);
    navigate("/typing-lessons");
  }
  console.log("in TypeLesson");
</script>

<div class="container">
  <TypingGUI lesson={specificLesson} on:sectionFinished={markComplete} />
</div>
