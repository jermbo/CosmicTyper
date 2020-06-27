<script>
  import { createEventDispatcher } from "svelte";
  import { TextArea } from "../common-ui";
  import { LESSON_TYPES } from "../../utils";

  export let step = {};
  export let index = 0;

  const dispatch = createEventDispatcher();

  $: weird = step.action.join("\n");

  function codeLesson(e) {
    const target = e.target;
    const val = target.value.split("\n");
    const stepIndex = +target.dataset.index;
    step.action = val;
  }

  function removeStep() {
    dispatch("removeStep", { index: index });
  }

  function emitThing() {
    dispatch("validate", { id: step.id, hasErrors: !isValid });
  }

  // Simple Custom Form Validation
  $: isValid =
    !errors.desc && !errors.type && !errors.action && !errors.emptyLines;
  $: if (isValid || !isValid) {
    emitThing();
  }
  $: errors = {
    desc: !step.desc ? "Description is required" : "",
    type: step.type === "" ? "Type is required" : "",
    action:
      step.action && step.action.length - 1 < 0 ? "Need lesson actions" : "",
    emptyLines:
      step.action && step.action.some((step) => !step.trim().length)
        ? "There can not be any empty lines"
        : "",
  };
</script>

<div class="field">
  <div class="level">
    <p>Lesson Step: {index + 1} (index {index})</p>
    <button class="button is-danger is-small" on:click={removeStep}>
      Delete Step
    </button>
  </div>
  <label class="label">Step Description</label>
  <div class="control">
    <input
      class="input"
      class:is-danger={errors.desc}
      type="text"
      bind:value={step.desc}
      placeholder="Lesson Description" />
  </div>
  {#if errors.desc}
    <p class="help is-danger">{errors.desc}</p>
  {/if}
</div>

<div class="field">
  <label class="label">Type</label>
  <div class="control">
    <div class="select" class:is-danger={errors.type}>
      <select bind:value={step.type}>
        <option value="">Select Option</option>
        {#each LESSON_TYPES as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
    </div>
    {#if errors.type}
      <p class="help is-danger">{errors.type}</p>
    {/if}
  </div>
</div>

<div class="field">
  <label class="class">Render</label>
  <div class="control">
    <input type="checkbox" bind:checked={step.render} />
  </div>
</div>

<div class="control">
  <label class="label">Lesson Steps</label>
  <TextArea
    class="textarea"
    error={errors.action || errors.emptyLines}
    type="textarea"
    rows="8"
    name="typingLesson"
    id="typingLesson"
    bind:value={weird}
    on:input={codeLesson} />
  {#if errors.action}
    <p class="help is-danger">{errors.action}</p>
  {/if}
  {#if errors.emptyLines}
    <p class="help is-danger">{errors.emptyLines}</p>
  {/if}
</div>
