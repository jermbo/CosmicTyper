<script>
  import { TextArea } from "../common-ui";
  export let stepError = null;
  export let emptyLines = null;
  export let steps = [];

  $: weird = steps.join("\n");

  function typingLesson({ target }) {
    steps = target.value.split("\n");
  }
</script>

<div class="form-field">
  <label class="label">Lesson Steps</label>
  <TextArea
    class="textarea"
    type="textarea"
    rows="20"
    name="typingLesson"
    id="typingLesson"
    bind:value={weird}
    on:input={typingLesson}
    error={stepError || emptyLines} />
  {#if stepError}
    <p class="help is-danger">{stepError}</p>
  {/if}
  {#if emptyLines}
    <p class="help is-danger">{emptyLines}</p>
  {/if}
</div>
