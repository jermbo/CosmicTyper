import { writable } from "svelte/store";
import { getLsItem, setLsItem, removeLsItem, clearAll } from "./storage-utils";
import { keyEnums } from "./enums";

const state = {
  webLessons: writable([]),
  typingLessons: writable([]),
};

const getWebLessons = (lessons) => {
  let lessonData;
  if (getLsItem(keyEnums.webKey)) {
    lessonData = getLsItem(keyEnums.webKey);
  } else {
    const sorted = sortOnDifficulty(lessons);
    const status = addStatus(sorted);
    lessonData = status;
  }

  setLsItem(keyEnums.webKey, lessonData);
  state.webLessons.update((old) => lessonData);
};

const updateWebLesson = (id) => {
  const lesson = getLsItem(keyEnums.webKey).filter((lesson) => lesson.id == id)[0];
  lesson.hasCompleted = !lesson.hasCompleted;
  state.webLessons.update((old) => {
    const index = old.findIndex((l) => l.id == lesson.id);
    old.splice(index, 1, lesson);
    setLsItem(keyEnums.webKey, old);
    return [...old];
  });
};

const getTypingLessons = (lessons) => {
  let lessonData;
  if (getLsItem(keyEnums.typingKey)) {
    lessonData = getLsItem(keyEnums.typingKey);
  } else {
    const sorted = sortOnDifficulty(lessons);
    const status = addStatus(sorted);
    lessonData = status;
  }
  setLsItem(keyEnums.typingKey, lessonData);
  state.typingLessons.update((old) => lessonData);
};

const updateTypingLesson = (id) => {
  const lesson = getLsItem(keyEnums.typingKey).filter((lesson) => lesson.id == id)[0];
  lesson.hasCompleted = !lesson.hasCompleted;
  state.typingLessons.update((old) => {
    const index = old.findIndex((l) => l.id == lesson.id);
    old.splice(index, 1, lesson);
    setLsItem(keyEnums.typingKey, old);
    return [...old];
  });
};

function sortOnDifficulty(lessons = []) {
  return lessons.sort((a, b) => (a.difficulty > b.difficulty ? 1 : -1));
}

function addStatus(sorted = []) {
  return sorted.map((s) => {
    return {
      ...s,
      hasCompleted: false,
      hasStarted: false,
    };
  });
}

export { state, getWebLessons, getTypingLessons, updateWebLesson, updateTypingLesson };
