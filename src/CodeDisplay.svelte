<script>
  export let type = "html";
  export let newCode;

  let toggle = false;

  let tabFocus = "html";

  let html = ["<h1>Hello</h1>"];
  let css = [".h1{color:red;}"];

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
    <div class="display html" class:focus={tabFocus == 'html'}>{html}</div>
    <div class="display css" class:focus={tabFocus == 'css'}>{css}</div>
  </div>
</div>
