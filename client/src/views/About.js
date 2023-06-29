import React from "react";
import DarkMode from "../components/layouts/ToggleSwitchDarkMode";

const About = () => {
  let body = (
    <>
      <div>Đây là trang About, bạn có thể làm gì với nó</div>
    </>
  );

  return (
    <>
      <DarkMode body={body} />
    </>
  );
};

export default About;
