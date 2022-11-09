import React, { useRef, useState, PropsWithChildren } from "react";

const TrackMouse = ({
  children,
  basie,
  ...rest
}: PropsWithChildren<{ basie?: number }>) => {
  const [style, setStyle] = useState({});
  const b = Number.isNaN(basie) ? basie : 10;
  const box = useRef(null);

  const handleMouseMove = (e) => {
    const {
      height: h,
      width: w,
      left: toL,
      top: toT,
    } = box.current.getBoundingClientRect();

    const center = [toL + w / 2, toT + h / 2];
    const _basie = [
      // get mouse position of relative to target Element.
      (b * (e.clientX - center[0]) - w / 2) / w,
      (b * (e.clientY - center[1]) - h / 2) / h,
    ];
    setStyle({
      transform: `translateX(${_basie[0]}px) translateY(${_basie[1]}px)`,
    });
  };
  const handleMouseLeave = () => {
    setStyle({
      transform: `translateX(0px) translateY(0px)`,
    });
  };
  return (
    <div
      className="transition duration-75 h-full"
      onMouseMoveCapture={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      ref={box}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TrackMouse;
