import classNames from "classnames";
import React, { PropsWithChildren } from "react";

const HoverBG = ({
  children,
  ...props
}: PropsWithChildren<{ class?: string }>) => {
  const c = classNames("rounded-md hover:bg-gray-300 transition", props.class);
  return <div className={c}>{children}</div>;
};
export default HoverBG;
