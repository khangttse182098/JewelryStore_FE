import React from "react";
import warningIcon from "/assets/warning.png";
import classes from "./NotAllowed.module.css";
import { useNavigate } from "react-router-dom";
const NotAllowed = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={`${classes["modal-content"]}`}>
        <div className={classes["upper-content"]}>
          <img src={warningIcon} alt="warning icon" className={classes.icon} />
          <h2 className={classes.text}>Phải đăng nhập trước khi truy cập!</h2>
        </div>
        <div className={classes["lower-content"]}>
          <button
            className={classes["close-modal"]}
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;
