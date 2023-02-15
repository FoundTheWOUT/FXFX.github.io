import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import classNames from "classnames";
import React, { createContext, useContext, useRef, useState } from "react";
import Button from "./styled/Button";
import {
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/20/solid";
import cn from "classnames";

export type TColorScheme = "dark" | "light" | "system";
const modes = [
  { scheme: "light", icon: SunIcon, text: "Light Mode" },
  { scheme: "dark", icon: MoonIcon, text: "dark Mode" },
  {
    scheme: "system",
    icon: ComputerDesktopIcon,
    text: "system Mode",
  },
];

export const NightSwitchContext = createContext<{
  scheme: TColorScheme;
  setScheme: (scheme: TColorScheme) => void;
}>(null);

const NightSwitch = () => {
  const selector = useRef(null);
  const [showSelector, setShowSelector] = useState(false);
  const { scheme, setScheme } = useContext(NightSwitchContext);

  useOnClickOutside(selector, () => setShowSelector(false));
  const Icon = modes.find((mode) => mode.scheme === scheme).icon;

  return (
    <>
      <Button
        className="flex items-center p-2"
        onClick={() => {
          setShowSelector(!showSelector);
        }}
      >
        <ComputerDesktopIcon
          className={cn(
            "inline h-5 w-5 text-black dark:text-white",
            scheme !== "system" && "hidden"
          )}
        />
        <SunIcon
          className={cn(
            "inline h-5 w-5 text-black dark:text-white",
            scheme !== "light" && "hidden"
          )}
        />
        <MoonIcon
          className={cn(
            "inline h-5 w-5 text-black dark:text-white",
            scheme !== "dark" && "hidden"
          )}
        />
      </Button>
      <div className="relative dark:text-white">
        <ul
          ref={selector}
          className={classNames(
            "absolute right-0 mx-2 mt-4 w-36 rounded-lg bg-white p-1 text-sm shadow-lg dark:bg-gray-800",
            {
              hidden: !showSelector,
            }
          )}
        >
          {modes.map(({ icon: Icon, ...item }) => (
            <li key={item.scheme}>
              <Button
                className="flex w-full items-center gap-2 p-1 px-2"
                onClick={() => {
                  setScheme(item.scheme as TColorScheme);
                  setShowSelector(!showSelector);
                }}
              >
                <Icon className="w-5" />
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
