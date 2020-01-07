import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "Scripts/LocalStorageHelper";
import { LSKeyEnums } from "Scripts/enum";

function CreateWelcomeState() {
  const { subscribe, update } = writable(
    getLsItem(LSKeyEnums.welcomeQuestions) || setLsItem(LSKeyEnums.welcomeQuestions, []),
  );

  function setQuestions(questions) {
    update(obj => {
      obj.push(...questions);
      __setLocalStorage(obj);
      return obj;
    });
  }

  function __setLocalStorage(obj) {
    setLsItem(LSKeyEnums.welcomeQuestions, obj);
  }

  return {
    subscribe,
    setQuestions,
  };
}

export const WELCOME_QUESTIONS = CreateWelcomeState();
