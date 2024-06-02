/* eslint-disable react/prop-types */
import classes from "./SidebarFunction.module.css";

const SidebarFunction = ({ icon, title }) => {
  return (
    <div className={classes.container}>
      <div className={classes["icon-container"]}>
        {/* <img src={icon} /> */}
      </div>
      <p className={classes.title}>{title}</p>
    </div>
  );
};

export default SidebarFunction;
