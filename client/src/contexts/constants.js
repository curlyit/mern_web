export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://stark-depths-48562.herokuapp.com/api";
// process.env.NODE_ENV !== "production"
//   ? "https://stark-depths-48562.herokuapp.com/api"
//   : "http://localhost:3000/api";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
export const FIND_IMAGE = "FIND_IMAGE";
