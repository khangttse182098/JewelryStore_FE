import classes from "./CashierHeader.module.css";
import MahikaLogoImg from "/assets/img-logo.png";
import MahikaLogoText from "/assets/text-logo.png";
import Arrow from "/assets/arrow-down-icon.png";

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
      <img src={Arrow} alt="Arrow" className={classes["arrow-down-icon"]} />
    </div>
  );
};

export default CashierHeader;
