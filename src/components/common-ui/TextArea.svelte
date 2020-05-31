<script>
  export let error = false;
  export let value = "";
  export let disabled = false;
  export let name = "";
  const { ...props } = $$props;
  const handleInput = (event) => {
    value = event.target.value;
  };
</script>

<textarea
  {...props}
  on:blur
  on:focus
  on:keydown
  on:keypress
  on:keyup
  on:change
  on:input
  bind:value
  class:is-danger={error}
  {name}
  {disabled} />
