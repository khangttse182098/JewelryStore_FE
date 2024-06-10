import classes from "./DropDownAccount.module.css";
import dropdownicon from "../../../public/assets/arrow-down-icon.png";
const DropDownAccount = () => {
  return (
    <div>
      <div className={classes.dropdown}>
        <img src="dropdownicon" alt="dropdownicon" className={classes.icon} />
      </div>
    </div>
  );
};
