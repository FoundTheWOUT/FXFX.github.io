import React, { FC, useEffect, useRef, useState } from "react";

const TrackMouse: FC<{ children: any; basie?: number }> = ({
  children,
  basie,
}) => {
  const [style, setStyle] = useState({});
  const b = Number.isNaN(basie) ? 10 : basie;

  const handleMouseMove = (e) => {
    const {
      height: h,
      width: w,
      left: toL,
      top: toT,
    } = e.target.getBoundingClientRect();

    const center = [toL + w / 2, toT + h / 2];
    const _basie = [
      // get mouse position of relative to target Element.
      (b * (e.pageX - center[0]) - w / 2) / w,
      (b * (e.pageY - center[1]) - h / 2) / h,
    ];
    setStyle({
      transform: `translateX(${_basie[0]}px) translateY(${_basie[1]}px)`,
    });
  };
  const handleMouseLeave = () => {
    setStyle({
      transform: `translateX(0px) translateY(0px)`,
      transition: "all 0.5s",
    });
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {children}
    </div>
  );
};

export default TrackMouse;
