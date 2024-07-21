import classes from "./DropDownAccount.module.css";
import dropdownicon from "/assets/arrow-down-icon.png";
import { useContext, useState } from "react";

import LoginPage from "./../../../../page/LoginPage";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";

const DropDownAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setUserId, setUserRole } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  function handleClick() {
    if ("Đăng xuất") {
      localStorage.clear();
      setUserId(null);
      setUserRole(null);
      navigate("/");
    }
  }

  return (
    <span>
      <div className={classes.dropdown} on onClick={toggleDropDown}>
        <img src={dropdownicon} alt="dropdownicon" />
      </div>
      {isOpen && (
        <div className={classes.dropdowncontent}>
          <button className={classes.dropdownbtn} onClick={handleClick}>
            Đăng xuất
          </button>
        </div>
      )}
    </span>
  );
};
export default DropDownAccount;
