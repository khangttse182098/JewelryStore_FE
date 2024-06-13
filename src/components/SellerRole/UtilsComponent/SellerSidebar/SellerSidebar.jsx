/* eslint-disable react/prop-types */
import SidebarFunction from "../SidebarFunction/SidebarFunction";
import classes from "./SellerSidebar.module.css";
import profilePicture from "/assets/profile_pic.png";
import sellIcon from "/assets/sell.png";
import purchaseIcon from "/assets/purchase.png";
import productIcon from "/assets/product-seller.png";
import logoutIcon from "/assets/logout.png";
import SellerPage from "./../../../../page/SellerPage";

const SellerSidebar = ({ visible, onClose }) => {
  return (
    <aside className={`${classes.container} ${visible ? classes.visible : ""}`}>
      <div className={classes["img-container"]}>
        <img src={profilePicture} alt="profile picture" />
      </div>
      <div className={classes["function-list"]}>
        <p className={classes["list-name"]}>Chức năng</p>
        <SidebarFunction icon={sellIcon} title="Dịch vụ bán" />
        <SidebarFunction icon={purchaseIcon} title="Dịch vụ mua lại" />
        <SidebarFunction icon={productIcon} title="Bảng sản phẩm" />
        <SidebarFunction icon={logoutIcon} title="Đăng xuất" />
      </div>
      <button className={classes["close-button"]} onClick={onClose}>
        Close
      </button>
    </aside>
  );
};

export default SellerSidebar;
