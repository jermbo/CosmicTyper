<script>
  import { TextArea } from "../common-ui";
  import { createEventDispatcher } from "svelte";
  import { LESSON_TYPES } from "../../utils";

  export let step = {};
  export let index = 0;

  $: weird = step.action.join("\n");

  function codeLesson(e) {
    const target = e.target;
    const val = target.value.split("\n");
    const stepIndex = +target.dataset.index;
    step.action = val;
  }
</script>

<div class="field">
  <label class="label">Step Description</label>
  <div class="control">
    <input
      class="input"
      type="text"
      bind:value={step.desc}
      placeholder="Lesson Name" />
  </div>
</div>

<div class="field">
  <label class="label">Type</label>
  <div class="control">
    <div class="select">
      <select bind:value={step.type}>
        <option value="">Select Option</option>
        {#each LESSON_TYPES as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
    </div>
  </div>
</div>

<div class="control">
  <label class="label">Lesson Steps</label>
  <TextArea
    class="textarea"
    type="textarea"
    rows="8"
    name="typingLesson"
    id="typingLesson"
    bind:value={weird}
    on:input={codeLesson} />
</div>
