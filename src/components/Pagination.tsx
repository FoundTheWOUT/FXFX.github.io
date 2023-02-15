import Link from "next/link";
import React from "react";

const linkClass =
  "text-black bg-white py-2 px-6 rounded-lg font-semibold shadow-lg active:shadow-none transition";
export interface PageContext {
  currentPage: number;
  postListPages: number;
}

const Pagination = (props: { pageContext: PageContext }) => {
  const { currentPage, postListPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === postListPages;
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
  const nextPage = currentPage.toString();
  return (
    <div className="flex justify-between">
      {/* left */}
      {!isFirst ? (
        <Link href={prevPage}>
          <div className={linkClass}>Prev</div>
        </Link>
      ) : (
        <div></div>
      )}
      {/* right */}
      {!isLast ? (
        <Link href={nextPage}>
          <div className={linkClass}>Next</div>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pagination;
