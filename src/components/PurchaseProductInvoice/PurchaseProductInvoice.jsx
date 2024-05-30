import React, { useState } from "react";
import classes from "./PurchaseProductInvoice.module.css";
import RingImg from "/assets/ring.png";

const PurchaseProductInvoice = ({
  product,
  setShowPurchaseProduct,
  showPurchaseProductInvoice,
}) => {
  // const [showProduct, setShowProduct] = useState(true);
  function handleClick() {
    setShowPurchaseProduct((prevShowProduct) => !prevShowProduct);
  }
  return (
    <>
      {showPurchaseProductInvoice && (
        <div className={classes.container}>
          <h1>{product.productName}</h1>
          <div className={classes["content-container"]}>
            <div className={classes["img-container"]}>
              <img src={RingImg} alt="ring img" />
            </div>
            <div className={classes["product-info"]}>
              <p>Mã sản phẩm: {product.productCode}</p>
              <p>37.619.000đ</p>
            </div>
            <button className={classes.btn} onClick={handleClick}>
              -
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseProductInvoice;
