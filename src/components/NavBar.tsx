import React, { FC } from "react";
import { FaAdjust, FaAddressCard, FaArchive } from "react-icons/fa";
import nightwind from "nightwind/helper";
import { Link } from "gatsby";

const rightRoute = [
  { label: "About", url: "/about" },
  { label: "Archive", url: "/archive" },
];

function routeIcon(label: string) {
  switch (label.toLowerCase()) {
    case "about":
      return <FaAddressCard />;
    case "archive":
      return <FaArchive />;
    default:
      return;
  }
}

const NavBar: FC = () => {
  return (
    <div className="flex sticky top-0 backdrop-filter backdrop-blur-lg items-center justify-between w-full mb-4 text-2xl z-30 border-b border-gray-200">
      <div className="mx-5 w-5"></div>
      <div className="flex flex-1 items-center justify-center md:justify-between">
        <Link className="m-3" to="/blog">
          <span className="bg-gradient-to-tl from-gold to-purple-500 bg-clip-text text-transparent font-extrabold">
            FXFX.GRID
          </span>
        </Link>
        <div className="hidden md:flex items-center">
          {rightRoute.map((route) => (
            <Link
              className="text-xl mx-2 text-black font-semibold flex items-center hover:animate-pulse"
              to={route.url}
              key={route.label}
            >
              {routeIcon(route.label)}
              <span className="ml-2">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <FaAdjust
        className="inline mx-5 w-5 h-5 cursor-pointer text-black"
        onClick={() => nightwind.toggle()}
      />

      {/* <div className="absolute top-0 right-0 w-full h-full  bg-gradient-to-b from-blue-600 to-white opacity-50"></div> */}
    </div>
  );
};

export default NavBar;
