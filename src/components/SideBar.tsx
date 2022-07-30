import classNames from "classnames";
import React, { FC } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { Link } from "gatsby";
import NightSwitch from "./NightSwitch";

interface SideBarProps {
  show: boolean;
  setShowSideBar: (status: boolean) => void;
}

const rightRoute = [
  { label: "About", url: "/about" },
  { label: "Archive", url: "/archive" },
];

const SideBar: FC<SideBarProps> = ({ show, setShowSideBar }) => {
  function hideBar(e: React.MouseEvent) {
    if (e.target === e.currentTarget) setShowSideBar(false);
  }

  const sideBarContent =
    "transform transition-transform flex justify-center duration-500 flex-col items-center bg-white h-full mr-24";

  const sideBarTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { display: "none" },
  };

  return (
    <Transition in={show} timeout={300}>
      {(state) => (
        <>
          {/* mask */}
          <div
            className={classNames(
              "fixed top-0 transition-opacity duration-300 h-screen w-full bg-gray-500 bg-black bg-opacity-25 z-40",
              // show ? "opacity-100" : "opacity-0",
              {
                // hidden: state === "exited",
              }
            )}
            onClick={() => setShowSideBar(false)}
            style={{ ...sideBarTransitionStyles[state] }}
          />
          <aside
            className={classNames(
              "fixed top-0 h-screen transform transition-transform w-80 z-50",
              {
                "-translate-x-full": !show,
              }
            )}
          >
            <div className="flex justify-center flex-col items-center h-full bg-white">
              <img
                className="h-20 w-20 rounded-full object-cover border"
                src="/images/waua.jpg"
              />
              <span className="m-4 text-xl font-bold">Waua</span>
              {rightRoute.map((route) => (
                <Link to={route.url} key={route.label} onClick={hideBar}>
                  <span data-hide key={route.label}>
                    {route.label}
                  </span>
                </Link>
              ))}
              <NightSwitch />
            </div>
          </aside>
        </>
      )}
    </Transition>
  );
};

export default SideBar;
