import { useState } from "react";
import classes from "./InvoiceDetail.module.css";
import ringImg from "/assets/ring.png";

const InvoiceDetail = () => {
  const [isOpen, setIsOpen] = useState(true);
  console.log(isOpen);
  return (
    <div
      className={`${classes.container} ${
        !isOpen ? `${classes.hidden}` : undefined
      }`}
    >
      <div className={classes["invoice-container"]}>
        <p className={classes.title}>Nhẫn kim cương vàng trắng 14K</p>
        {/* image */}
        <div className={classes["info-container"]}>
          <div className={classes["img-container"]}>
            <img src={ringImg} alt="ring" />
          </div>
          {/* invoice info */}
          <div className={classes.info}>
            <p>Mã sản phẩm: PRO001</p>
            <p>Chất liệu: vàng trắng 14k</p>
            <p>Nhân công: 1.000.000đ</p>
            <p className={classes.price}>37.691.000đ</p>
          </div>
          {/* close button */}
          <button
            className={classes["close-button"]}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
