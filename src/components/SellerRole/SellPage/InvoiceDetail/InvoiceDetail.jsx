/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import classes from "./InvoiceDetail.module.css";
import { createPortal } from "react-dom";
import { formatter } from "../../../../util/formatter";
import loadImg from "../../../../util/loadImg";
import ImageLoader from "../../../../util/ImageLoader";

const InvoiceDetail = forwardRef(function InvoiceDetail({ invoice }, ref) {
  return createPortal(
    <dialog ref={ref} className={classes["modal-container"]}>
      <div className={classes["invoice-container"]}>
        <p className={classes.title}>{invoice.productName}</p>
        {/* image */}
        <div className={classes["info-container"]}>
          <div className={classes["img-container"]}>
<<<<<<< HEAD
            <img src={invoice.productImage} alt="ring" />
=======
            <ImageLoader URL={invoice.productImage} />
>>>>>>> feature/issue-05/purchase-page
          </div>
          {/* invoice info */}
          <div className={classes.info}>
            <p>Mã sản phẩm: {invoice.productCode}</p>
            <p>Chất liệu: {invoice.materialName}</p>
            <p>Nhân công: {invoice.productionCode}</p>
            <p className={classes.price}>{formatter.format(invoice.price)}</p>
          </div>
          {/* close button */}
          <form method="dialog">
            <button className={classes["close-button"]}>
              <span>+</span>
            </button>
          </form>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default InvoiceDetail;
