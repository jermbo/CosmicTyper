import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "../scripts/LocalStorageHelper";
import { LSKeyEnums } from "../scripts/enum";

const defaultLessonData = {
  allLessons: [],
  index: -1,
  filteredLessons: []
};

export const LESSONS = writable(
  getLsItem(LSKeyEnums.lessons) ||
    setLsItem(LSKeyEnums.lessons, defaultLessonData)
);
