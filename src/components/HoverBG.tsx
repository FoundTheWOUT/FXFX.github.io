import classNames from "classnames";
import React, { PropsWithChildren } from "react";

const HoverBG = ({
  children,
  ...props
}: PropsWithChildren<{ class?: string }>) => {
  return (
    <div
      className={classNames(
        "rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition",
        props.class
      )}
    >
      {children}
    </div>
  );
};
export default HoverBG;
