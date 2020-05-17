<script>
  import { TextArea } from "../common-ui";
  export let steps = [];

  $: weird = steps.join("\n");

  function typingLesson({ target }) {
    steps = target.value.split("\n");
  }
</script>

<div class="control">
  <label class="label">Lesson Steps</label>
  <TextArea
    class="textarea"
    type="textarea"
    rows="8"
    name="typingLesson"
    id="typingLesson"
    bind:value={weird}
    on:input={typingLesson} />
</div>
