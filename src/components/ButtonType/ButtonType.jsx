import React from "react";
import classes from "./ButtonType.module.css";
import { ProductSelectionContext } from "../../context/ProductSelectionContext";
import { useContext } from "react";

const ButtonType = ({ option, activeOption, onClick, children }) => {
  const [{ selectedCategoryName, setSelectedCategoryName }] = useContext(
    ProductSelectionContext
  );
  function handleClick(e) {
    console.log(setSelectedCategoryName);
    e.preventDefault();
    setSelectedCategoryName(activeOption);
  }
  return (
    <button
      className={`${classes.option} ${
        activeOption === option ? classes.active : ""
      }`}
      onClick={() => onClick(option)}
    >
      <a onClick={handleClick} href="#" className={classes["option-content"]}>
        {children}
      </a>
    </button>
  );
};

export default ButtonType;
