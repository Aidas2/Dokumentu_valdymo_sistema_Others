import Axios from "axios";

export function checkToken() {
  let token = JSON.parse(localStorage.getItem("accessToken"));
  if (token) {
    Axios.defaults.headers.Authorization = `Bearer ${token}`;
    return true;
  } else {
    localStorage.clear("user");
    localStorage.clear("accessToken");
    delete Axios.defaults.headers.Authorization;
    return false;
  }
}
