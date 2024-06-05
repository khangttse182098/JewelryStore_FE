import React from "react";
import classes from "./PurchaseOrderDetail.module.css";
import PurchaseOrderProduct from "../PurchaseOrderProduct/PurchaseOrderProduct";
import CustomerInputForm from "../../UtilsComponent/CustomerInputForm/CustomerInputForm";
import { useContext, useRef, useState, useEffect } from "react";
import { ProductSellInvoiceContext } from "../../../../context/ProductSellInvoiceContext";
import { formatter } from "../../../../util/formatter";

const PurchaseOrderDetail = () => {
  const customerInputFormRef = useRef();
  const { itemSellInvoice } = useContext(ProductSellInvoiceContext);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const total = itemSellInvoice.reduce((sum, item) => sum + item.price, 0);
    setPrice(total);
  }, [itemSellInvoice]);

  function handleClick() {
    customerInputFormRef.current.showModal();
  }

  function handleHide() {
    customerInputFormRef.current.close();
  }

  return (
    <>
      <CustomerInputForm ref={customerInputFormRef} handleHide={handleHide} />
      <div className={classes.container}>
        <div className={classes.title}>Thông tin đơn hàng</div>
        <div className={classes["container-order"]}>
          {itemSellInvoice.map((product, productIndex) => {
            return (
              <PurchaseOrderProduct key={productIndex} product={product} />
            );
          })}
        </div>
        <div>
          <div className={classes.frame}>
            <p className={classes.p}>Chiết khấu</p>
            <p className={classes.p}></p>
          </div>
          <div className={classes.frame}>
            <p className={classes.p}>Tổng số lượng</p>
            <p className={classes.p}>{itemSellInvoice.length ?? ""}</p>
          </div>
          <div className={classes.frame}>
            <p className={classes.p}>Tổng tiền</p>
            <p className={classes.p}>
              {itemSellInvoice.length ? formatter.format(price) : ""}
            </p>
          </div>
          <div className={classes.frame}>
            <p className={classes.p}>Giảm giá</p>
            <p className={classes.p}></p>
          </div>
          <div className={classes.frame}>
            <p className={classes.total}>Thanh toán</p>
            <p className={classes.total}>
              {itemSellInvoice.length ? formatter.format(price) : ""}
            </p>
          </div>
          <button className={classes.createInvoice} onClick={handleClick}>
            THANH TOÁN
          </button>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrderDetail;
