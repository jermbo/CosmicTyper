import axios from "axios";
import * as store from "./store";
import { parseList } from "./http-utils";
import { getLsItem } from "./storage-utils";
import { keyEnums } from "./enums";
import { API_URL } from "./config";

export async function getTypingLessonsAction() {
  if (getLsItem(keyEnums.typingKey)) {
    store.getTypingLessons(getLsItem(keyEnums.typingKey));
    return;
  }

  try {
    const resp = await axios.get(`${API_URL}/typing-lessons`);
    const data = parseList(resp);
    store.getTypingLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
