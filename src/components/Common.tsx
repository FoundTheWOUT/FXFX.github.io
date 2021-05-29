import React from "react";
import { FC } from "react";

const Common: FC = (props) => {
  return (
    <div>
      <div>hi</div>
      {props.children}
    </div>
  );
};

export default Common;
