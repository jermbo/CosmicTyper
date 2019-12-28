import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "Scripts/LocalStorageHelper";
import { LSKeyEnums } from "Scripts/enum";

const defaultQuestions = [];

export const WELCOME_QUESTIONS = writable(
  getLsItem(LSKeyEnums.welcomeQuestions) || setLsItem(LSKeyEnums.welcomeQuestions, defaultQuestions)
);
