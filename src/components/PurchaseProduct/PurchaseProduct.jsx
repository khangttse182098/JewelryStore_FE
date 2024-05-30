import React, { useEffect, useState } from "react";
import RingImg from "/assets/ring.png";
import classes from "./PurchaseProduct.module.css";

const PurchaseProduct = ({
  product,
  setShowPurchaseProductInvoice,
  showPurchaseProduct,
}) => {
  // const [showProduct, isShowProduct] = useState(true);
  function handleClick() {
    setShowPurchaseProductInvoice((prevShowProduct) => !prevShowProduct);
  }
  return (
    <>
      {showPurchaseProduct && (
        <div className={classes.container}>
          <h1>{product.productName}</h1>
          <div className={classes["content-container"]}>
            <div className={classes["img-container"]}>
              <img src={RingImg} alt="ring img" />
            </div>
            <div className={classes["product-info"]}>
              <p>Mã sản phẩm: {product.productCode}</p>
              <p>
                Chất liệu:{""}
                {product.materialName === "" ? product.gemName : "Không có"}
              </p>
              <p>
                Tên kim cương:{""}
                {product.gemName === "" ? product.gemName : "Không có"}
              </p>
            </div>
            <button onClick={handleClick}>Mua lại</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseProduct;
