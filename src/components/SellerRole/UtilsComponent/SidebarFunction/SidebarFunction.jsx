/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import classes from "./SidebarFunction.module.css";
import { useContext } from "react";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";

const SidebarFunction = ({ icon, title }) => {
  const navigate = useNavigate();
  const { setUserId, setUserRole } = useContext(LoggedInUserContext);
  function handleClick() {
    if (title === "Dịch vụ mua lại") {
      navigate("/purchasepage");
    } else if (title === "Đăng xuất") {
      localStorage.clear();
      setUserId(null);
      setUserRole(null);
      navigate("/");
    } else if (title === "Dịch vụ bán") {
      navigate("/sellpage");
    } else if (title === "Bảng sản phẩm") {
      navigate("/statuslist");
    }
  }

  return (
    <div onClick={handleClick} className={classes.container}>
      <div className={classes["icon-container"]}>
        <img src={icon} className={classes.icon} />
      </div>
      <p className={classes.title}>{title}</p>
    </div>
  );
};

export default SidebarFunction;
