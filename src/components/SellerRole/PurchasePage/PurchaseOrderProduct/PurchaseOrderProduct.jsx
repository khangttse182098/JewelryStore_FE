import React, { useContext } from "react";
import classes from "./PurchaseOrderProduct.module.css";
import RingImg from "/assets/ring.png";
import { ProductSellInvoiceContext } from "../../../../context/ProductSellInvoiceContext";
import { ProductSellListContext } from "../../../../context/ProductSellListContext";

const PurchaseOrderProduct = ({ product }) => {
  const { removeItemFromSellInvoice } = useContext(ProductSellInvoiceContext);
  const { addItemToSellList } = useContext(ProductSellListContext);

  function handleClick() {
    removeItemFromSellInvoice(product);
    addItemToSellList(product);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>{product.productName}</h1>
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
  );
};

export default PurchaseOrderProduct;
