/* eslint-disable react/prop-types */
import classes from "./InvoiceSellPurchase.module.css";
import { useContext, useState } from "react";
import { ProductPurchaseContext } from "../../../../context/ProductPurchaseContext";
import { ProductPurchaseListContext } from "../../../../context/ProductPurchaseListContext";
import { formatter } from "../../../../util/formatter";
import ImageLoader from "../../../../util/ImageLoader";

const InvoiceSellPurchase = ({ itemToPurchase }) => {
  const {
    productName,
    productCode,
    productImage,
    materialName,
    categoryName,
    price,
  } = itemToPurchase;
  const { removeItemFromPurchase } = useContext(ProductPurchaseContext);
  const { addItemToProductList } = useContext(ProductPurchaseListContext);

  const handleClick = () => {
    removeItemFromPurchase(itemToPurchase);
    addItemToProductList(itemToPurchase);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes.img}>
        <ImageLoader URL={productImage} />
      </div>
      <div>
        <p className={classes.tittle}>{productName}</p>
        <p className={classes["first-paragraph"]}>Mã sản phẩm: {productCode}</p>
        <p className={classes["second-paragraph"]}>Chất liệu: {materialName}</p>
        <p className={classes["third-paragraph"]}>Loại đá: {categoryName}</p>
        <p className={classes["fourth-paragraph"]}>{formatter.format(price)}</p>
      </div>
      <div>
        <button onClick={handleClick} className={classes.button}>
          -
        </button>
      </div>
    </div>
  );
};

export default InvoiceSellPurchase;
