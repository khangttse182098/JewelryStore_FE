import classes from "./DropDownAccount.module.css";
import dropdownicon from "/assets/arrow-down-icon.png";
import { useState } from "react";

import LoginPage from "./../../../../page/LoginPage";
import { useNavigate } from "react-router-dom";

const DropDownAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  function handleClick() {
    if ("Đăng xuất") {
      navigate("/");
    }
  }

  return (
    <div>
      <div className={classes.dropdown} on onClick={toggleDropDown}>
        <img src={dropdownicon} alt="dropdownicon" />
      </div>
      {isOpen && (
        <div className={classes.dropdowncontent}>
          <button className={classes.dropdownbtn}>Thông tin</button>
          <button className={classes.dropdownbtn} onClick={handleClick}>
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};
export default DropDownAccount;
