import viewIcon from "../../assets/view.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({ _id }) => {
  const { deletePost, findPost, getImages, setShowUpdatePostModal } =
    useContext(PostContext);
  const navigate = useNavigate();
  const choosePost = (_id) => {
    findPost(_id);
    setShowUpdatePostModal(true);
  };
  const clickView = async (_id, event) => {
    event.preventDefault();
    await findPost(_id);
    await getImages(_id);
    navigate(`/detail/${_id}`);
  };

  return (
    <>
      <button className="post-button px-2 " onClick={clickView.bind(this, _id)}>
        <img src={viewIcon} alt="play" width="32" height="32" />
      </button>
      <button className="post-button px-2" onClick={choosePost.bind(this, _id)}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </button>
      <button className="post-button px-2" onClick={deletePost.bind(this, _id)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </button>
    </>
  );
};

export default ActionButtons;
