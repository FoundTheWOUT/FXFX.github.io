import TrackMouse from "@/components/TrackMouse";
import React, { FC } from "react";

const bangumi: FC<null> = (props) => {
  const bangumis = [
    { name: "物语系列" },
    { name: "东京饭店" },
    { name: "物语系列" },
    { name: "东京饭店" },
    { name: "物语系列" },
    { name: "东京饭店" },
  ];
  return (
    <div className="flex">
      {bangumis.map((bgs, idx) => (
        <div className="m-4" key={idx}>
          <TrackMouse>
            <img
              className="h-32 cursor-pointer rounded-lg transition hover:shadow-2xl"
              src="https://source.unsplash.com/random"
            />
          </TrackMouse>
          <span>{bgs.name}</span>
        </div>
      ))}
    </div>
  );
};

export default bangumi;
