import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "../scripts/LocalStorageHelper";
import { LSKeyEnums } from "../scripts/enum";

/**
 * Possible States
 *
 * WELCOME_SCREEN | LESSON_SELECT | LESSON_STARTED | LESSON_ENDED
 */
const defaultState = { state: "WELCOME_SCREEN", session_start: Date.now() };

export const APP_STATE = writable(
  getLsItem(LSKeyEnums.state) || setLsItem(LSKeyEnums.state, defaultState)
);
