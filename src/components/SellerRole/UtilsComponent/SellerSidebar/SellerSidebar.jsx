import SidebarFunction from "../SidebarFunction/SidebarFunction";
import classes from "./SellerSidebar.module.css";
import profilePicture from "/assets/profile_pic.png";
import homeIcon from "/assets/home.png";
import searchIcon from "/assets/search.png";
import tagIcon from "/assets/tag.png";
import smileIcon from "/assets/smile.png";

const SellerSidebar = ({ visible, onClose }) => {
  return (
    <aside className={`${classes.container} ${visible ? classes.visible : ""}`}>
      <div className={classes["img-container"]}>
        <img src={profilePicture} alt="profile picture" />
      </div>
      <div className={classes["function-list"]}>
        <p className={classes["list-name"]}>Chức năng</p>
        <SidebarFunction icon={homeIcon} title="Dịch vụ bán" />
        <SidebarFunction icon={searchIcon} title="Dịch vụ mua lại" />
        <SidebarFunction icon={tagIcon} title="Mã giảm giá" />
        <SidebarFunction icon={smileIcon} title="Đăng xuất" />
      </div>
      <button className={classes["close-button"]} onClick={onClose}>
        Close
      </button>
    </aside>
  );
};

export default SellerSidebar;
