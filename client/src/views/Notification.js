import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";

const Notification = ({ success, message }) => {
  const { notification, setShowNotificationModal } = useContext(PostContext);

  const handleClose = () => {
    setShowNotificationModal(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="modal fixed rounded-md block items-center justify-center z-40 bg-[#d5d3d3] w-[420px] top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl flex items-center justify-center my-6 px-3 border-b border-solid border-black">
            {notification.success ? "Successfully!" : "Error!"}
          </h2>
          <p>{notification.message}</p>
          <button
            className="my-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={handleClose}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default Notification;
