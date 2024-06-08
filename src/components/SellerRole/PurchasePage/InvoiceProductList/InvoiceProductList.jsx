import React, { useContext } from "react";
import RingImg from "/assets/ring.png";
import classes from "./InvoiceProductList.module.css";
import { ProductSellInvoiceContext } from "../../../../context/ProductSellInvoiceContext";
import { ProductSellListContext } from "../../../../context/ProductSellListContext";

const InvoiceProductList = ({ product }) => {
  const { addItemToSellInvoice } = useContext(ProductSellInvoiceContext);
  const { removeItemFromSellList } = useContext(ProductSellListContext);

  function handleClick() {
    removeItemFromSellList(product);
    addItemToSellInvoice(product);
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
          <p>
            Chất liệu:{""}
            {product.materialName === "" ? product.gemName : "Không có"}
          </p>
          <p>
            Tên kim cương:{""}
            {product.gemName === "" ? product.gemName : "Không có"}
          </p>
        </div>
        <button className={classes.button} onClick={handleClick}>
          Mua lại
        </button>
      </div>
    </div>
  );
};

export default InvoiceProductList;
