import React from "react";
import classes from "./PurchaseOrderDetail.module.css";
import PurchaseProductInvoice from "../PurchaseProductInvoice/PurchaseProductInvoice";
import { useContext } from "react";
import { ProductSellInvoiceContext } from "../../context/ProductSellInvoiceContext";

const PurchaseOrderDetail = () => {
  const { itemSellInvoice } = useContext(ProductSellInvoiceContext);
  return (
    <div className={classes.container}>
      <div className={classes.title}>Thông tin đơn hàng</div>
      <div>
        {itemSellInvoice.map((product, productIndex) => {
          return (
            <PurchaseProductInvoice key={productIndex} product={product} />
          );
        })}
        <div className={classes.frame}>
          <p className={classes.p}>Chiết khấu</p>
          <p className={classes.p}>2</p>
        </div>
        <div className={classes.frame}>
          <p className={classes.p}>Tổng số lượng</p>
          <p className={classes.p}>177.617.000đ</p>
        </div>
        <div className={classes.frame}>
          <p className={classes.p}>Tổng tiền</p>
          <p className={classes.p}>-17.761.700đ</p>
        </div>
        <div className={classes.frame}>
          <p className={classes.p}>Giảm giá</p>
          <p className={classes.p}>-17.761.700đ</p>
        </div>
        <div className={classes.frame}>
          <p className={classes.total}>Thanh toán</p>
          <p className={classes.total}>159.855.300đ</p>
        </div>
        <button className={classes.createInvoice}>THANH TOÁN</button>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
