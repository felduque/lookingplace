import React from "react";
import "./Pagination.css";

export const Pagination = ({
  propertyPerPage,
  currentPage,
  setCurrentPage,
  totalProperty,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalProperty / propertyPerPage); i++) {
    pageNumber.push(i);
  }

  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div>
      <div className="center-pagination-next">
        <p>{`${
          currentPage * propertyPerPage < totalProperty
            ? currentPage * propertyPerPage
            : totalProperty
        } / ${totalProperty} propiedades`}</p>
      </div>
      <nav
        className="pagination is-centered mb-6"
        role="navigation"
        aria-label="pagination"
      >
        <button
          disabled={currentPage === 1 ? true : false}
          className={`pagination-previous button is-info is-outlined ${
            currentPage === 1 ? "is-disabled" : ""
          }`}
          onClick={onPreviusPage}
        >
          Anterior
        </button>
        <button
          disabled={currentPage >= pageNumber.length ? true : false}
          className={`pagination-next button is-info is-outlined space-right-next ${
            currentPage >= pageNumber.length ? "is-disabled" : ""
          }`}
          onClick={onNextPage}
        >
          Siguiente
        </button>
        <ul className="pagination-list">
          <li>
            {/* <span class="pagination-ellipsis">&hellip;</span> */}
          </li>
          {pageNumber.map((noPage) => {
            return noPage < currentPage - 2 ||
              noPage > currentPage + 2 ? null : (
              <li key={noPage}>
                <button
                  className={`pagination-link button is-outlined${
                    noPage === currentPage ? "button is-info" : ""
                  }`}
                  onClick={() => onSpecificPage(noPage)}
                >
                  {noPage}
                </button>
              </li>
            );
          })}
          <li>
            {/* <span class="pagination-ellipsis">&hellip;</span> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};
