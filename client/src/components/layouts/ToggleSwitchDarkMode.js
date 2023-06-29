import React, { useContext, useEffect } from "react";
import { ReduxContext } from "../../contexts/ReduxContext";

const ToggleSwitchDarkMode = ({ body }) => {
  const {
    redux: { darkMode },
    loadDarkMode,
    setDarkMode,
  } = useContext(ReduxContext);

  const getDarkModeClassName = () => {
    return `${
      darkMode === true
        ? "bg-[#606465] px-5 h-full w-full"
        : "bg-gradient-to-r from-[#aee4f3] to-[#f5b0d4] px-5 h-full w-full"
    }`;
  };

  const getCheckedToggleSwitch = () => {
    return darkMode;
  };

  const handleClickDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    loadDarkMode();
  }, [darkMode]);

  return (
    <>
      <div className={getDarkModeClassName()}>
        <label
          htmlFor="toggle"
          className="inline-block cursor-pointer toggle-switch"
        >
          <input
            type="checkbox"
            name=""
            id="toggle"
            className="darkmode-input hidden"
            checked={getCheckedToggleSwitch()}
          />
          <div
            className="w-[70px] h-[40px] border border-[#ccc] rounded-full fixed right-10 bottom-10 p-[5px] bg-[#a7a6a6] z-10"
            onClick={() => handleClickDarkMode()}
          >
            <div className="h-7 w-7 rounded-full transition-all bg-[white] darkmode-spinner" />
          </div>
          {/* {body} */}
        </label>
        {body}
      </div>
    </>
  );
};

export default ToggleSwitchDarkMode;
