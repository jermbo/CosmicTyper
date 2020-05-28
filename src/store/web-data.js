import axios from "axios";
import { setWebLessons } from "./store";
import { API_URL, parseList } from "../utils";

export async function getWebLessonsAction() {
  try {
    const resp = await axios.get(`${API_URL}/web-lessons`);
    const data = parseList(resp);
    setWebLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
