import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "../scripts/LocalStorageHelper";
import { LSKeyEnums } from "../enum";

const defaultUser = {
  lesson: "html-css",
  level: "easy",
  active_time: Date.now()
};

export const USER_OBJ = writable(
  getLsItem(LSKeyEnums.user) || setLsItem(LSKeyEnums.user, defaultUser)
);
