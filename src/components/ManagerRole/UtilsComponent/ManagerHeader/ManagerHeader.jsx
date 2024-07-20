import MahikaLogoImg from "/assets/managerLogo.png";
import MahikaLogoText from "/assets/text-logo.png";
import Arrow from "/assets/arrow-down-icon.png";
import DropDownAccount from "../../../CashierRole/UtilsComponent/DropDownAccount/DropDownAccount";
import { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";
import classes from "./ManagerHeader.module.css";

const ManagerHeader = () => {
  // return (
  //   <div className="bg-white flex justify-between p-3">
  //     <div className="flex">
  //       <img src={MahikaLogoImg} alt="Mahika Logo" />
  //       <img src={MahikaLogoText} alt="Mahika Logo" className="h-12 mt-3" />
  //     </div>
  //     <div className="flex items-center mr-10">
  //       <p className="text-lg font-medium mr-5">Pham Hoang Phuc</p>
  //       <img src={Arrow} alt="Arrow" className="size-5" />
  //     </div>
  //   </div>
  // );

  const [managerName, setManagerName] = useState([]);
  const { userId, setUserId, setUserRole } = useContext(LoggedInUserContext);
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
        setManagerName(name);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div className="bg-white flex justify-normal p-3">
      <div className="flex">
        <img src={MahikaLogoImg} alt="Mahika Logo" />
        <img src={MahikaLogoText} alt="Mahika Logo" className="h-12 mt-3" />
      </div>

      <div className={classes.name}>
        {managerName.map((name, index) => (
          <p key={index}></p>
        ))}
      </div>
      <DropDownAccount className={classes.dropdown} />
    </div>
  );
};

export default ManagerHeader;
