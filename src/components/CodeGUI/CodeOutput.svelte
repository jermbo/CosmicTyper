<script>
  import { HTML_CODE, CSS_CODE } from "../../store/code-data.js";

  let tabFocus = "html";

  function focusTab(tab) {
    tabFocus = tab;
  }
</script>

<div class="code-display">
  <div class="tabs">
    <div class="tab-group">
      <span
        on:click={() => focusTab('html')}
        class="tab"
        class:focus={tabFocus == 'html'}>
        HTML
      </span>
      <span
        on:click={() => focusTab('css')}
        class="tab"
        class:focus={tabFocus == 'css'}>
        CSS
      </span>
    </div>

  </div>
  <div class="displays">
    <pre class="display html" class:focus={tabFocus == 'html'}>
      {#each $HTML_CODE as code, index}
        <div class="display-line">{index + 1}: {code}</div>
      {/each}
    </pre>
    <pre class="display css" class:focus={tabFocus == 'css'}>
      {#each $CSS_CODE as code, index}
        <div class="display-line">{index + 1}: {code}</div>
      {/each}
    </pre>
  </div>
</div>
