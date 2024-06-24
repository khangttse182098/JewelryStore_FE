/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useContext, useRef } from "react";
import { ProductPurchaseContext } from "../../../../context/ProductPurchaseContext";
import classes from "./Invoice.module.css";
import { ProductPurchaseListContext } from "../../../../context/ProductPurchaseListContext";
import InvoiceDetail from "../InvoiceDetail/InvoiceDetail";
import { formatter } from "../../../../util/formatter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImageLoader from "../../../../util/ImageLoader";

const Invoice = ({ invoice }) => {
  const {
    productName,
    productCode,
    productImage,
    materialName,
    categoryName,
    price,
  } = invoice;
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
        <div className={classes.img}>
          <ImageLoader
            URL={productImage}
            skeletonStyle={classes["img-skeleton"]}
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
          <p className={classes["third-paragraph"]}>Danh mục: {categoryName}</p>
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
