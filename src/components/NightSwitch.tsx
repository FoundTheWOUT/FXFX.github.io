import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { FaAdjust, FaLaptop, FaMoon, FaSun } from "react-icons/fa";

const NightSwitch = () => {
  const selector = useRef(null);
  const [showSelector, setShowSelector] = useState(false);

  useOnClickOutside(selector, () => setShowSelector(false));
  return (
    <div className="relative">
      <FaAdjust
        className="inline mx-2 w-5 h-5 cursor-pointer text-black"
        onClick={() => {
          setShowSelector(!showSelector);
        }}
      />
      <ul
        ref={selector}
        className={classNames(
          "absolute right-0 mx-2 mt-4 bg-white text-sm rounded-lg p-1 border w-36 shadow-lg",
          {
            hidden: !showSelector,
          }
        )}
      >
        <li
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 p-1 px-2 rounded-lg"
          onClick={(e) => {}}
        >
          <FaSun />
          Light Mode
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 p-1 px-2 rounded-lg"
          onClick={(e) => {}}
        >
          <FaMoon />
          Dark Mode
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 p-1 px-2 rounded-lg"
          onClick={(e) => {}}
        >
          <FaLaptop />
          Follow System
        </li>
      </ul>
    </div>
  );
};

export default NightSwitch;
