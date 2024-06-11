import classes from "./CashierHeader.module.css";
import MahikaLogoImg from "/assets/img-logo.png";
import MahikaLogoText from "/assets/text-logo.png";
import DropDownAccount from "../DropDownAccount/DropDownAccount";
import React, { useState, useEffect } from "react";

const CashierHeader = () => {
  const [cashierName, setCashierName] = useState([]);
  const handleUser = () => {
    fetch("http://mahika.foundation:8080/swp/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataUser) => {
        const cashierList = dataUser.filter((user) => user.role === "Thu ngân");
        const name = cashierList.map((user) => user.fullName);
        setCashierName(name);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    handleUser();
  }, []);

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
        {cashierName.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
      </div>
      <DropDownAccount />
    </div>
  );
};

export default CashierHeader;
