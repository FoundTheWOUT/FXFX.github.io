import classNames from "classnames";
import React, { useState, useEffect } from "react";
import TrackMouse from "./TrackMouse";
import GithubSlugger from "github-slugger";

interface header {
  value: string;
  depth: number;
  id?: string;
}

type CatalogProps = JSX.IntrinsicElements["div"] & {
  headings: header[];
  postReference: React.MutableRefObject<any>;
};

const Catalog = ({ headings, postReference, ...props }: CatalogProps) => {
  const slugger = new GithubSlugger();
  slugger.reset();

  headings = headings.map((header) => {
    slugger.reset();
    return {
      ...header,
      id: slugger.slug(header.value),
    };
  });

  const [CatalogActive, SetCatalogActive] = useState(null);
  useEffect(() => {
    document.addEventListener("scroll", handlePostWheel);
    return () => {
      document.removeEventListener("scroll", handlePostWheel);
    };
  }, [postReference]);
  const handlePostWheel = () => {
    for (let i = headings.length - 1; i >= 0; i--) {
      const headerTop = document
        .getElementById(headings[i].id)
        .getBoundingClientRect().top;
      if (headerTop <= 100) {
        SetCatalogActive(headings[i].id);
        break;
      }
    }
  };

  return (
    <div className="flex flex-col" {...props}>
      {headings.map((header) => (
        <span
          className={classNames(
            "my-1 transition",
            CatalogActive == header.id
              ? "border-gray-900 dark:border-gray-300 border-l-4"
              : "border-gray-300 dark:border-gray-500 border-l-2",
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
                  ? "text-gray-900 dark:text-gray-300 font-bold"
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
};
export default Catalog;
