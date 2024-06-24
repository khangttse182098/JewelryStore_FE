/* eslint-disable react/prop-types */
import classes from "./PaginationStaffList.module.css";

const PaginationStaffList = ({
  totalStaff,
  staffPerPage,
  setCurrentPage,
  currentPage,
  isStatus,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalStaff / staffPerPage); i++) {
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

export default PaginationStaffList;
