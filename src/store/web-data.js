import axios from "axios";
import { API_URL, parseList } from "../utils";
import { state } from "./store";
import { showLoader } from "./global-state";

const getWebLessonsAction = async () => {
  showLoader(true);
  try {
    const resp = await axios.get(`${API_URL}/web-lessons`);
    const data = parseList(resp);
    setWebLessons(data);
    showLoader(false);
    return data;
  } catch (err) {
    showLoader(false);
    return console.log(err);
  }
};

const setWebLessons = (lessons) => {
  state.webLessons.update((old) => lessons);
};

const addWebLesson = (lesson) => {
  state.webLessons.update((old) => [lesson, ...old]);
};

const deleteWebLesson = (id) => {
  state.webLessons.update((old) => old.filter((l) => l.id !== id));
};

export { getWebLessonsAction, setWebLessons, addWebLesson, deleteWebLesson };
