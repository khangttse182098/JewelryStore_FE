/* eslint-disable react/prop-types */
import classes from "./SearchProduct.module.css";
import SearchIcon from "./Vector.png";

const SearchProduct = ({ placeholder, onChangeHandler }) => {
  return (
    <div className={classes.container}>
      <img
        src={SearchIcon}
        alt="Search Icon"
        className={classes["search-icon"]}
      />
      <input
        className={classes["search-box"]}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SearchProduct;
