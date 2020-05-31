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

export { state, getAdminUser, logoutAdminUser, setLoginErrors };
