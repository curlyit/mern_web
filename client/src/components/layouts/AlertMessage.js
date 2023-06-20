import React from "react";

const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <div className="bg-red">
      <h2 className="text-[#b4a917] text-xl">{info.message}</h2>
    </div>
  );
};

export default AlertMessage;
