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

  const [CatalogOffset, SetCatalogOffset] = useState(0);
  const [CatalogActive, SetCatalogActive] = useState(null);
  useEffect(() => {
    document.addEventListener("scroll", handlePostWheel);
    return () => {
      document.removeEventListener("scroll", handlePostWheel);
    };
  }, [postReference]);
  const handlePostWheel = () => {
    const { top } = postReference.current.getBoundingClientRect();
    top < 0 ? SetCatalogOffset(-top) : SetCatalogOffset(0);

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
    <div
      {...props}
      style={{ transform: `translate(calc(100% + 10px),${CatalogOffset}px)` }}
    >
      {headings.map((header) => (
        <span
          className={classNames(
            "my-1 border-l-2",
            CatalogActive == header.id ? "border-gray-900" : "border-gray-300",
            {
              "pl-[10px]": header.depth == 2,
              "pl-[20px]": header.depth == 3,
              "pl-[30px]": header.depth == 4,
            }
          )}
          key={header.id}
        >
          <TrackMouse>
            <a className="font-bold text-black" href={`#${header.id}`}>
              {header.value}
            </a>
          </TrackMouse>
        </span>
      ))}
    </div>
  );
};
export default Catalog;
