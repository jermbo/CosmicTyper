import { writable, readable } from "svelte/store";
import { getLsItem, setLsItem } from "../scripts/LocalStorageHelper";
import { LSKeyEnums, AppStateEnums } from "../scripts/enum";

const defaultState = { state: AppStateEnums.appStart, session_start: Date.now() };

export const APP_STATE = writable(getLsItem(LSKeyEnums.state) || setLsItem(LSKeyEnums.state, defaultState));

export const IS_DEBUG = readable(true);
