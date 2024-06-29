import React, { forwardRef, useState } from "react";
import classes from "./DoneModal.module.css";
import doneicon from "/assets/done.png";

const DoneModal = forwardRef(function DoneModal({ handleClose }, ref) {
  return (
    <>
      <dialog ref={ref} className={`${classes["modal-content"]}`}>
        <div className={classes["upper-content"]}>
          <img src={doneicon} alt="Done icon" className={classes.icon} />
          <h2 className={classes.text}>Thành công</h2>
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

export default DoneModal;
