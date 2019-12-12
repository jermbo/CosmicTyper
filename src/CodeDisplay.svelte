<script>
  import { HTML_CODE, CSS_CODE } from "./stores/CodeState.js";

  let cssCode;
  CSS_CODE.subscribe(code => {
    cssCode = code;
  });

  let htmlCode;
  HTML_CODE.subscribe(code => {
    console.log(code);
    htmlCode = code;
  });

  let toggle = false;

  let tabFocus = "html";

  function focusTab(tab) {
    tabFocus = tab;
  }
</script>

<div class="code-display" class:hidden={toggle}>
  <div class="tabs">
    <div class="tab-group">
      <button
        on:click={() => focusTab('html')}
        class="tab"
        class:focus={tabFocus == 'html'}>
        HTML
      </button>
      <button
        on:click={() => focusTab('css')}
        class="tab"
        class:focus={tabFocus == 'css'}>
        CSS
      </button>
    </div>

    <button on:click={() => (toggle = !toggle)} class="tab">Toggle</button>
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
