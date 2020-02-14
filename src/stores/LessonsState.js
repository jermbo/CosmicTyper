import { writable } from "svelte/store";
import { getLsItem, setLsItem } from "Scripts/LocalStorageHelper";
import { LSKeyEnums } from "Scripts/enum";

const defaultLessonData = {
  all_lessons: [],
  index: -1,
  filtered_lessons: [],
};

function CreateLessonObj() {
  const { subscribe, update } = writable(
    getLsItem(LSKeyEnums.lessons) || setLsItem(LSKeyEnums.lessons, defaultLessonData),
  );

  function changeIndex(newIndex) {
    update((obj) => {
      obj.index = newIndex;
      __setLocalStorage(obj);
      return obj;
    });
  }

  function setAllLessons(lessons) {
    update((obj) => {
      obj.all_lessons.push(...lessons);
      __setLocalStorage(obj);
      return obj;
    });
  }

  function setFilteredLessons(lessonType, difficulty) {
    const lessons = getLsItem(LSKeyEnums.lessons).all_lessons;
    // const filtered_lessons = lessons.filter(
    //   lesson => lesson.categories.includes(lessonType) && lesson.categories.includes(difficulty),
    // );

    const filtered_lessons = lessons
      .filter((lesson) => lesson.category == lessonType)
      .filter((lesson) => lesson.difficulty == difficulty);

    update((obj) => {
      obj.filtered_lessons = filtered_lessons;
      __setLocalStorage(obj);
      return obj;
    });
  }

  function __setLocalStorage(obj) {
    setLsItem(LSKeyEnums.lessons, obj);
  }

  return {
    subscribe,
    setAllLessons,
    setFilteredLessons,
    changeIndex,
  };
}

export const LESSONS = CreateLessonObj();
