import classes from "./MaterialListDropDown.module.css";
import arrowDown from "/assets/arrow-down-icon.png";
import arrowUp from "/assets/arrow-up-icon.png";
import { useState, useContext } from "react";

const MaterialListDropDown = ({ materialList, handleSelectMaterial }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  function handleClick(id) {
    handleSelectMaterial(id);
  }

  return (
    <div className={classes.dropdown}>
      <button className={classes.dropbtn} onClick={toggleDropDown}>
        <p className={classes.text}>Chọn loại vàng</p>
        {!isOpen ? (
          <img src={arrowDown} alt="Arrow Down" className={classes.icon} />
        ) : (
          <img src={arrowUp} alt="Arrow Up" className={classes.icon} />
        )}
      </button>
      {isOpen && (
        <div className={classes["dropdown-content"]}>
          {materialList.map((material) => (
            <div key={material.id} className={classes.counterItem}>
              <a onClick={() => handleClick(material.id)}>{material.name}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialListDropDown;
