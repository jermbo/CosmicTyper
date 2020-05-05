import axios from "axios";
import * as store from "./store";
import { parseList } from "./http-utils";
import { getLsItem } from "./storage-utils";
import { keyEnums } from "./enums";
import { AUTH_URL } from "./config";

export async function getAdminUserAction({ username, password } = {}) {
  if (getLsItem(keyEnums.admin)) {
    store.getAdminUser(getLsItem(keyEnums.admin));
    return;
  }

  if (!username || !password) {
    return "Need to fill out un pw";
  }

  try {
    const resp = await axios.post(`${AUTH_URL}/auth/local`, {
      identifier: username || "",
      password: password || "",
    });
    const data = parseList(resp);
    store.getAdminUser(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
}
