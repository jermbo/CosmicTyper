<script>
  import { state } from "../../store";
  const { globalState } = state;
  $: showLoading = $globalState.showLoading;
</script>

{#if showLoading}
  <div class="loading-wrapper">
    <div class="loading">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
{/if}
