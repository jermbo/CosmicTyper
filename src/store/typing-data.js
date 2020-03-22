import axios from "axios";
import * as store from "./store";
import { parseItem, parseList } from "./http-utils";
import API from "./config";

export async function getTypingLessonsAction() {
  try {
    const resp = await axios.get(`${API}/typingLessons`);
    const data = parseList(resp);
    store.getTypingLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
