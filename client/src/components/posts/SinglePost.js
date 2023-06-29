import usdIcon from "../../assets/usd.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import { AuthContext } from "../../contexts/AuthContext";

const SinglePost = ({ post: { _id, status, tittle, description, price } }) => {
  const { findPost, getImages } = useContext(PostContext);
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClickDetail = async (event) => {
    event.preventDefault();
    await findPost(_id);
    await getImages(_id);
    navigate(`/detail/${_id}`);
  };

  // xử lý khi phần mô tả quá dài
  const truncateDescription = (description) => {
    if (description.length <= 140) {
      return description;
    } else {
      return description.slice(0, 140) + "...";
    }
  };

  return (
    <div className="shadow-lg bg-[#f7f5f7] rounded-lg border font">
      <div
        className={`p-4 border-b ${
          status === "LEARNED"
            ? "border-green-500"
            : status === "LEARNING"
            ? "border-yellow-500"
            : "border-red-500"
        }`}
      >
        <div
          className="cursor-pointer hover:bg-[#e4f1f7] p-2"
          onClick={handleClickDetail}
        >
          <div className="flex justify-between">
            <p className="text-[#c01db0] text-xl font-medium">{tittle}</p>
          </div>
          <div className="text-gray-600 text-sm mt-2">
            {truncateDescription(`${description}`)}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="p-4 flex">
          <p>
            Supplier by <strong className="cursor-pointer">{username}</strong>
          </p>
        </div>
        <div className="p-4 flex justify-center items-center font-semibold">
          Price: {price} <img className="w-6 h-6" src={usdIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
