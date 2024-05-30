import classes from "./DropDownCounter.module.css";
import Counter from "../Counter/Counter";
import arrowDown from "/assets/arrowDown.png";

const DropDownCounter = ({ listCounter }) => {
  return (
    <div>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>
          <p className={classes.text}>Chọn quầy</p>
          <img src={arrowDown} alt="Arrow Down" className={classes.icon} />
        </button>
      </div>
      {listCounter.map((counter) => (
        <Counter key={counter.id} counter={counter} />
      ))}
    </div>
  );
};

export default DropDownCounter;
