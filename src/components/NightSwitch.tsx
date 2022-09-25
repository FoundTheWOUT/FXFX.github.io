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
import Button from "./styled/Button";

export type TColorScheme = "dark" | "light" | "system";

export const NightSwitchContext = createContext<{
  scheme: TColorScheme;
  setScheme: Dispatch<SetStateAction<TColorScheme>>;
}>(null);

const NightSwitch = () => {
  const selector = useRef(null);
  const [showSelector, setShowSelector] = useState(false);
  const { setScheme: setDarkMode } = useContext(NightSwitchContext);

  useOnClickOutside(selector, () => setShowSelector(false));
  return (
    <>
      <Button
        className="flex items-center p-2"
        onClick={() => {
          setShowSelector(!showSelector);
        }}
      >
        <FaAdjust className="inline w-5 h-5 text-black dark:text-white" />
      </Button>
      <div className="relative dark:text-white">
        <ul
          ref={selector}
          className={classNames(
            "absolute right-0 mx-2 mt-4 bg-white dark:bg-gray-800 text-sm rounded-lg p-1 w-36 shadow-lg",
            {
              hidden: !showSelector,
            }
          )}
        >
          {[
            { scheme: "light", icon: <FaSun />, text: "Light Mode" },
            { scheme: "dark", icon: <FaMoon />, text: "dark Mode" },
            { scheme: "system", icon: <FaLaptop />, text: "system Mode" },
          ].map((item) => (
            <li>
              <Button
                className="flex w-full items-center gap-2 p-1 px-2"
                onClick={() => {
                  setDarkMode(item.scheme as TColorScheme);
                  setShowSelector(!showSelector);
                }}
              >
                {item.icon}
                {item.text}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NightSwitch;
