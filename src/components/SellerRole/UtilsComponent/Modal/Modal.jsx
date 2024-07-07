import classes from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className={classes["modal-container"]}>
      <div className={classes.modal}>
        <div className={classes["modal-header"]}>
          <p className={classes.close} onClick={() => onClose()}>
            &times;
          </p>
        </div>
        <div className={classes["modal-content"]}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
