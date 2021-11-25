import moment from "moment";

export const validateToken = (token) => {
  if (!token) {
    return false;
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const getSchoolData = () => {
  let schoolData = localStorage.getItem("schoolData");
  return JSON.parse(schoolData);
};

export const getSessionData = () => {
  let sessionData = localStorage.getItem("session_data");
  return JSON.parse(sessionData);
};

export const getUserData = () => {
  let userData = localStorage.getItem("userData");
  return JSON.parse(userData);
};

export const getUserType = () => {
  let userType = localStorage.getItem("userType");
  return userType;
};

export const getSchoolMenu = () => {
  let schoolMenu = localStorage.getItem("school_menu");
  return schoolMenu !== "" ? schoolMenu.split(",") : [];
};

// export const redirectIfNotAdmin = () => {
//   let authData = authUserData();

//   if (authData === null) {
//     window.location.href = "/login";
//   }

//   if (authData.userType === "admin" && authData.appusersId !== "") {
//     window.location.href = "/admin-dashboard";
//   }

//   if (authData.userType === "student" && authData.appusersId !== "") {
//     window.location.href = "/student-dashboard";
//   }
// };

export const redirectIfLoggedIn = () => {
  let token = localStorage.getItem("restoken");
  let userType = getUserType();

  if (token !== null && token !== undefined && userType !== null) {
    window.location.href = "/dashboard";
  }
};

export const ImageUploadValidation = (file) => {
  let errorMsg = "";
  let isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    errorMsg = "You can only upload JPG/PNG file!";
  }

  let isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    errorMsg = "Image must smaller than 2MB!";
  }
  return errorMsg;
};

export const ToDateTime = (dateTimeValue) => {
  return moment(dateTimeValue).format("Do MMMM YYYY, H:mm");
};
