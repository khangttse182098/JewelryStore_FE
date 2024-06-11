import classes from "./CashierHeader.module.css";
import MahikaLogoImg from "/assets/img-logo.png";
import MahikaLogoText from "/assets/text-logo.png";
import DropDownAccount from "../DropDownAccount/DropDownAccount";

const CashierHeader = () => {
  const handleUser = () => {
    fetch("http://mahika.foundation:8080/swp/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataUser) => setListGold(dataUser))
      .catch((error) => console.log(error));
  };

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
