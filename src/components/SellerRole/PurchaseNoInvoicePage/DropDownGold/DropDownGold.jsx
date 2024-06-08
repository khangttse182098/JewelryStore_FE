import classes from "./DropDownGold.module.css";
import dropdownicon from "/assets/arrowDown.png";
import { useState } from "react";
import GoldType from "../GoldType/GoldType";

const DropDownGold = ({ listGold, selectedValue, onChange }) => {
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
          <p className={classes.text}>{selectedValue || "Chọn loại vàng"}</p>
          <img src={dropdownicon} alt="dropdownicon" className={classes.icon} />
        </button>
        {isOpen && (
          <div className={classes["dropdown-content"]}>
            {listGold.map((type) => (
              <GoldType
                key={type.id}
                type={type}
                onClick={(e) => clickItem(e)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownGold;
