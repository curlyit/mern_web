import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import axios from "axios";
import { apiUrl } from "../contexts/constants";

const Trash = () => {
  const {
    postsDeleted: { total, allPostsDeleted },
    getPostsDeleted,
  } = useContext(PostContext);

  const handleRestore = async (_id, event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`${apiUrl}/posts/restore/${_id}`);
      if (response.data.success) {
        getPostsDeleted();
      }
    } catch (error) {}
  };

  const handleDeleteForce = async (_id, event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(`${apiUrl}/posts/deleteForce/${_id}`);
      if (response.data.success) {
        getPostsDeleted();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getPostsDeleted();
  }, [allPostsDeleted]);

  return (
    <div className="container mx-auto mt-5">
      <table className="min-w-full bg-white border border-gray-300 mt-5">
        <thead className="font-semibold text-xl">
          <tr>
            <th className="py-2 px-4 border-b w-5">STT</th>
            <th className="py-2 px-4 border-b">Name Product</th>
            <th className="py-2 px-4 border-b">Deleted At</th>
            <th className="py-2 px-4 border-b float w-[150px]">Restore</th>
            <th className="py-2 px-4 border-b float w-[150px]">Delete Force</th>
          </tr>
        </thead>
        {allPostsDeleted.map((post, index) => (
          <tbody>
            <tr className="text-center">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{post.tittle}</td>
              <td className="py-2 px-4 border-b">{post.deletedAt}</td>
              <td className="py-2 px-4 border-b">
                <i
                  class="fa-regular fa-window-restore text-[#42bff5] cursor-pointer p-2"
                  onClick={(event) => handleRestore(post._id, event)}
                ></i>
              </td>
              <td className="py-2 pr-0 border-b">
                <i
                  className="fa-solid fa-ban text-red-500 cursor-pointer p-2"
                  onClick={(event) => handleDeleteForce(post._id, event)}
                ></i>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Trash;
