import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
  FIND_IMAGE,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // state
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    images: [],
    postslooading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [postsDeleted, setPostsDeleted] = useState({
    total: 0,
    allPostsDeleted: [],
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const getPostsDeleted = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/soft-deleted`);
      setPostsDeleted({
        total: response.data.totalNumber,
        allPostsDeleted: response.data.postsDeleted,
      });
    } catch (error) {
      console.error();
    }
  };

  const getImages = async (postId) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/imagesPost/${postId}`);
      if (response.data.success) {
        dispatch({
          type: FIND_IMAGE,
          payload: response.data.images,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  const getImage = async (fileName) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/getImage/${fileName}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  // get post to update
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_POST, payload: post });
  };

  // get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/allPosts`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // add Post
  const addPost = async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}/posts/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error!" };
    }
  };

  // delete Post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/delete/${postId}`);
      if (response.data.success)
        dispatch({ type: DELETE_POST, payload: postId });
    } catch (error) {
      console.log(error);
    }
  };

  // update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/update/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });

        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error!" };
    }
  };

  // post context data
  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    postsDeleted,
    getPostsDeleted,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    getImages,
    getImage,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
