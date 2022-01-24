import React from "react";
import { FaAdjust, FaAddressCard, FaArchive } from "react-icons/fa";
import nightwind from "nightwind/helper";
import { Link } from "gatsby";
import HoverBG from "./HoverBG";
import TrackMouse from "./TrackMouse";
import classNames from "classnames";

const rightRoute = [
  { label: "About", url: "/about", icon: <FaAddressCard /> },
  { label: "Archive", url: "/archive", icon: <FaArchive /> },
];

const NavBar = ({ show }: { show: boolean }) => (
  <div
    className={classNames(
      "h-12 flex sticky top-0 backdrop-filter backdrop-blur-lg items-center justify-between w-full mb-4 text-2xl z-30 shadow px-6 transform transition-transform",
      {
        "-translate-y-full": !show,
      }
    )}
  >
    <div className="flex flex-1 items-center justify-center md:justify-between">
      <Link to="/">
        <span className="bg-gradient-to-tl from-gold to-purple-500 bg-clip-text text-transparent font-extrabold">
          FXFX.GRID
        </span>
      </Link>
      <div className="hidden md:flex items-center">
        {rightRoute.map((route) => (
          <TrackMouse key={route.label}>
            <HoverBG>
              <Link
                className="text-xl mx-2 text-black font-semibold flex items-center"
                to={route.url}
              >
                {route.icon}
                <span className="ml-2">{route.label}</span>
              </Link>
            </HoverBG>
          </TrackMouse>
        ))}
      </div>
    </div>
    <HoverBG class="flex items-center h-8">
      <FaAdjust
        className="inline mx-2 w-5 h-5 cursor-pointer text-black"
        onClick={() => nightwind.toggle()}
      />
    </HoverBG>
  </div>
);

export default NavBar;
