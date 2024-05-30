import React from "react";
import classes from "./PurchaseOrderDetail.module.css";

const PurchaseOrderDetail = () => {
  return (
    <>
      <div className={classes.title}>Thông tin đơn hàng mua lại</div>
      <ul>
        <li>Chiết khấu</li>
        <li>Tổng số lượng</li>
        <li>Tổng tiền</li>
        <li>Giảm giá</li>
        <li>Thanh toán</li>
      </ul>
    </>
  );
};

export default PurchaseOrderDetail;
