import classNames from "classnames";
import React, { FC } from "react";

const HoverBG: FC<{ children: any; class?: string }> = (props) => {
  const c = classNames("rounded-md hover:bg-gray-300 transition", props.class);
  return <div className={c}>{props.children}</div>;
};
export default HoverBG;
