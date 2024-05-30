import React from "react";
import classes from "./ButtonType.module.css";
import { ProductSelectionContext } from "../../context/ProductSelectionContext";
import { useContext } from "react";

const ButtonType = ({ option, activeOption, onClick, children }) => {
  const {
    categoryName: { selectedCategoryName, setSelectedCategoryName },
  } = useContext(ProductSelectionContext);
  function handleClick(e) {
    e.preventDefault();
    setSelectedCategoryName(option);
  }

  return (
    <button
      className={`${classes.option} ${
        activeOption === option ? classes.active : ""
      }`}
      // onClick={() => onClick(option)}
      onClick={(e) => {
        onClick(option);
        handleClick(e);
      }}
    >
      <span className={classes["option-content"]}>{children}</span>
    </button>
  );
};

export default ButtonType;
