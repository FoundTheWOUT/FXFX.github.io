import classNames from "classnames";
import Link from "next/link";
import React, { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import NightSwitch from "./NightSwitch";
import Image from "next/image";

interface SideBarProps {
  show: boolean;
  setShowSideBar: (status: boolean) => void;
}

const rightRoute = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
];

function SideBar({ show, setShowSideBar }: SideBarProps) {
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
            "fixed top-0 z-40 h-screen w-full  bg-gray-500 bg-opacity-25"
          )}
          onClick={() => setShowSideBar(false)}
        />
      </CSSTransition>

      <aside
        className={classNames(
          "fixed top-0 -left-80 z-50 h-screen w-80 transform transition-transform",
          { "translate-x-full": show }
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-white dark:bg-gray-700 dark:text-white">
          <div className="flex h-48 w-48 flex-col items-center justify-center">
            <Image
              width={80}
              height={80}
              className="translate-y-5 rounded-full border object-cover"
              src="https://www.gravatar.com/avatar/f5ac7b0d2a8c9ad1d58cf61edba08473"
              alt="avatar"
            />
            <span className="m-4 translate-y-5 text-xl font-bold">Waua</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            {rightRoute.map((route) => (
              <Link
                href={route.url}
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
}

export default SideBar;
