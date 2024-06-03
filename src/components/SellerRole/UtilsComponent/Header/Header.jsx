import { useState } from "react";
import classes from "./Header.module.css";
import MahikaLogo from "/assets/Logo.png";
import SellerSidebar from "../SellerSidebar/SellerSidebar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleDisplay = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <SellerSidebar visible={visible} onClose={handleDisplay} />
      <div className={classes.header}>
        <nav className={classes.navbar}>
          <div className={classes.toggleButton} onClick={handleDisplay}>
            <div className={classes.bar}></div>
            <div className={classes.bar}></div>
            <div className={classes.bar}></div>
          </div>
          <div className={classes.logoContainer}>
            <img src={MahikaLogo} alt="Mahika Logo" className={classes.logo} />
          </div>
          <div className={classes.toggleButtonInvisible}></div>
        </nav>
      </div>
    </>
  );
};

export default Header;
