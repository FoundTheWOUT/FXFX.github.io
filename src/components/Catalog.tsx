import { header } from "@/types";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import TrackMouse from "./TrackMouse";

type CatalogProps = JSX.IntrinsicElements["div"] & {
  headings: header[];
};

const Catalog = React.forwardRef(function CatalogWithRef(
  { headings, ...rest }: CatalogProps,
  ref
) {
  const [CatalogActive, SetCatalogActive] = useState(null);

  useEffect(() => {
    const handlePostWheel = () => {
      for (let i = headings.length - 1; i >= 0; i--) {
        const tocNode = document.getElementById(headings[i].id);
        if (tocNode) {
          const headerTop = tocNode.getBoundingClientRect().top;
          if (headerTop <= 100) {
            SetCatalogActive(headings[i].id);
            break;
          }
        }
      }
    };
    document.addEventListener("scroll", handlePostWheel);
    return () => {
      document.removeEventListener("scroll", handlePostWheel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <div className="flex flex-col" {...rest}>
      {headings.map((header) => (
        <span
          className={classNames(
            "my-1 transition",
            CatalogActive == header.id
              ? "border-l-4 border-gray-900 dark:border-gray-300"
              : "border-l-2 border-gray-300 dark:border-gray-500",
            {
              "pl-[10px]": header.depth == 2,
              "pl-[20px]": header.depth == 3,
              "pl-[30px]": header.depth == 4,
            }
          )}
          key={header.id}
        >
          <TrackMouse>
            <a
              className={classNames(
                "transition",
                CatalogActive == header.id
                  ? "font-bold text-gray-900 dark:text-gray-300"
                  : "text-gray-300 dark:text-gray-500"
              )}
              href={`#${header.id}`}
            >
              {header.value}
            </a>
          </TrackMouse>
        </span>
      ))}
    </div>
  );
});
export default Catalog;
