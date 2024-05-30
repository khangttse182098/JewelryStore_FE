import React from "react";
import RingImg from "/assets/ring.png";
import classes from "./PurchaseProduct.module.css";

const PurchaseProduct = () => {
  return (
    <div className={classes.container}>
      <h1>Nhẫn kim cương vàng trắng 14k</h1>
      <div className={classes["conntent-container"]}>
        <div className={classes["img-container"]}>
          <img src={RingImg} alt="ring img" />
        </div>
        <div className={classes["product-info"]}>
          <p>Mã sản phẩm: aaaa</p>
          <p>Chất liệu: vàng trắng</p>
          <p>Loại đá: Kim cương</p>
        </div>
        <button>Mua lại</button>
      </div>
    </div>
  );
};

export default PurchaseProduct;
