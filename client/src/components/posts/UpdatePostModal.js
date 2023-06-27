import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import { ReduxContext } from "../../contexts/ReduxContext";
import Notification from "../../views/Notification";

const UpdatePostModal = () => {
  // Context
  const {
    postState: { post, images },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
  } = useContext(PostContext);

  const { showNotificationModal, setShowNotificationModal, setNotification } =
    useContext(ReduxContext);

  // State
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => setUpdatedPost(post), [post]);

  const { tittle, description, price, type } = updatedPost;

  const handleClose = () => {
    setShowUpdatePostModal(false);
    closeDialog();
  };

  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setNotification({
      success: success,
      message: message,
    });

    setShowNotificationModal(true);
  };

  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  return (
    <>
      {showUpdatePostModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto">
          <div className="fixed bg-black opacity-50 pointer-events-auto"></div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 py-6 bg-gray-200  flex items-center justify-between">
              <h3 className="text-xl font-bold uppercase">Updating post</h3>
              <button className="text-gray-500" onClick={handleClose}>
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
            <form onSubmit={onSubmitForm}>
              <div className="p-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Tittle</h2>
                  <input
                    type="text"
                    placeholder="Title"
                    name="tittle"
                    required
                    aria-describedby="title-help"
                    value={tittle}
                    onChange={onChangeUpdatedPostForm}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Description</h2>
                  <textarea
                    rows={3}
                    placeholder="Description"
                    required
                    name="description"
                    value={description}
                    onChange={onChangeUpdatedPostForm}
                    className="w-[452px] border border-gray-300 px-3 py-2 rounded-md resize-none overflow-auto focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Price</h2>
                  <input
                    type="text"
                    placeholder="Price"
                    name="price"
                    required
                    value={price}
                    onChange={onChangeUpdatedPostForm}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Type</h2>
                  <select
                    value={type}
                    name="type"
                    required
                    onChange={onChangeUpdatedPostForm}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Accessory">Accessory</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-200 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-red-400 text-white px-4 py-2 rounded-md mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showNotificationModal && <Notification />}
    </>
  );
};

export default UpdatePostModal;

// lỗi không hiện thông báo sau khi update thành công
// lỗi actionButton còn giữ thông tin của post trước...
