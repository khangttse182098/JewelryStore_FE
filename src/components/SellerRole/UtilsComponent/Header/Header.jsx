import { useContext, useState } from "react";
import classes from "./Header.module.css";
import MahikaLogo from "/assets/Logo.png";
import SellerSidebar from "../SellerSidebar/SellerSidebar";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";
import ResponsiveWrapper from "../../../UtilComponent/ResponsiveWrapper/ResponsiveWrapper";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { userId } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const handleDisplay = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      {userId ? (
        <SellerSidebar visible={visible} onClose={handleDisplay} />
      ) : undefined}
      <div className={classes.header}>
        <nav className={classes.navbar}>
          {userId ? (
            <div className={classes.toggleButton} onClick={handleDisplay}>
              <div className={classes.bar}></div>
              <div className={classes.bar}></div>
              <div className={classes.bar}></div>
            </div>
          ) : undefined}
          <div
            className={`${classes.logoContainer} ${
              !userId ? `${classes["logo-center"]}` : undefined
            }`}
          >
            <img src={MahikaLogo} alt="Mahika Logo" className={classes.logo} />
          </div>
          <div className={classes.toggleButtonInvisible}></div>
        </nav>
      </div>
    </>
  );
};

export default Header;
