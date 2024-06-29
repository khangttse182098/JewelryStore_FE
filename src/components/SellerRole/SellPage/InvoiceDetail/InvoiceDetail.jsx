/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import classes from "./InvoiceDetail.module.css";
import { createPortal } from "react-dom";
import { formatter } from "../../../../util/formatter";
import ImageLoader from "../../../../util/ImageLoader";

const InvoiceDetail = forwardRef(function InvoiceDetail({ invoice }, ref) {
  return createPortal(
    <dialog ref={ref} className={classes["modal-container"]}>
      <div className={classes["invoice-container"]}>
        <p className={classes.title}>{invoice.productName}</p>
        {/* image */}
        <div className={classes["info-container"]}>
          <div className={classes["img-container"]}>
            <ImageLoader URL={invoice.productImage} />
          </div>
          {/* invoice info */}
          <div className={classes.info}>
            <p>
              <b>Mã sản phẩm:</b> {invoice.productCode}
            </p>
            <p>
              <b>Ngày tạo:</b> {new Date(invoice.createdDate).toLocaleString()}
            </p>
            <p>
              <b>Quầy:</b> {invoice.counterNo}
            </p>
            <p>
              <b>Loại trang sức:</b> {invoice.categoryName}
            </p>
            <p>
              <b>Tên kim cương:</b>{" "}
              {invoice.gemName ? invoice.gemName : "Không có"}
            </p>
            <p>
              <b>Chất liệu:</b>{" "}
              {invoice.materialName ? invoice.materialName : "Không có"}
            </p>
            <p className={classes.price}>
              <b>Giá:</b> {formatter.format(invoice.price)}
            </p>
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
