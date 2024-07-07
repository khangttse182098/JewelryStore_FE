import MahikaLogoImg from "/assets/managerLogo.png";
import MahikaLogoText from "/assets/text-logo.png";
import DropDownAccount from "../DropDownAccount/DropDownAccount";
import React, { useState, useEffect, useContext } from "react";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";
import classes from "./CashierHeader.module.css";

const CashierHeader = () => {
  const [cashierName, setCashierName] = useState([]);
  const { userId } = useContext(LoggedInUserContext);
  const handleUser = () => {
    fetch("http://mahika.foundation:8080/swp/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataUser) => {
        const cashierList = dataUser.filter((user) => user.id === userId);
        const name = cashierList.map((user) => user.fullName);
        setCashierName(name);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div className="bg-white flex justify-between p-3">
      <div className="flex">
        <img src={MahikaLogoImg} alt="Mahika Logo" />
        <img src={MahikaLogoText} alt="Mahika Logo" className="h-12 mt-3" />
      </div>

      <div className={classes.name}>
        {cashierName.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
      </div>
      <DropDownAccount className={classes.dropdown} />
    </div>
  );
};

export default CashierHeader;
