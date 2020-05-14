import axios from "axios";
import { getTypingLessons } from "./store";
import { API_URL, KEY_ENUMS, getLsItem, parseList } from "../utils";

export async function getTypingLessonsAction() {
  if (getLsItem(KEY_ENUMS.typingKey)) {
    getTypingLessons(getLsItem(KEY_ENUMS.typingKey));
    return;
  }

  try {
    const resp = await axios.get(`${API_URL}/typing-lessons`);
    const data = parseList(resp);
    getTypingLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
