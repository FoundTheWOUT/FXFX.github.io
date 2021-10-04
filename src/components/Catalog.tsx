import classNames from "classnames";
import React, { FC } from "react";
import TrackMouse from "./TrackMouse";

interface header {
  id: string;
  value: string;
  depth: number;
}

interface CatalogProps {
  className: string;
  headers: header[];
  activeId: string;
}

const Catalog: FC<CatalogProps> = (props) => {
  const { headers } = props;
  return (
    <div className={classNames("flex flex-col", props.className)}>
      {headers.map((header) => {
        const c = classNames(
          "my-1 border-l-2",
          props.activeId == header.id ? "border-gray-900" : "border-gray-300",
          {
            "pl-[10px]": header.depth == 2,
            "pl-[20px]": header.depth == 3,
            "pl-[30px]": header.depth == 4,
          }
        );
        return (
          <span className={c}>
            <TrackMouse>
              <a className="font-bold text-black" href={`#${header.id}`}>
                {header.value}
              </a>
            </TrackMouse>
          </span>
        );
      })}
    </div>
  );
};
export default Catalog;
