import React from "react";
import { FaAddressCard, FaArchive } from "react-icons/fa";
import { Link } from "gatsby";
import Button from "./styled/Button";
import TrackMouse from "./TrackMouse";
import classNames from "classnames";
import NightSwitch from "./NightSwitch";

const rightRoute = [
  { label: "Archive", url: "/archive", icon: <FaArchive /> },
  { label: "About", url: "/about", icon: <FaAddressCard /> },
];

const NavBar = () => (
  // TODO: restyle
  <div
    className={classNames(
      "h-12 flex sticky top-4 mb-8 backdrop-filter backdrop-blur-lg items-center justify-between text-2xl z-30 shadow px-6 transform transition-transform dark:bg-gray-800 max-w-[80rem] mx-auto rounded-lg"
    )}
  >
    <div className="flex flex-1 items-center justify-center md:justify-between">
      <Link to="/">
        <span className="bg-gradient-to-tl from-gold to-purple-500 bg-clip-text text-transparent font-extrabold">
          FXFX.GRID
        </span>
      </Link>
      <div className="hidden h-8 md:flex items-center">
        {rightRoute.map((route) => (
          <TrackMouse key={route.label}>
            <Button className="h-full">
              <Link
                className="h-full text-xl mx-2 text-black font-semibold flex items-center gap-1 dark:text-white"
                to={route.url}
              >
                {route.icon}
                <span>{route.label}</span>
              </Link>
            </Button>
          </TrackMouse>
        ))}
        <NightSwitch />
      </div>
    </div>
  </div>
);

export default NavBar;
