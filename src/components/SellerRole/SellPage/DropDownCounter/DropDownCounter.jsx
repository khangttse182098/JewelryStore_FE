import classes from "./DropDownCounter.module.css";
import Counter from "../Counter/Counter";
import arrowDown from "/assets/arrowDown.png";
import { useState, useContext } from "react";
import { ProductSelectionContext } from "../../../../context/ProductSelectionContext";

const DropDownCounter = ({ listCounter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    counter: { selectedCounter },
  } = useContext(ProductSelectionContext);
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn} onClick={toggleDropDown}>
          <p className={classes.text}>
            {selectedCounter === "Chọn quầy"
              ? "Chọn quầy"
              : `Quầy ${selectedCounter}`}
          </p>
          <img src={arrowDown} alt="Arrow Down" className={classes.icon} />
        </button>
        {isOpen && (
          <div className={classes["dropdown-content"]}>
            {listCounter.map((counter) => (
              <Counter key={counter.id} counter={counter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownCounter;
