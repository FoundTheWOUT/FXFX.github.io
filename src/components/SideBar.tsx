import classNames from "classnames";
import React, { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "gatsby";
import NightSwitch from "./NightSwitch";
import { StaticImage } from "gatsby-plugin-image";

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
  const nodeRef = useRef(null);

  return (
    <>
      {/* mask */}
      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        timeout={300}
        classNames="fade"
        unmountOnExit={true}
      >
        <div
          ref={nodeRef}
          className={classNames(
            "fixed top-0 h-screen w-full bg-gray-500  bg-opacity-25 z-40"
          )}
          onClick={() => setShowSideBar(false)}
        />
      </CSSTransition>

      <aside
        className={classNames(
          "fixed top-0 -left-80 h-screen transform transition-transform w-80 z-50",
          { "translate-x-full": show }
        )}
      >
        <div className="flex flex-col justify-center items-center h-full bg-white dark:bg-gray-700 dark:text-white gap-4">
          <div className="w-48 h-48 flex flex-col items-center justify-center">
            <StaticImage
              className="h-20 w-20 rounded-full object-cover border translate-y-5"
              src="https://www.gravatar.com/avatar/f5ac7b0d2a8c9ad1d58cf61edba08473"
              alt="avatar"
            />
            <span className="m-4 text-xl font-bold translate-y-5">Waua</span>
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
  );
};

export default SideBar;
