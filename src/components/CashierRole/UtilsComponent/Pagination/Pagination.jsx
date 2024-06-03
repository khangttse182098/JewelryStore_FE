import classes from "./Pagination.module.css";

const Pagination = ({
  totalInvoice,
  invoicePerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalInvoice / invoicePerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={classes.pagination}>
      {pages.map((page, index) => {
        return (
          <button
            className={`${classes.button} ${
              page == currentPage ? "active" : ""
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
