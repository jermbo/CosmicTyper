import { writable, readable } from "svelte/store";
import { getLsItem, setLsItem } from "Scripts/LocalStorageHelper";
import { LSKeyEnums, AppStateEnums } from "Scripts/enum";

const defaultState = { state: AppStateEnums.appStart, session_start: Date.now() };

function CreateAppState() {
  const { subscribe, set, update } = writable(
    getLsItem(LSKeyEnums.state) || setLsItem(LSKeyEnums.state, defaultState)
  );

  function setState(detail) {
    update(obj => {
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
    setState
  };
}

export const APP_STATE = CreateAppState();

export const IS_DEBUG = readable(true);
