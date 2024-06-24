import classes from "./InvoiceRepurchaseDiamond.module.css";
import { useContext } from "react";
import { RepurchaseContext } from "../../../../context/RepurchaseContext";
import { formatter } from "../../../../util/formatter";

const InvoiceRepurchaseDiamond = ({ item }) => {
  const { origin, cut, color, caratWeight, clarity, price } = item.data;
  const { removeItemFromPurchase } = useContext(RepurchaseContext);

  function handleClick() {
    removeItemFromPurchase(item);
  }

  return (
    <div className={classes.invoice}>
      <div className={classes.detail}>
        <p className={classes.origin}>Nguồn gốc: {origin}</p>
        <p className={classes.cut}>Giác cắt: {cut}</p>
        <p className={classes.color}>Màu sắc: {color}</p>
        <p className={classes.carat}>Trọng lượng carat: {caratWeight} carat</p>
        <p className={classes.clarity}>Độ tinh khiết: {clarity}</p>
        <p className={classes.price}>Tổng: {formatter.format(price)}</p>
      </div>
      <div>
        <button className={classes.button} onClick={handleClick}>
          -
        </button>
      </div>
    </div>
  );
};
export default InvoiceRepurchaseDiamond;
