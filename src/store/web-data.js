import axios from "axios";
import * as store from "./store";
import { parseItem, parseList } from "./http-utils";
import API from "./config";

export async function getWebLessonsAction() {
  try {
    const resp = await axios.get(`${API}/webLessons`);
    const data = parseList(resp);
    store.getWebLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
