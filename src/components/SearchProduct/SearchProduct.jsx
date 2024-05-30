import { useState } from "react";
import classes from "./SearchProduct.module.css";
import SearchIcon from "./Vector.png";

const SearchProduct = ({ placeholder, onChangeHandler }) => {
  return (
    <div className={classes.container}>
      <span className={classes["search-icon"]}>
        <img src={SearchIcon} alt="Search Icon" />
      </span>
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
