import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "Scripts/LocalStorageHelper";
import { LSKeyEnums } from "Scripts/enum";

const defaultLessonData = {
  allLessons: [],
  index: -1,
  filteredLessons: []
};

export const LESSONS = writable(
  getLsItem(LSKeyEnums.lessons) || setLsItem(LSKeyEnums.lessons, defaultLessonData)
);
