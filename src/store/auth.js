import axios from "axios";
import { state } from "./store";
import { API_URL, KEY_ENUMS, getLsItem, setLsItem, removeLsItem } from "../utils";

const getAdminUserAction = async ({ username, password } = {}) => {
  if (getLsItem(KEY_ENUMS.admin)) {
    getAdminUser(getLsItem(KEY_ENUMS.admin));
    return;
  }

  try {
    const resp = await axios.post(`${API_URL}/auth/local`, {
      identifier: username || "",
      password: password || "",
    });
    getAdminUser(resp.data);
    return resp.data;
  } catch (err) {
    setLoginErrors(err.response.data.data[0].messages);
  }
};

const getAdminUser = (admin) => {
  let adminData;
  if (getLsItem(KEY_ENUMS.admin)) {
    adminData = getLsItem(KEY_ENUMS.admin);
  } else {
    adminData = {
      isLoggedIn: admin.user ? true : false,
      token: admin.jwt,
      username: admin.user.username,
      role: admin.user.role.name,
    };
  }

  setLsItem(KEY_ENUMS.admin, adminData);
  state.adminUser.update((old) => adminData);
  setLoginErrors();
};

const setLoginErrors = (errors = []) => {
  state.loginErrors.update((old) => errors);
};

const logoutAdminUser = () => {
  removeLsItem(KEY_ENUMS.admin, null);
  state.adminUser.update((old) => ({}));
};

export { getAdminUserAction, getAdminUser, setLoginErrors, logoutAdminUser };
