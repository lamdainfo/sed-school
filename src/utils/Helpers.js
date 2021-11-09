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

export const authUserData = () => {
  let authData = localStorage.getItem("auth_user_data");
  return JSON.parse(authData);
};

export const redirectIfNotAdmin = () => {
  let authData = authUserData();

  if (authData === null) {
    window.location.href = "/login";
  }

  if (authData.userType === "admin" && authData.appusersId !== "") {
    window.location.href = "/admin-dashboard";
  }

  if (authData.userType === "student" && authData.appusersId !== "") {
    window.location.href = "/student-dashboard";
  }
};

export const redirectIfLoggedIn = () => {
  let authData = authUserData();

  if (authData !== null && authData !== undefined) {
    if (authData.userType === "admin") {
      window.location.href = "/admin-dashboard";
    }
    
    if (authData.userType === "student" && authData.appusersId !== "") {
      window.location.href = "/student-dashboard";
    }
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
