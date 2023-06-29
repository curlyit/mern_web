import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import ActionButtons from "../components/posts/ActionButtons";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import { useNavigate } from "react-router-dom";
import DarkMode from "../components/layouts/ToggleSwitchDarkMode";

const Manage = () => {
  const {
    postState: { post, posts },
    getPosts,
    postsDeleted,
    getPostsDeleted,
    setShowAddPostModal,
  } = useContext(PostContext);
  const navigate = useNavigate();

  const [totalNumber, setTotalNumber] = useState(0);

  const handleTrash = (event) => {
    event.preventDefault();
    navigate(`/trash`);
  };

  const handleCreateNewProduct = (event) => {
    event.preventDefault();
    setShowAddPostModal(true);
  };

  useEffect(() => {
    getPosts();
    getPostsDeleted();
    setTotalNumber(postsDeleted.total);
  }, [posts]);

  let body = (
    <>
      <div className="container mx-auto mt-5 px-[15px] w-full">
        <div className="text-xl font-semibold text-[#161649]">
          <div
            className="inline-block cursor-pointer p-1 mb-2"
            onClick={handleTrash}
          >
            <i className="inline-block fa-regular fa-trash-can pr-2"></i>
            <p className="inline-block ">Trash ({totalNumber})</p>
          </div>
          <br />
          <div
            className="inline-block cursor-pointer p-1"
            onClick={handleCreateNewProduct}
          >
            <i className="inline-block fa-solid fa-circle-plus pr-2"></i>
            <p className="inline-block">New Product</p>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-300 mt-5">
          <thead className="font-semibold text-xl">
            <tr>
              <th className="py-2 px-4 border-b w-5">STT</th>
              <th className="py-2 px-4 border-b">Name Product</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          {posts.map((post, index) => (
            <tbody>
              <tr className="text-center">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{post.tittle}</td>
                <td className="py-2 px-4 border-b">{post.price}</td>
                <td className="py-2 px-4 border-b">{post.createdAt}</td>
                <td className="py-2 pr-0 border-b">
                  <ActionButtons _id={post._id} />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
    </>
  );

  return (
    <>
      <DarkMode body={body} />
    </>
  );
};

export default Manage;
