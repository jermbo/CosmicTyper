import axios from "axios";
import { API_URL, parseList } from "../utils";
import { state } from "./store";

const getTypingLessonsAction = async () => {
  try {
    const resp = await axios.get(`${API_URL}/typing-lessons`);
    const data = parseList(resp);
    setTypingLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
};

const setTypingLessons = (lessons) => {
  state.typingLessons.update((old) => lessons);
};

const addTypingLesson = (lesson) => {
  state.typingLessons.update((old) => [lesson, ...old]);
};

const deleteTypingLesson = (id) => {
  state.typingLessons.update((old) => old.filter((l) => l.id !== id));
};

export { getTypingLessonsAction, setTypingLessons, addTypingLesson, deleteTypingLesson };
