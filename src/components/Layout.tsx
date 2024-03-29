import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
// import { FaMonument } from "react-icons/fa";
import Footer from "@/components/Footer";
import { NightSwitchContext, TColorScheme } from "@/components/NightSwitch";
import { useLocalStorage, useMedia } from "react-use";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

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

  const setColorScheme = useCallback(
    (scheme: TColorScheme) => {
      setColorSchemeStorage(scheme);
      document.documentElement.dataset["theme"] = scheme;
      if (scheme === "dark" || (scheme === "system" && isSystemDark)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [isSystemDark, setColorSchemeStorage]
  );

  useEffect(() => {
    colorSchemeStorage === "system" && setColorScheme("system");
  }, [setColorScheme, colorSchemeStorage]);

  const handleScroll = () => {
    if (showSideBar) setShowSideBar(false);
  };

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
        className="min-h-screen dark:bg-gray-900"
        onWheel={handleScroll}
        onTouchMove={handleScroll}
      >
        {/* <BackGround /> */}
        <NavBar />
        <SideBar show={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="px-2">{props.children}</div>
        <Footer />
        {/* float icon */}
        <div
          className="fixed bottom-0 right-0 m-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-gold to-purple-500 px-2 shadow-lg active:shadow-inner md:invisible"
          onClick={triggerSideBar}
        >
          <Bars3BottomLeftIcon className="w-8 text-white" />
        </div>
      </div>
    </NightSwitchContext.Provider>
  );
};

export default Layout;
