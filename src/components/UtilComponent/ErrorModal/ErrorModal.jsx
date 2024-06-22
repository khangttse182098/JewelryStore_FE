import React, { forwardRef, useState } from "react";
import classes from "./ErrorModal.module.css";
import erroricon from "/assets/close.png";

const ErrorModal = forwardRef(function ErrorModal({ handleClose, msg }, ref) {
  return (
    <>
      <dialog ref={ref} className={`${classes["modal-content"]}`}>
        <div className={classes["upper-content"]}>
          <div className={classes.icon}>
            <img src={erroricon} alt="Error icon" />
          </div>
          <h2 className={classes.text}>{msg}</h2>
        </div>
        <div className={classes["lower-content"]}>
          <button className={classes["close-modal"]} onClick={handleClose}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
});

export default ErrorModal;
