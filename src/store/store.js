import { writable } from "svelte/store";

export const state = {
  webLessons: writable([]),
  typingLessons: writable([]),
  adminUser: writable({}),
  loginErrors: writable([]),
  userSettings: writable({}),
  globalState: writable({})
};
