import axios from "axios";
import { API_URL, parseList } from "../utils";
import { state } from "./store";

const getWebLessonsAction = async () => {
  try {
    const resp = await axios.get(`${API_URL}/web-lessons`);
    const data = parseList(resp);
    setWebLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
};

const setWebLessons = (lessons) => {
  state.webLessons.update((old) => lessons);
};

const updateWebLesson = (id) => {
  const lesson = getLsItem(KEY_ENUMS.webKey).filter((lesson) => lesson.id == id)[0];
  // TODO - Refactor when creating user session
  // lesson.hasCompleted = !lesson.hasCompleted;
  state.webLessons.update((old) => {
    const index = old.findIndex((l) => l.id == lesson.id);
    old.splice(index, 1, lesson);
    setLsItem(KEY_ENUMS.webKey, old);
    return [...old];
  });
};

const addWebLesson = (lesson) => {
  state.webLessons.update((old) => [lesson, ...old]);
};

const deleteWebLesson = (id) => {
  state.webLessons.update((old) => old.filter((l) => l.id !== id));
};

export { getWebLessonsAction, setWebLessons, updateWebLesson, addWebLesson, deleteWebLesson };
