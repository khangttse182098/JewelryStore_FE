import React, { useState } from "react";
import classes from "./DoneModal.module.css";
import doneicon from "../../../../public/assets/done.png";
const DoneModal = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className={classes["btn-modal"]}>
        Open
      </button>

      {modal && (
        <div className={classes.modal}>
          <div onClick={toggleModal} className={classes.overlay}></div>
          <div className={classes["modal-content"]}>
            <div className={classes["upper-content"]}>
              <img src={doneicon} alt="Done icon" className={classes.icon} />
              <h2 className={classes.text}>Done</h2>
            </div>
            <div className={classes["lower-content"]}>
              <button className={classes["close-modal"]} onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DoneModal;
