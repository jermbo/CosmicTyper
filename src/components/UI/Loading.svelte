<script>
  export let text = "Loading...".split("");
</script>

<div class="loading">
  {#each text as t}
    <span>{t}</span>
  {/each}
</div>
