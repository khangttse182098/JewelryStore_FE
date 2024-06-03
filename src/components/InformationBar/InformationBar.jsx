import { useRef, useState, useContext, useEffect } from "react";
import CustomerInputForm from "../CustomerInputForm/CustomerInputForm";
import classes from "./InformationBar.module.css";
import { ProductPurchaseContext } from "../../context/ProductPurchaseContext";
import { formatter } from "../../util/formatter";

const InformationBar = () => {
  const customerInputFormRef = useRef();
  const { itemPurchase } = useContext(ProductPurchaseContext);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const total = itemPurchase.reduce((sum, item) => sum + item.price, 0);
    setPrice(total);
  }, [itemPurchase]);

  function handleClick() {
    customerInputFormRef.current.showModal();
  }

  function handleHide() {
    customerInputFormRef.current.close();
  }

  return (
    <>
      <CustomerInputForm ref={customerInputFormRef} handleHide={handleHide} />
      <div>
        <div className={classes.frame}>
          <p className={classes.p}>Tổng số lượng</p>
          <p className={classes.p}>{itemPurchase.length ?? ""}</p>
        </div>
        <div className={classes.frame}>
          <p className={classes.p}>Tổng tiền</p>
          <p className={classes.p}>
            {itemPurchase.length ? formatter.format(price) : ""}
          </p>
        </div>
        <div className={classes.frame}>
          <p className={classes.p}>Giảm giá</p>
          <p className={classes.p}></p>
        </div>
        <div className={classes.frame}>
          <p className={classes.total}>Thanh toán</p>
          <p className={classes.total}>
            {itemPurchase.length ? formatter.format(price) : ""}
          </p>
        </div>
        <button className={classes.createInvoice} onClick={handleClick}>
          TẠO HÓA ĐƠN
        </button>
      </div>
    </>
  );
};

export default InformationBar;
