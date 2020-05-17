import axios from "axios";
import { getWebLessons } from "./store";
import { API_URL, KEY_ENUMS, getLsItem, parseList } from "../utils";

export async function getWebLessonsAction() {
  // if (getLsItem(KEY_ENUMS.webKey)) {
  //   getWebLessons(getLsItem(KEY_ENUMS.webKey));
  //   return;
  // }

  try {
    const resp = await axios.get(`${API_URL}/web-lessons`);
    const data = parseList(resp);
    getWebLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
