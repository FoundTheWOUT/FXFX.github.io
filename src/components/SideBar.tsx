import classNames from "classnames";
import React, { FC } from "react";
import { Transition } from "react-transition-group";
import { Link } from "gatsby";

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
    if (e.target.dataset.hide) props.setShowSideBar(false);
  }

  const sideBarContent =
    "transform transition-transform flex justify-center duration-500 flex-col items-center bg-white h-full mr-24";

  const sideBarTransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    // exiting: { opacity: 0.8 },
    exited: { display: "none", opacity: 0 },
  };

  const sideBarClass = (state) => {
    return {
      entering: classNames(sideBarContent, "-translate-x-full"),
      entered: classNames(sideBarContent),
      exiting: classNames(sideBarContent, "-translate-x-full"),
      exited: classNames(sideBarContent, "-translate-x-full"),
    }[state];
  };

  return (
    <Transition in={props.show} timeout={300}>
      {(state) => (
        <div
          data-hide
          className="transition-opacity fixed top-0 h-full w-full bg-gray-500 z-50 bg-black bg-opacity-25"
          onClick={hideBar}
          style={{ ...sideBarTransitionStyles[state] }}
        >
          <div className={sideBarClass(state)}>
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
          </div>
        </div>
      )}
    </Transition>
  );
};

export default SideBar;
