<script>
  const loadingDisplay = document.querySelector(".loading");
  const loadingText = "Loading...".split("");
</script>

<div class="container">
  <h1>Welcome to Typer</h1>
  <div class="loading">
    {#each loadingText as text}
      <span>{text}</span>
    {/each}
  </div>
</div>
