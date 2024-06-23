import classes from "./InvoiceRepurchaseGold.module.css";
import { useContext } from "react";
import { RepurchaseContext } from "../../../../context/RepurchaseContext";
import { formatter } from "../../../../util/formatter";

const InvoiceRepurchaseGold = ({ item }) => {
  const { name, weight, price } = item.data;
  const { removeItemFromPurchase } = useContext(RepurchaseContext);

  const handleClick = () => {
    removeItemFromPurchase(item);
  };
  return (
    <div className={classes.invoice}>
      <div className={classes.detail}>
        <p className={classes.material}>Loại vàng: {name}</p>
        <p className={classes.weight}>Khối lượng: {weight} chỉ</p>
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
export default InvoiceRepurchaseGold;
