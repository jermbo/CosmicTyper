import { writable } from "svelte/store";
import { KEY_ENUMS, getLsItem, setLsItem, removeLsItem } from "../utils";

const state = {
  webLessons: writable([]),
  typingLessons: writable([]),
  adminUser: writable({}),
  loginErrors: writable([]),
  studentUser: writable({}),
};

const getAdminUser = (admin) => {
  let adminData;
  if (getLsItem(KEY_ENUMS.admin)) {
    adminData = getLsItem(KEY_ENUMS.admin);
  } else {
    adminData = {
      isLoggedIn: admin.user ? true : false,
      token: admin.jwt,
      username: admin.user.username,
      role: admin.user.role.name,
    };
  }

  setLsItem(KEY_ENUMS.admin, adminData);
  state.adminUser.update((old) => adminData);
  setLoginErrors();
};

const setLoginErrors = (errors = []) => {
  state.loginErrors.update((old) => errors);
};

const logoutAdminUser = () => {
  removeLsItem(KEY_ENUMS.admin, null);
  state.adminUser.update((old) => ({}));
};

const getWebLessons = (lessons) => {
  let lessonData;
  if (getLsItem(KEY_ENUMS.webKey)) {
    lessonData = getLsItem(KEY_ENUMS.webKey);
  } else {
    const sorted = sortOnDifficulty(lessons);
    const status = addStatus(sorted);
    lessonData = status;
  }

  setLsItem(KEY_ENUMS.webKey, lessonData);
  state.webLessons.update((old) => lessonData);
};

const updateWebLesson = (id) => {
  const lesson = getLsItem(KEY_ENUMS.webKey).filter((lesson) => lesson.id == id)[0];
  // TODO - Refactor when creating user session
  // lesson.hasCompleted = !lesson.hasCompleted;
  state.webLessons.update((old) => {
    const index = old.findIndex((l) => l.id == lesson.id);
    old.splice(index, 1, lesson);
    setLsItem(KEY_ENUMS.webKey, old);
    return [...old];
  });
};

const getTypingLessons = (lessons) => {
  let lessonData;
  if (getLsItem(KEY_ENUMS.typingKey)) {
    lessonData = getLsItem(KEY_ENUMS.typingKey);
  } else {
    const sorted = sortOnDifficulty(lessons);
    const status = addStatus(sorted);
    lessonData = status;
  }
  setLsItem(KEY_ENUMS.typingKey, lessonData);
  state.typingLessons.update((old) => lessonData);
};

const updateTypingLesson = (id) => {
  const lesson = getLsItem(KEY_ENUMS.typingKey).filter((lesson) => lesson.id == id)[0];
  // TODO - Refactor when creating user session
  // lesson.hasCompleted = !lesson.hasCompleted;
  state.typingLessons.update((old) => {
    const index = old.findIndex((l) => l.id == lesson.id);
    old.splice(index, 1, lesson);
    setLsItem(KEY_ENUMS.typingKey, old);
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

export {
  state,
  getWebLessons,
  getTypingLessons,
  updateWebLesson,
  updateTypingLesson,
  getAdminUser,
  logoutAdminUser,
  setLoginErrors,
};
