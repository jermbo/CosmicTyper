import axios from "axios";
import * as store from "./store";
import { parseList } from "./http-utils";
import { getLsItem } from "./storage-utils";
import { keyEnums } from "./enums";
import API from "./config";

export async function getTypingLessonsAction() {
  if (getLsItem(keyEnums.typingKey)) {
    console.log("checking typing first");
    store.getTypingLessons(getLsItem(keyEnums.typingKey));
    return;
  }

  try {
    const resp = await axios.get(`${API}/typingLessons`);
    const data = parseList(resp);
    store.getTypingLessons(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
