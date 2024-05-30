import React from "react";
import classes from "./ButtonType.module.css";

const ButtonType = ({ option, activeOption, onClick, children }) => {
  return (
    <button
      className={`${classes.option} ${
        activeOption === option ? classes.active : ""
      }`}
      onClick={() => onClick(option)}
    >
      <a href="#" className={classes["option-content"]}>
        {children}
      </a>
    </button>
  );
};

export default ButtonType;
