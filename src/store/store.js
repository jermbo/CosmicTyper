import { writable } from "svelte/store";
import { getLsItem, setLsItem, removeLsItem } from "./storage-utils";
import { keyEnums } from "./enums";

const state = {
  webLessons: writable([]),
  typingLessons: writable([]),
  adminUser: writable({}),
  studentUser: writable({}),
};

const getAdminUser = (admin) => {
  let adminData;
  if (getLsItem(keyEnums.admin)) {
    adminData = getLsItem(keyEnums.admin);
  } else {
    adminData = {
      isLoggedIn: admin.user ? true : false,
      token: admin.jwt,
      username: admin.user.username,
      role: admin.user.role.name,
    };
  }

  setLsItem(keyEnums.admin, adminData);
  state.adminUser.update((old) => adminData);
};

const logoutAdminUser = () => {
  removeLsItem(keyEnums.admin, null);
  state.adminUser.update((old) => ({}));
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
  // TODO - Refactor when creating user session
  // lesson.hasCompleted = !lesson.hasCompleted;
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
  // TODO - Refactor when creating user session
  // lesson.hasCompleted = !lesson.hasCompleted;
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

export { state, getWebLessons, getTypingLessons, updateWebLesson, updateTypingLesson, getAdminUser, logoutAdminUser };
