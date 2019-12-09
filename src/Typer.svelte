<script>
  export let text = "";
  let userKey = "";
  let current = 0;
  let characters = text.split("");
  console.log(text);
  console.log(characters);

  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];

  function handleKeydown(e) {
    e.preventDefault();
    const key = e.key;
    if (isModifier(key)) {
      return;
    }
    userKey = key;
    if (key == characters[current]) {
      current++;
    }
  }

  function isModifier(key) {
    return modifiers.some(mod => mod == key);
  }
</script>

<style>
  .current {
    background: goldenrod;
  }
  .correct {
    background: lightblue;
  }
</style>

<svelte:window on:keydown={handleKeydown} />
<p>UserKey: {userKey}</p>
<div>
  {#each characters as char, index}
    <span
      data-id={index}
      data-char={char}
      class="character"
      class:correct={current > index}
      class:current={current == index}>
      {char}
    </span>
  {/each}
</div>
