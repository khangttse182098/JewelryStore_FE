import React, { forwardRef } from "react";
import classes from "./InvoiceDetailModal.module.css";
import { formatter } from "../../../../util/formatter";
import diamondImg from "/assets/diamon.png";
import Gold from "/assets/Gold.png";

const InvoiceDetailModal = forwardRef(({ invoice, handleHide, type }, ref) => {
  const renderDetail = () => {
    console.log(invoice);
    switch (type) {
      case "product":
        return (
          <div className={classes.productAll}>
            <img
              src={invoice.productImage}
              alt="Product"
              className={classes.imageSize}
            />
            <div key={invoice.productCode}>
              <div>
                <b>Tên loại:</b> {invoice.categoryName}
              </div>
              <div>
                <b>Quầy:</b> {invoice.counterNo}
              </div>
              <div>
                <b>Ngày tạo:</b>{" "}
                {new Date(invoice.createdDate).toLocaleString()}
              </div>
              <div>
                <b>Tên kim cương:</b> {invoice.gemName}
              </div>
              <div>
                <b>ID:</b> {invoice.id}
              </div>
              <div>
                <b>Tên nguyên liệu:</b> {invoice.materialName}
              </div>
              <div>
                <b>Giá:</b> {formatter.format(invoice.price)}
              </div>
              <div>
                <b>Mã sản phẩm:</b> {invoice.productCode}
              </div>
              <div>
                <b>Tên sản phẩm:</b> {invoice.productName}
              </div>
              <div>
                <b>Giá sản phẩm:</b> {formatter.format(invoice.productionCost)}
              </div>
            </div>
          </div>
        );

      case "diamond":
        return (
          <div className={classes.productAll}>
            <img src={diamondImg} alt="Diamond" className={classes.imageSize} />
            <div>
              <div>
                <b>Trọng lượng Kim cương:</b> {invoice.caratWeight} gam
              </div>
              <div>
                <b>Độ tinh khiết:</b> {invoice.clarity}
              </div>
              <div>
                <b>Màu sắc:</b> {invoice.color}
              </div>
              <div>
                <b>Giác cắt:</b> {invoice.cut}
              </div>
              <div>
                <b>Nguồn gốc:</b> {invoice.origin}
              </div>
              <div>
                <b>Giá:</b> {formatter.format(invoice.price)}
              </div>
            </div>
          </div>
        );
      case "material":
        return (
          <div className={classes.productAll}>
            <img src={Gold} alt="Gold" className={classes.imageSize} />
            <div>
              <div>
                <b>Tên:</b> {invoice.name}
              </div>
              <div>
                <b>Giá:</b> {formatter.format(invoice.price)}
              </div>
              <div>
                <b>Trọng lượng:</b> {invoice.weight}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <dialog ref={ref} className={classes.container}>
      <div>
        <p className={classes.close} onClick={handleHide}>
          &times;
        </p>
      </div>
      <div>{renderDetail()}</div>
    </dialog>
  );
});

export default InvoiceDetailModal;
