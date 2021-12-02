import axios from "axios";
import Config from "../Config";

const axiosClient = axios.create();
axiosClient.defaults.baseURL = Config.API_URL;

const token = localStorage.getItem("restoken");
const dbToken = localStorage.getItem("dbtoken");

axiosClient.defaults.headers = {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   Accept: "application/json",
};

if (dbToken && dbToken !== null && dbToken !== undefined) {
  //alert("Login success")
  axiosClient.defaults.headers.DBAuth = dbToken;
  axiosClient.defaults.headers.Authorization = token ? `Bearer ${token}` : null;
}

//All request will wait 5 seconds before timeout
// axiosClient.defaults.timeout = 5000;
// axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      return Promise.reject(response?.data);
    }

    if (response.data && response.data.errmsg && response.data.errmsg !== "") {
      return Promise.reject(response?.data);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
