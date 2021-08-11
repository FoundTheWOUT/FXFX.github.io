import { Link } from "gatsby";
import React from "react";

const linkClass = "text-black bg-white py-2 px-6 rounded-lg font-semibold shadow-lg active:shadow-none transition";

const Pagination = (props) => {
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();
  return (
    <div className="flex justify-between">
      {/* left */}
      {!isFirst ? (
        <Link to={prevPage}>
          <div className={linkClass}>Prev</div>
        </Link>
      ) : (
        <div></div>
      )}
      {/* right */}
      {!isLast ? (
        <Link to={nextPage}>
          <div className={linkClass}>Next</div>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pagination;
