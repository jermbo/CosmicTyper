import { writable } from "svelte/store";

const state = {
  webLessons: writable([]),
  typingLessons: writable([]),
};

const getWebLessons = (lessons) => {
  const sorted = sortOnDifficulty(lessons);
  state.webLessons.update((old) => sorted);
};

const getTypingLessons = (lessons) => {
  const sorted = sortOnDifficulty(lessons);
  state.typingLessons.update((old) => sorted);
};

function sortOnDifficulty(lessons) {
  return lessons.sort((a, b) => (a.difficulty > b.difficulty ? 1 : -1));
}
export { state, getWebLessons, getTypingLessons };
