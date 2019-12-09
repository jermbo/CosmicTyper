/**
 * VERSION: 1.0.0
 * DATE: 2018-06-05
 *
 * @author: Jeremy "Jermbo" Lawson
 */

const Typer = function(items) {
  console.clear();
  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];
  const descDisplay = document.querySelector(".description");
  const wordDisplay = document.querySelector(".characters");
  const htmlOutput = document.querySelector(".htmlOutput");
  const codeOutput = document.querySelector(".codeOutput");
  const htmlStyle = document.querySelector(".htmlStyle");
  const nextBtn = document.querySelector(".nextBtn");
  const list = [];
  let index = -1;
  let currentCharacter = 0;
  let spans;

  function init() {
    list.push(...items);
    addEventListeners();
    resetUI();
    getNextItem();
  }

  function addEventListeners() {
    document.addEventListener("keydown", typing);
    nextBtn.addEventListener("click", getNextItem);
    wordDisplay.addEventListener("animationend", animationEnd);
  }

  function animationEnd(e) {
    this.classList.remove("error");
  }

  function resetUI() {
    nextBtn.style.display = "none";
    wordDisplay.innerHTML = "";
    currentCharacter = 0;
  }

  function getNextItem(e) {
    if (e) {
      e.preventDefault();
    }
    resetUI();

    if (index >= list.length - 1) {
      goToNextLesson();
    } else {
      index++;
    }
    // index = index >= list.length - 1 ? 0 : index++;
    const wordArray = list[index].final.split("");
    for (let i = 0; i < wordArray.length; i++) {
      const span = document.createElement("span");
      span.classList.add("character");
      span.innerHTML = wordArray[i];
      wordDisplay.appendChild(span);
    }
    spans = document.querySelectorAll(".character");
    if (spans.length !== 0) {
      spans[currentCharacter].classList.add("current");
    }
    descDisplay.innerText = list[index].desc;
  }

  function typing(e) {
    // prevent scrolling to page end when spacebar pressed
    e.preventDefault();
    const key = e.key;
    if (isModifier(key)) {
      return;
    }

    if (key != "Enter" && key == spans[currentCharacter].innerText) {
      spans[currentCharacter].classList.remove("current");
      spans[currentCharacter].classList.add("correct");
      currentCharacter++;
      if (currentCharacter != spans.length) {
        spans[currentCharacter].classList.add("current");
      }
    } else {
      wordDisplay.classList.add("error");
    }

    if (currentCharacter >= spans.length) {
      if (key == "Enter") {
        getNextItem();
        return;
      }

      nextBtn.style.display = "block";
      if (!list[index].render) {
        return;
      }
      if (list[index].type == "dom") {
        renderHTML();
      } else {
        renderStyles();
      }
      renderCode();
    }
  }

  function isModifier(key) {
    return modifiers.some(mod => mod == key);
  }
  function renderCode() {
    // Create and append <div><code>Text</code></div>
    // TODO? https://blog.codepen.io/documentation/prefill-embeds/
    const codeDiv = document.createElement("div");
    const codeNode = document.createElement("code");
    codeDiv.appendChild(codeNode);
    codeNode.innerText = list[index].final;
    codeOutput.appendChild(codeDiv);
  }

  function renderHTML() {
    let html = list[index].final;
    html.replace('<a ', '<a target="_blank" ');
    htmlOutput.innerHTML += html;
  }

  function renderStyles() {
    htmlStyle.innerHTML += list[index].final;
  }

  function goToNextLesson() {
    alert("This lesson is over. Click the back button and pick a next lesson.");
  }

  init();
};
