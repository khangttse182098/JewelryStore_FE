import classes from "./CashierHeader.module.css";
import MahikaLogoImg from "/assets/img-logo.png";
import MahikaLogoText from "/assets/text-logo.png";
import DropDownAccount from "../DropDownAccount/DropDownAccount";

const CashierHeader = () => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img
          src={MahikaLogoImg}
          alt="Mahika Logo"
          className={classes["img-logo"]}
        />
        <img
          src={MahikaLogoText}
          alt="Mahika Logo"
          className={classes["text-logo"]}
        />
      </div>

      <div className={classes.name}>
        <p>Pham Hoang Phuc</p>
      </div>
      <DropDownAccount className={classes.dropdown} />
    </div>
  );
};

export default CashierHeader;
