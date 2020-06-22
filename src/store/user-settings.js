import { state } from "./store";

const getUserSettingsActions = async () => {
  const mode = Math.random() > 0.5 ? "light" : "dark";
  setUserSettings(mode);
};

const setUserSettings = (mode) => {
  state.userSettings.update((old) => ({ ...old, mode }));
};

export { getUserSettingsActions, setUserSettings };
