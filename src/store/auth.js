import axios from "axios";
import * as store from "./store";
import { getLsItem } from "./storage-utils";
import { keyEnums } from "./enums";
import { API_URL } from "./config";

export async function getAdminUserAction({ username, password } = {}) {
  if (getLsItem(keyEnums.admin)) {
    store.getAdminUser(getLsItem(keyEnums.admin));
    return;
  }

  try {
    const resp = await axios.post(`${API_URL}/auth/local`, {
      identifier: username || "",
      password: password || "",
    });
    store.getAdminUser(resp.data);
    return resp.data;
  } catch (err) {
    store.setLoginErrors(err.response.data.data[0].messages);
  }
}
