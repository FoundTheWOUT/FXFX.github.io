import React, { PropsWithChildren, useState } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
// import BackGround from "@/components/BackGround";
import { FaMonument } from "react-icons/fa";
import Footer from "@/components/Footer";
import { NightSwitchContext, TColorScheme } from "@/components/NightSwitch";
import { useLocalStorage, useMedia } from "react-use";
import classNames from "classnames";

const Layout = (props: PropsWithChildren) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const triggerSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const isSystemDark = useMedia("(prefers-color-scheme: dark)");
  const [colorScheme, setColorScheme] = useLocalStorage<TColorScheme>(
    "user-color-scheme",
    "system"
  );

  return (
    <NightSwitchContext.Provider
      value={{
        scheme: colorScheme,
        setScheme: setColorScheme,
      }}
    >
      <div
        className={classNames({
          dark:
            colorScheme === "dark" ||
            (colorScheme === "system" && isSystemDark),
        })}
      >
        <div className="dark:bg-gray-900 min-h-screen">
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
      </div>
    </NightSwitchContext.Provider>
  );
};

export default Layout;
