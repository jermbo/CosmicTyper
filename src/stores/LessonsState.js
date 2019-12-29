import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "Scripts/LocalStorageHelper";
import { LSKeyEnums } from "Scripts/enum";

const defaultLessonData = {
  all_lessons: [],
  index: -1,
  filtered_lessons: []
};

export const LESSONS = writable(
  getLsItem(LSKeyEnums.lessons) || setLsItem(LSKeyEnums.lessons, defaultLessonData)
);
