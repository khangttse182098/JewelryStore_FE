/* eslint-disable no-unused-vars */
import { useRef, useState, useContext, useEffect } from "react";
import CustomerInputForm from "../../UtilsComponent/CustomerInputForm/CustomerInputForm";
import classes from "./InformationBar.module.css";
import { ProductPurchaseContext } from "../../../../context/ProductPurchaseContext";
import { formatter } from "../../../../util/formatter";

const InformationBar = () => {
  const customerInputFormRef = useRef();
  const { itemPurchase } = useContext(ProductPurchaseContext);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    const total = itemPurchase.reduce((sum, item) => sum + item.price, 0);
    const totalDiscountPrice = itemPurchase.reduce(
      (sum, item) => sum + item.discountPrice,
      0
    );
    setPrice(total);
    setDiscountPrice(totalDiscountPrice);
  }, [itemPurchase]);

  function handleClick() {
    customerInputFormRef.current.showModal();
  }

  function handleHide() {
    customerInputFormRef.current.close();
  }

  const [discountInfo, setDiscountInfo] = useState([]);

  const handleDiscount = () => {
    fetch("http://mahika.foundation:8080/swp/api/discount?isAvailable=true")
      .then((res) => res.json())
      .then((data) => setDiscountInfo(data));
  };

  useEffect(() => {
    handleDiscount();
  }, []);

  return (
    <>
      {discountInfo.length ? (
        <CustomerInputForm
          discountId={discountInfo[0].id}
          location="sellPage"
          ref={customerInputFormRef}
          handleHide={handleHide}
        />
      ) : undefined}
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
          <p className={classes.p}>{`Khuyến mại ${
            itemPurchase.length ? `${discountInfo[0].value}%` : ""
          }`}</p>
          <p className={classes.p}>
            {itemPurchase.length ? `-${formatter.format(discountPrice)}` : ""}
          </p>
        </div>
        <div className={classes.frame}>
          <p className={classes.total}>Thanh toán</p>
          <p className={classes.total}>
            {itemPurchase.length ? formatter.format(price - discountPrice) : ""}
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
