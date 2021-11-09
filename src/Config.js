const APP_ENV = "DEV"; // DEV, DEMO, TEST, PROD
const APP_EXTENSION = ".com";
const MAINTENANCE_MODE = false;

const config = {
  ENV: APP_ENV,
  IS_MAINTENANCE_MODE: MAINTENANCE_MODE,
  EXTENSION: APP_EXTENSION,

  APP_URL: "https://portal.canopyws.com/",
  API_URL: "https://api.canopyws.com/",
};

if (APP_ENV === "DEV") {
  config.APP_URL = "https://portal.canopyws.com/";
  config.API_URL = "https://api.canopyws.com/";
}

export const packageConfigure = {
  APP_URL: config.APP_URL,
  APP_ENV: config.ENV,
  Extension: config.EXTENSION,
};

config.REACT_APP_GOOGLE_ANALYTICAL_CODE = "";

export default config;
