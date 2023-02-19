import React from "react";
import "./Pagination.css";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

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

  const cleanProperties = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  if (totalProperty === 0) {
    return (
      <div className="notification is-warning mt-6 pt-6">
        <h1 className="pb-3">
          No hay propiedades que mostrar. Al parecer NINGUNA propiedad tiene las
          caracteristicas que elegiste en los filtros
        </h1>
        <Link
          to="/home"
          onClick={cleanProperties}
          style={{ textDecoration: "none" }}
        >
          <button className="button is-link">
            Volver a la lista de propiedades
          </button>
        </Link>
      </div>
    );
    // } else if (!totalProperty) {
    //   return (
    //     <Loader />
    //   )
    // }
  }

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
          <li>{/* <span class="pagination-ellipsis">&hellip;</span> */}</li>
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
          <li>{/* <span class="pagination-ellipsis">&hellip;</span> */}</li>
        </ul>
      </nav>
    </div>
  );
};
