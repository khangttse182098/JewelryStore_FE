/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import classes from "./InvoiceDetail.module.css";
import { createPortal } from "react-dom";
import { formatter } from "../../../../util/formatter";
import loadImg from "../../../../util/loadImg";

const InvoiceDetail = forwardRef(function InvoiceDetail({ invoice }, ref) {
  const [image, setImage] = useState(null);
  if (image === null) {
    loadImg(invoice.productCode, setImage);
  }
  return createPortal(
    <dialog ref={ref} className={classes["modal-container"]}>
      <div className={classes["invoice-container"]}>
        <p className={classes.title}>{invoice.productName}</p>
        {/* image */}
        <div className={classes["info-container"]}>
          <div className={classes["img-container"]}>
            <img src={image} alt="ring" />
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
