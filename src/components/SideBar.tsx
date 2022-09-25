import classNames from "classnames";
import React, { FC } from "react";
import { Transition } from "react-transition-group";
import { Link } from "gatsby";
import NightSwitch from "./NightSwitch";

interface SideBarProps {
  show: boolean;
  setShowSideBar: (status: boolean) => void;
}

const rightRoute = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Archive", url: "/archive" },
];

const SideBar: FC<SideBarProps> = ({ show, setShowSideBar }) => {
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
              "fixed top-0 transition-opacity duration-300 h-screen w-full bg-gray-500  bg-opacity-25 z-40",
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
            <div className="flex flex-col justify-center items-center h-full bg-white dark:bg-gray-700 dark:text-white gap-4">
              <div className="w-48 h-48 flex flex-col items-center justify-center">
                <img
                  className="h-20 w-20 rounded-full object-cover border translate-y-5"
                  src="/images/waua.webp"
                />
                <span className="m-4 text-xl font-bold translate-y-5">
                  Waua
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                {rightRoute.map((route) => (
                  <Link
                    to={route.url}
                    key={route.label}
                    onClick={() => setShowSideBar(false)}
                  >
                    <span data-hide key={route.label}>
                      {route.label}
                    </span>
                  </Link>
                ))}
                <NightSwitch />
              </div>
            </div>
          </aside>
        </>
      )}
    </Transition>
  );
};

export default SideBar;
