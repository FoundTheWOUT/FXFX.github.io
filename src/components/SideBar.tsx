import React, { FC } from "react";
import { Transition } from "react-transition-group";

interface SideBarProps {
  show: boolean;
  setShowSideBar: any;
}

const rightRoute = [
  { label: "About", url: "/about" },
  { label: "Archive", url: "/archive" },
];

const SideBar: FC<SideBarProps> = (props) => {
  function hideBar(e) {
    if (e.target.id == "SideBarOuter") props.setShowSideBar(false);
  }

  const sideBarContent =
    "transform transition-transform flex justify-center duration-500 flex-col items-center bg-white h-full mr-24";

  const sideBarTransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    // exiting: { opacity: 0.8 },
    exited: { display: "none", opacity: 0 },
  };

  const sideBarContentTransitionClass = {
    entering: " -translate-x-full",
    entered: "",
    exiting: " -translate-x-full",
    exited: " -translate-x-full",
  };

  return (
    <Transition in={props.show} timeout={300}>
      {(state) => (
        <div
          id="SideBarOuter"
          className="transition-opacity fixed top-0 h-full w-full bg-gray-500 z-50 bg-black bg-opacity-25"
          onClick={hideBar}
          style={{ ...sideBarTransitionStyles[state] }}
        >
          <div
            className={sideBarContent + sideBarContentTransitionClass[state]}
          >
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
      )}
    </Transition>
  );
};

export default SideBar;
