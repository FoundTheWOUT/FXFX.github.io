import React, { PropsWithChildren, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { FaMonument } from "react-icons/fa";
import Footer from "@/components/Footer";
import { NightSwitchContext, TColorScheme } from "@/components/NightSwitch";
import { useLocalStorage, useMedia } from "react-use";
import classNames from "classnames";

const isBrowser = typeof window !== "undefined";

const Layout = (props: PropsWithChildren) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const triggerSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const isSystemDark = useMedia(
    "(prefers-color-scheme: dark)",
    isBrowser ? undefined : true
  );
  /**
   * default scheme state to 'system', this can prevent mismatch of the SSG output and Client first load.
   * later, in client side, we use the useEffect hook to reset the scheme state depend on localStorage.
   * However, this causing the flashing when client side default to 'light' mode.
   *
   * reference: https://with-svelte.com/lessons/ssr-dark-mode
   *
   * 👆👆 outdate
   * fix: https://www.joshwcomeau.com/react/dark-mode/#introduction
   * */
  const [colorSchemeStorage, setColorSchemeStorage] =
    useLocalStorage<TColorScheme>("user-color-scheme", "system", { raw: true });

  const setColorScheme = (scheme: TColorScheme) => {
    setColorSchemeStorage(scheme);
    if (scheme === "dark" || (scheme === "system" && isSystemDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    colorSchemeStorage === "system" && setColorScheme("system");
  }, [isSystemDark]);

  return (
    <NightSwitchContext.Provider
      value={{
        scheme: colorSchemeStorage,
        setScheme: (scheme) => {
          setColorScheme(scheme);
          setShowSideBar(false);
        },
      }}
    >
      <div
        className={classNames("dark:bg-gray-900 min-h-screen px-2", {
          "h-screen overflow-hidden": showSideBar,
        })}
      >
        {/* <BackGround /> */}
        <NavBar />
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
    </NightSwitchContext.Provider>
  );
};

export default Layout;
