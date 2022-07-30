import React, { FC, useState } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
// import BackGround from "@/components/BackGround";
import { FaMonument } from "react-icons/fa";
import Footer from "@/components/Footer";

const Common: FC = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const triggerSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <BackGround /> */}
      <NavBar show={true} />
      <SideBar show={showSideBar} setShowSideBar={setShowSideBar} />
      {props.children}
      <Footer />
      {/* float icon */}
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
