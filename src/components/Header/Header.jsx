import classes from "./Header.module.css";
import MahikaLogo from "/assets/Logo.png";

const Header = () => {
  return (
    <div className={classes.header}>
      <nav className={classes.navbar}>
<<<<<<< HEAD
        <div className={classes.toggleButton}>
          <div className={classes.bar}></div>
          <div className={classes.bar}></div>
          <div className={classes.bar}></div>
        </div>
        <div className={classes.logoContainer}>
          <img src={MahikaLogo} alt="Mahika Logo" className={classes.logo} />
        </div>
        <div className={classes.toggleButtonInvisible}></div>
=======
        <div>
          <img src={MahikaLogo} alt="Mahika Logo" className={classes.logo} />
        </div>
>>>>>>> feature/issue-01/login-form
      </nav>
    </div>
  );
};

export default Header;
