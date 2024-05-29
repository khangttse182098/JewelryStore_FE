import classes from "./DropDownCounter.module.css";
import arrowDown from "/assets/arrowDown.png";

const DropDownCounter = () => {
  return (
    <div className={classes.dropdown}>
      <button className={classes.dropbtn}>
        <p className={classes.text}>Chọn quầy</p>
        <img src={arrowDown} alt="Arrow Down" className={classes.icon} />
      </button>
      <div className={classes["dropdown-content"]}>
        <a href="#">Quầy 1</a>
        <a href="#">Quầy 2</a>
        <a href="#">Quầy 3</a>
        <a href="#">Quầy 4</a>
        <a href="#">Quầy 5</a>
      </div>
    </div>
  );
};

export default DropDownCounter;
