/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect, useRef } from "react";
import { ProductPurchaseContext } from "../../../../context/ProductPurchaseContext";
import classes from "./Invoice.module.css";
import "./Invoice.module.css";
import { ProductPurchaseListContext } from "../../../../context/ProductPurchaseListContext";
import InvoiceDetail from "../InvoiceDetail/InvoiceDetail";
import { formatter } from "../../../../util/formatter";
import loadImg from "../../../../util/loadImg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Invoice = ({ invoice }) => {
  const { productName, productCode, materialName, categoryName, price } =
    invoice;
  const { removeItemFromProductList, productList } = useContext(
    ProductPurchaseListContext
  );
  const { addItemToPurchase } = useContext(ProductPurchaseContext);
  const InvoiceDetailRef = useRef();

  const handleClick = () => {
    addItemToPurchase(invoice);
    removeItemFromProductList(invoice);
  };

  function handleShowProductDetail() {
    InvoiceDetailRef.current.showModal();
  }

  const [image, setImage] = useState(null);

  if (image === null) {
    loadImg(productCode, setImage);
  }

  return (
    <>
      <InvoiceDetail invoice={invoice} ref={InvoiceDetailRef} />
      <div key={productCode} className={classes["container-invoice"]}>
        <div>
          {image !== null ? (
            <img className={classes.img} src={image} alt="Diamond Ring 14K" />
          ) : (
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
