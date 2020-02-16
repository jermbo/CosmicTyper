import { writable, readable } from "svelte/store";
import { getLsItem, setLsItem } from "Scripts/LocalStorageHelper";
import { LSKeyEnums, AppStateEnums } from "Scripts/enum";

const defaultState = { state: AppStateEnums.appStart, session_start: Date.now() };

function CreateAppState() {
  const { subscribe, update } = writable(getLsItem(LSKeyEnums.state) || setLsItem(LSKeyEnums.state, defaultState));

  function setState(detail) {
    update((obj) => {
      obj.state = detail;
      __setLocalStorage(obj);
      return obj;
    });
  }

  function __setLocalStorage(obj) {
    setLsItem(LSKeyEnums.state, obj);
  }

  return {
    subscribe,
    setState,
  };
}

export const APP_STATE = CreateAppState();

export const IS_DEBUG = readable(false);

export const API_URL = readable("https://sampleapis.com/typer/api");
// export const API_URL = readable("http://localhost:5001/typer");
