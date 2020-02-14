import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "../scripts/LocalStorageHelper";
import { LSKeyEnums } from "../scripts/enum";

const defaultUser = {
  lesson_category: "html-css",
  difficulty: "easy",
  active_time: Date.now(),
};

function CreateUserObj() {
  const { subscribe, update } = writable(getLsItem(LSKeyEnums.user) || setLsItem(LSKeyEnums.user, defaultUser));

  function save() {
    update((obj) => {
      obj.active_time = Date.now();
      __setLocalStorage(obj);
      return obj;
    });
  }
  function change(key, value) {
    update((obj) => {
      obj[key] = value;
      __setLocalStorage(obj);
      return obj;
    });
  }

  function __setLocalStorage(obj) {
    setLsItem(LSKeyEnums.user, obj);
  }

  return {
    subscribe,
    save,
    change,
  };
}

export const USER_OBJ = CreateUserObj();
