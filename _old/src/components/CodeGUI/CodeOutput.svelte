<script>
  import { HTML_CODE, CSS_CODE } from "../../store/code-data.js";

  let cssCode;
  CSS_CODE.subscribe((code) => (cssCode = code));

  let htmlCode;
  HTML_CODE.subscribe((code) => (htmlCode = code));

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
      {#each htmlCode as code, index}
        <div class="display-line">{index + 1}: {code}</div>
      {/each}
    </pre>
    <pre class="display css" class:focus={tabFocus == 'css'}>
      {#each cssCode as code, index}
        <div class="display-line">{index + 1}: {code}</div>
      {/each}
    </pre>
  </div>
</div>
