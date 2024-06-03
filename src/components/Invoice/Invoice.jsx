import { useState, useContext, useRef } from "react";
import { ProductPurchaseContext } from "../../context/ProductPurchaseContext";
import classes from "./Invoice.module.css";
import DiamondRing from "/assets/DiamondRing.png";
import { ProductPurchaseListContext } from "../../context/ProductPurchaseListContext";
import InvoiceDetail from "../../components/InvoiceDetail/InvoiceDetail";
import { formatter } from "../../util/formatter";

const Invoice = ({ invoice }) => {
  const { productName, productCode, materialName, categoryName, price } =
    invoice;
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

  return (
    <>
      <InvoiceDetail invoice={invoice} ref={InvoiceDetailRef} />
      <div key={productCode} className={classes["container-invoice"]}>
        <div>
          <img
            className={classes.img}
            src={DiamondRing}
            alt="Diamond Ring 14K"
          />
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
