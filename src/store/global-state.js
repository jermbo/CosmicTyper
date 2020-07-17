import { state } from "./store";

const showLoader = (newState = false) => {
  const shouldShow = newState !== undefined ? newState : !state.globalState.showLoading;
  state.globalState.update((old) => ({ ...old, showLoading: shouldShow }));
};

export { showLoader };
