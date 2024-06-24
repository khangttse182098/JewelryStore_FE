import classes from "./DropdownClarity.module.css";
import arrowDown from "../../../../../../../public/assets/arrow-down-icon.png";
import arrowUp from "../../../../../../../public/assets/arrow-up-icon.png";
import { useState } from "react";
import Clarity from "../../DiamondCriteria/Clarity";

const DropDownClarity = ({ listClarity, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const clickItem = (e) => {
    onChange(e);
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn} onClick={toggleDropDown}>
          <p className={classes.text}>
            {selectedValue || "Chọn độ tinh khiết"}
          </p>
          {!isOpen ? (
            <img src={arrowDown} alt="Arrow Down" className={classes.icon} />
          ) : (
            <img src={arrowUp} alt="Arrow Up" className={classes.icon} />
          )}
        </button>
        {isOpen && (
          <div className={classes["dropdown-content"]}>
            {listClarity.map((type, index) => (
              <Clarity key={index} type={type} onClick={(e) => clickItem(e)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default DropDownClarity;
