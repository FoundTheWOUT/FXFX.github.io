import React, { FC } from "react";

interface SideBarProps {
  show: boolean;
  setShowSideBar: any;
}

const rightRoute = [
  { label: "About", url: "/about" },
  { label: "Archive", url: "/archive" },
];

const SideBar: FC<SideBarProps> = (props) => {
  let className =
    "fixed top-0 transform h-screen w-3/5 bg-gray-500 transition duration-700 z-50";
  let maskClass = "z-40 fixed top-0 h-full w-full bg-gray-300 transition";
  if (!props.show) {
    className += " -translate-x-full";
  }
  props.show ? (maskClass += " opacity-60") : (maskClass += " hidden");

  function hideBar() {
    props.setShowSideBar(false);
  }

  return (
    <>
      <div className={className}>
        <div className="flex flex-col items-center mt-36 h-full">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="/images/waua.jpg"
          />
          <span className="text-xl font-bold text-white">Waua</span>
          {rightRoute.map((route) => (
            <span key={route.label}>{route.label}</span>
          ))}
        </div>
      </div>
      <div className={maskClass} onClick={hideBar}></div>
    </>
  );
};

export default SideBar;
