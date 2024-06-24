/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import classes from "./InvoiceProductList.module.css";
import { ProductSellInvoiceContext } from "../../../../context/ProductSellInvoiceContext";
import { ProductSellListContext } from "../../../../context/ProductSellListContext";
import { formatter } from "../../../../util/formatter";
import ImageLoader from "../../../../util/ImageLoader";

const InvoiceProductList = ({ product }) => {
  const { addItemToSellInvoice } = useContext(ProductSellInvoiceContext);
  const { removeItemFromSellList } = useContext(ProductSellListContext);

  function handleClick() {
    removeItemFromSellList(product);
    addItemToSellInvoice(product);
  }

  return (
    <div className={classes.container}>
      <div className={classes["content-container"]}>
        <div className={classes["img-container"]}>
          <ImageLoader
            URL={product.productImage}
            skeletonStyle={classes["img-skeleton"]}
          />
        </div>
        <div className={classes["product-info"]}>
          <h1 className={classes.h1}>{product.productName}</h1>
          <p>Mã sản phẩm: {product.productCode}</p>
          <p>
            Chất liệu:{""}
            {product.materialName === "" ? product.gemName : "Không có"}
          </p>
          <p>
            Tên kim cương:{""}
            {product.gemName === "" ? product.gemName : "Không có"}
          </p>
          <p>Giá:{formatter.format(product.price)}</p>
        </div>
        <button className={classes.button} onClick={handleClick}>
          +
        </button>
      </div>
    </div>
  );
};

export default InvoiceProductList;
