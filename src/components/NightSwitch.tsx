import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import classNames from "classnames";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { FaAdjust, FaLaptop, FaMoon, FaSun } from "react-icons/fa";

export type TDarkMode = "dark" | "light" | "system";

export const NightSwitchContext = createContext<{
  dark: TDarkMode;
  setDarkMode: Dispatch<SetStateAction<TDarkMode>>;
}>(null);

const NightSwitch = () => {
  const selector = useRef(null);
  const [showSelector, setShowSelector] = useState(false);
  const { setDarkMode } = useContext(NightSwitchContext);

  useOnClickOutside(selector, () => setShowSelector(false));
  return (
    <>
      <div className="flex items-center">
        <FaAdjust
          className="inline w-5 h-5 cursor-pointer text-black dark:text-white"
          onClick={() => {
            setShowSelector(!showSelector);
          }}
        />
      </div>
      <div className="relative dark:text-white">
        <ul
          ref={selector}
          className={classNames(
            "absolute right-0 mx-2 mt-4 bg-white dark:bg-gray-700 text-sm rounded-lg p-1 border w-36 shadow-lg",
            {
              hidden: !showSelector,
            }
          )}
        >
          <li
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-500 p-1 px-2 rounded-lg"
            onClick={(e) => {
              setDarkMode("light");
              setShowSelector(!showSelector);
            }}
          >
            <FaSun />
            Light Mode
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-500 p-1 px-2 rounded-lg"
            onClick={(e) => {
              setDarkMode("dark");
              setShowSelector(!showSelector);
            }}
          >
            <FaMoon />
            Dark Mode
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-500 p-1 px-2 rounded-lg"
            onClick={(e) => {
              setDarkMode("system");
              setShowSelector(!showSelector);
            }}
          >
            <FaLaptop />
            Follow System
          </li>
        </ul>
      </div>
    </>
  );
};

export default NightSwitch;
