import { forwardRef, useState } from "react";
import classes from "./InvoiceDetail.module.css";
import ringImg from "/assets/ring.png";
import { createPortal } from "react-dom";

const InvoiceDetail = forwardRef(function InvoiceDetail({ invoice }, ref) {
  return createPortal(
    <dialog ref={ref} className={classes["modal-container"]}>
      <div className={classes["invoice-container"]}>
        <p className={classes.title}>{invoice.productName}</p>
        {/* image */}
        <div className={classes["info-container"]}>
          <div className={classes["img-container"]}>
            <img src={ringImg} alt="ring" />
          </div>
          {/* invoice info */}
          <div className={classes.info}>
            <p>Mã sản phẩm: {invoice.productCode}</p>
            <p>Chất liệu: {invoice.materialName}</p>
            <p>Nhân công: {invoice.productionCode}</p>
            <p className={classes.price}>{invoice.price}</p>
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
