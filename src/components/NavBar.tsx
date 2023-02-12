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

function NavBar() {
  return (
    <div
      className={classNames(
        "sticky top-0 z-30 mx-auto mb-8 flex h-12 transform items-center justify-between px-6 text-2xl shadow backdrop-blur-lg backdrop-filter transition-transform dark:bg-gray-800"
      )}
    >
      <div className="mx-auto flex max-w-[80rem] flex-1 items-center justify-center md:justify-between">
        <Link to="/">
          <span className="bg-gradient-to-tl from-gold to-purple-500 bg-clip-text font-extrabold text-transparent">
            FXFX.GRID
          </span>
        </Link>
        <div className="hidden h-8 items-center md:flex">
          {rightRoute.map((route) => (
            <TrackMouse key={route.label}>
              <Button className="h-full">
                <Link
                  className="mx-2 flex h-full items-center gap-1 text-xl font-semibold text-black dark:text-white"
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
}

export default NavBar;
