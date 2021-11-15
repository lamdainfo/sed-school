import axios from "axios";
import Config from "../Config";

const axiosClient = axios.create();
axiosClient.defaults.baseURL = Config.API_URL;

axiosClient.defaults.headers = {
  //   "Content-Type": "application/json",

  //   "Access-Control-Allow-Origin": "*",
  //   Accept: "application/json",
  DBAuth: "MHJERjRiVmRFRDFhTzRRNy90YkhCUT09",
  Authorization:
    "Barear eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGV2LmxhbWRhaW5mb3RlY2guY29tXC9hcGlcL3YxXC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MjYzMzU5MzYsIm5iZiI6MTYyNjMzNTkzNiwianRpIjoiV1Bob3ozWUY3U2lwMXVrVCIsInN1YiI6NzUsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.jFc-ojOt-aCXEOc0OLfH6_ZJkySifaIbt__5ut3aTYc",
};

//All request will wait 5 seconds before timeout
// axiosClient.defaults.timeout = 5000;
// axiosClient.defaults.withCredentials = true;

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
