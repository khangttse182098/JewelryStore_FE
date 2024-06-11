import classes from "./DropDownAccount.module.css";
import dropdownicon from "/assets/arrow-down-icon.png";
import { useState } from "react";
import LoginPage from "./../../../../page/LoginPage";

const DropDownAccount = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className={classes.dropdown} on onClick={toggleDropDown}>
        <img src={dropdownicon} alt="dropdownicon" />
      </div>
      {isOpen && (
        <div className={classes.dropdowncontent}>
          <button className={classes.dropdownbtn}>Thông tin</button>
          <button className={classes.dropdownbtn} onClick={handleLogOut}>
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};
export default DropDownAccount;
