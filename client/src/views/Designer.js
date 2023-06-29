import React from "react";
import DarkMode from "../components/layouts/ToggleSwitchDarkMode";

const Designer = () => {
  let body = (
    <>
      <div className="max-w-7xl mx-auto px-[15px] ">
        <h1 className="mt-[50px] mb-[20px] text-[#161649] text-[36px] font-semibold max-w-[400px]">
          Read latest collection
        </h1>
        <p className="text-[#4a0c0c] text-lg font-serif max-w-[400px] mb-[70px]">
          Create custom landing pages with Rareblocks that converts more
          visitors than any website.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[50px] gap-y-5 lg:gap-y-0 my-[20px]">
          <div className="mb-8">
            <div className="h-[196px] mb-5 overflow-hidden rounded-2xl">
              <img
                className="transition-transform hover:scale-110 w-full h-full object-cover"
                src={require("../img/stevejobs.jpeg")}
                alt=""
              />
            </div>
            <p className="text-lg font-sans font-medium text-gray-400">
              April 09, 2023
            </p>
            <a href="https://en.wikipedia.org/wiki/Steve_Jobs" target="_blank">
              <h3 className="font-medium text-2xl my">CEO Apple</h3>
            </a>
            <a href="https://en.wikipedia.org/wiki/Steve_Jobs" target="_blank">
              <p className="inline-block text-gray-800 font-normal text-sm uppercase pb-[5px] border-solid border-b border-black">
                continue reading{" "}
                <i className="fa-solid fa-circle-arrow-right"></i>
              </p>
            </a>
          </div>
          <div className="mb-8">
            <div className="h-[196px] mb-5 overflow-hidden rounded-2xl">
              <img
                className="transition-transform hover:scale-110 w-full h-full object-cover"
                src={require("../img/obama.jpeg")}
                alt=""
              />
            </div>
            <p className="text-lg font-sans font-medium text-gray-400">
              August 14, 2021
            </p>
            <a
              href="https://en.wikipedia.org/wiki/Barack_Obama"
              target="_blank"
            >
              <h3 className="font-medium text-2xl">
                The former president of the United States of America
              </h3>
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Barack_Obama"
              target="_blank"
            >
              <p className="inline-block text-gray-800 font-normal text-sm uppercase pb-[5px] border-solid border-b border-black">
                continue reading{" "}
                <i className="fa-solid fa-circle-arrow-right"></i>
              </p>
            </a>
          </div>
          <div className="mb-8">
            <div className="h-[196px] mb-5 overflow-hidden rounded-2xl">
              <img
                className="imgz transition-transform hover:scale-110 w-full h-full object-cover"
                src={require("../img/markzuckerberg.jpeg")}
                alt=""
              />
            </div>
            <p className="text-lg font-sans font-medium text-gray-400">
              January 10, 2023
            </p>
            <a
              href="https://en.wikipedia.org/wiki/Mark_Zuckerberg"
              target="_blank"
            >
              <h3 className="font-medium text-2xl">
                CEO founder Facebook Mark Zuckerberg
              </h3>
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Mark_Zuckerberg"
              target="_blank"
            >
              <p className="inline-block text-gray-800 font-normal text-sm uppercase pb-[5px] border-solid border-b border-black">
                continue reading{" "}
                <i className="fa-solid fa-circle-arrow-right"></i>
              </p>
            </a>
          </div>
          <div className="mb-8">
            <div className="h-[196px] mb-5 overflow-hidden rounded-2xl">
              <img
                className="imgz transition-transform hover:scale-110 w-full h-full object-cover"
                src={require("../img/chaubui.jpeg")}
                alt=""
              />
            </div>
            <p className="text-lg font-sans font-medium text-gray-400">
              January 19, 2029
            </p>
            <a
              href="https://vi.wikipedia.org/wiki/Ch%C3%A2u_B%C3%B9i"
              target="_blank"
            >
              <h3 className="font-medium text-2xl">
                The fashionista from VietNam
              </h3>
            </a>
            <a
              href="https://vi.wikipedia.org/wiki/Ch%C3%A2u_B%C3%B9i"
              target="_blank"
            >
              <p className="inline-block text-gray-800 font-normal text-sm uppercase pb-[5px] border-solid border-b border-black">
                continue reading{" "}
                <i className="fa-solid fa-circle-arrow-right"></i>
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DarkMode body={body} />
    </>
  );
};

export default Designer;
