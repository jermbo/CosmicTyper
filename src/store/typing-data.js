import axios from "axios";
import { setTypingLessons } from "./store";
import { API_URL, parseList } from "../utils";

export async function getTypingLessonsAction() {
  try {
    const resp = await axios.get(`${API_URL}/typing-lessons`);
    const data = parseList(resp);
    setTypingLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
