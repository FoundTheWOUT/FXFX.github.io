import React, { FC, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
// import BackGround from "../components/BackGround";
import { FaMonument } from "react-icons/fa";
// import smoothscroll from "smoothscroll-polyfill";

// kick off the polyfill!
// smoothscroll.polyfill();

const Common: FC = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const triggerSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const [showNavBar, setNavBar] = useState(true);
  const onWheel = (e) => {
    if (e.deltaY > 10) {
      setNavBar(false);
    } else if (e.deltaY < -5) {
      setNavBar(true);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen" onWheel={onWheel}>
      {/* <BackGround /> */}
      <NavBar show={showNavBar} />
      <SideBar show={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="px-6 md:px-32 2xl:px-96">{props.children}</div>
      <div className="flex flex-col h-28 items-center justify-center text-xs text-gray-400">
        <div>
          Powered by{" "}
          <a className="inline" href="https://www.gatsbyjs.com/">
            Gatsby
          </a>{" "}
          & FXFX.THEME
        </div>
      </div>
      <div
        className="md:invisible fixed bottom-0 right-0 m-6 h-14 w-14 rounded-full bg-gradient-to-tr from-gold to-purple-500 flex items-center justify-center shadow-lg active:shadow-inner"
        onClick={triggerSideBar}
      >
        <FaMonument className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default Common;
