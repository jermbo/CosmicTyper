<script>
  const loadingDisplay = document.querySelector(".loading");
  const loadingText = "Loading...".split("");
</script>

<div class="loading">
  {#each loadingText as text}
    <span>{text}</span>
  {/each}
</div>
