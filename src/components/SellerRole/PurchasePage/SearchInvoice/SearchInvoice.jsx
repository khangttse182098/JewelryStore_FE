/* eslint-disable react/prop-types */
import classes from "./SearchInvoice.module.css";
import SearchIcon from "/assets/Vector.png";

const SearchInvoice = ({ setSearchResult }) => {
  function handleChange(event) {
    event.preventDefault();
    setSearchResult(event.target.value);
  }

  return (
    <div className={classes.container}>
      <img
        src={SearchIcon}
        alt="Search Icon"
        className={`${classes["search-icon"]} ${classes.img}`}
      />
      <input
        type="search"
        placeholder="Nhập mã đơn hàng..."
        className={classes.search}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInvoice;
