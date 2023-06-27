import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import { ReduxContext } from "../../contexts/ReduxContext";
import Notification from "../../views/Notification";

const AddPostModal = () => {
  // Context
  const { showAddPostModal, setShowAddPostModal, addPost } =
    useContext(PostContext);

  const { showNotificationModal, setShowNotificationModal, setNotification } =
    useContext(ReduxContext);

  // State
  const [newPost, setNewPost] = useState({
    tittle: "",
    description: "",
    price: "",
    type: "Clothes",
    imgList: [],
  });

  const { tittle, description, price, type } = newPost;

  const onChangeNewPostForm = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    newPost.imgList = images;

    const formData = new FormData();
    formData.append("tittle", newPost.tittle);
    formData.append("description", newPost.description);
    formData.append("price", newPost.price);
    formData.append("type", newPost.type);
    newPost.imgList.forEach((image) => {
      formData.append("imgList", image);
    });

    const responseObj = await addPost(formData);

    setNotification({
      success: responseObj.success,
      message: responseObj.message,
    });

    setShowNotificationModal(true);

    resetAddPostData();
  };

  useEffect(() => {}, [newPost]);

  const resetAddPostData = () => {
    setImages([]);
    setLabels([]);

    setNewPost({
      tittle: "",
      description: "",
      price: "",
      type: "Clothes",
    });
    setShowAddPostModal(false);
  };

  // update hình ảnh
  const [images, setImages] = useState([]);
  const [labels, setLabels] = useState([]);

  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    const imageList = Array.from(fileList);

    // Update images state
    setImages([...images, ...imageList]);

    // Update labels state
    const labelList = imageList.map((image) => ({
      id: image.name,
      name: image.name,
    }));
    setLabels([...labels, ...labelList]);
  };
  const handleLabelRemove = (labelId) => {
    // Remove the image and label with corresponding ID
    const updatedImages = images.filter((image) => image.name !== labelId);
    setImages(updatedImages);

    const updatedLabels = labels.filter((label) => label.id !== labelId);
    setLabels(updatedLabels);
  };

  return (
    <>
      {showAddPostModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <form
            encType="multipart/form-data"
            method="post"
            onSubmit={onSubmitForm}
            className="block bg-gray-400 w-[480px] rounded-lg"
          >
            <div className="text-3xl flex items-center justify-center py-8">
              What is your product?
            </div>
            <input
              className="text-xl outline-none p-2 w-full rounded-lg my-1"
              type="text"
              placeholder="Product Name"
              name="tittle"
              required
              value={tittle}
              onChange={onChangeNewPostForm}
            />
            <textarea
              className="w-full text-xl resize-none rounded-lg outline-none p-2 my-1"
              name="description"
              id=""
              rows="3"
              required
              value={description}
              placeholder="Description"
              onChange={onChangeNewPostForm}
            ></textarea>
            <div>
              <div className="flex justify-center items-center">
                <p className="font-semibold">Price:(USD)</p>
                <input
                  className="text-xl outline-none p-2 w-[120px] rounded-lg my-1 ml-2"
                  type="text"
                  placeholder="price"
                  name="price"
                  required
                  value={price}
                  onChange={onChangeNewPostForm}
                />

                <div className="flex justify-center items-center">
                  <p className="font-semibold ml-5">Type:</p>
                  <select
                    value={type}
                    name="type"
                    required
                    onChange={onChangeNewPostForm}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md ml-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Accessory">Accessory</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="image-upload"
                  className="ml-5 bg-[#5891aa] text-white py-2 px-4 rounded-md cursor-pointer mt-5"
                >
                  Select Images
                </label>
                <input
                  id="image-upload"
                  type="file"
                  name="images"
                  required
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                <div className="mt-4 ml-5">
                  {labels.map((label) => (
                    <div key={label.id} className="inline-flex flex-wrap pr-3">
                      <span className="mr-2 font-semibold">{label.name}</span>
                      <button
                        className="bg-[#332f2f] text-white py-1 px-2 rounded-md"
                        onClick={() => handleLabelRemove(label.id)}
                      >
                        <i class="fa-solid fa-circle-xmark"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex mx-auto my-8 items-center justify-center">
              <button
                className="bg-[#e64d27] text-white font-medium text-xl py-2 px-4 rounded-md mx-4"
                onClick={resetAddPostData}
              >
                Cancel
              </button>
              <button
                className="bg-[#2078d5] text-white font-medium text-xl py-2 px-4 rounded-md mx-4"
                type="submit"
              >
                Save!
              </button>
            </div>
          </form>
        </div>
      )}
      {showNotificationModal && <Notification />}
    </>
  );
};

export default AddPostModal;
