/* eslint-disable react/prop-types */
import classes from "./Pagination.module.css";

const Pagination = ({
  totalInvoice,
  invoicePerPage,
  setCurrentPage,
  currentPage,
  isStatus,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalInvoice / invoicePerPage); i++) {
    pages.push(i);
  }

  const styleButton = isStatus ? classes["active-status"] : classes.active;

  return (
    <div className={classes.pagination}>
      {pages.map((page, index) => {
        return (
          <button
            className={`${classes.button} ${
              page == currentPage ? styleButton : ""
            }`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
