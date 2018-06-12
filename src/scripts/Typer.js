console.clear();
const Typer = function(items) {
  const modifiers = ["CapsLock", "Shift", "Control", "Alt"];
  const descDisplay = document.querySelector(".description");
  const wordDisplay = document.querySelector(".characters");
  const htmlOutput = document.querySelector(".htmlOutput");
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
    spans[currentCharacter].classList.add("current");
    descDisplay.innerText = list[index].desc;
  }

  function typing(e) {
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
    }
  }

  function isModifier(key) {
    return modifiers.some(mod => mod == key);
  }

  function renderHTML() {
    htmlOutput.innerHTML += list[index].final;
  }

  function renderStyles() {
    htmlStyle.innerHTML += list[index].final;
  }

  function goToNextLesson() {
    alert("This lesson is over. Click the back button and pick a next lesson.");
  }

  init();
};
