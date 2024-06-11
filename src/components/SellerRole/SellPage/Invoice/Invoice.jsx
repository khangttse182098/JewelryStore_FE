/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useContext, useRef } from "react";
import { ProductPurchaseContext } from "../../../../context/ProductPurchaseContext";
import classes from "./Invoice.module.css";
import { ProductPurchaseListContext } from "../../../../context/ProductPurchaseListContext";
import InvoiceDetail from "../InvoiceDetail/InvoiceDetail";
import { formatter } from "../../../../util/formatter";
import Skeleton from "react-loading-skeleton";

const Invoice = ({ invoice }) => {
  const {
    productName,
    productCode,
    productImage,
    materialName,
    categoryName,
    price,
  } = invoice;
  const { removeItemFromProductList } = useContext(ProductPurchaseListContext);
  const { addItemToPurchase } = useContext(ProductPurchaseContext);
  const InvoiceDetailRef = useRef();

  const handleClick = () => {
    addItemToPurchase(invoice);
    removeItemFromProductList(invoice);
  };

  function handleShowProductDetail() {
    InvoiceDetailRef.current.showModal();
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(true);
    setImageError(true);
  };

  return (
    <>
      <InvoiceDetail invoice={invoice} ref={InvoiceDetailRef} />
      <div key={productCode} className={classes["container-invoice"]}>
        <div>
          {!imageLoaded && (
            <Skeleton
              circle
              style={{
                marginTop: "38px",
                marginLeft: "27px",
                marginRight: "29px",
                width: "95px",
                height: "95px",
              }}
            />
          )}
          <img
            className={classes.img}
            src={productImage}
            alt="Diamond Ring 14K"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
          {imageError && <p className={classes.error}>Image failed to load</p>}
        </div>
        <div onClick={handleShowProductDetail}>
          <p className={classes.tittle}>{productName}</p>
          <p className={classes["first-paragraph"]}>
            Mã sản phẩm: {productCode}
          </p>
          <p className={classes["second-paragraph"]}>
            Chất liệu: {materialName}
          </p>
          <p className={classes["third-paragraph"]}>Loại đá: {categoryName}</p>
          <p className={classes["fourth-paragraph"]}>
            {formatter.format(price)}
          </p>
        </div>
        <div>
          <button onClick={handleClick} className={classes.button}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Invoice;
