import axios from "axios";
import * as store from "./store";
import { API_URL, KEY_ENUMS, getLsItem } from "../utils";

export async function getAdminUserAction({ username, password } = {}) {
  if (getLsItem(KEY_ENUMS.admin)) {
    store.getAdminUser(getLsItem(KEY_ENUMS.admin));
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
