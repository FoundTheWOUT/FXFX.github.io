import classNames from "classnames";
import React, { FC, useState } from "react";
import "./ImgLazy.css";

const ImgLazy: FC<{ class?: string; src: string }> = (props) => {
  const [isLoading, setLoading] = useState(true);
  const handleOnLoad = () => {
    setLoading(false);
  };
  const figureClass = classNames("w-full h-full", { loading: isLoading });
  return (
    <div className="w-full h-full">
      <figure className={figureClass} hidden={!isLoading}></figure>
      <img
        className="h-full w-full object-cover"
        src={props.src}
        onLoad={handleOnLoad}
      />
    </div>
  );
};

export default ImgLazy;
