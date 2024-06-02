import classes from "./InvoiceSellPurchase.module.css";
import DiamondRing from "/assets/DiamondRing.png";
import { useContext, useState } from "react";
import { ProductPurchaseContext } from "../../context/ProductPurchaseContext";

const InvoiceSellPurchase = ({ itemToPurchase }) => {
  const { productName, productCode, materialName, categoryName, price } =
    itemToPurchase;
  const [isDisplay, setIsDisplay] = useState(true);
  const { itemPurchase, removeItemFromPurchase } = useContext(
    ProductPurchaseContext
  );

  // const isPurchased = itemPurchase.some(
  //   (item) => item.productCode === productCode
  // );

  const handleClick = () => {
    removeItemFromPurchase(itemToPurchase);
    setIsDisplay((prevIsDisplay) => !prevIsDisplay);
  };

  return (
    <>
      {isDisplay && (
        <div className={classes["container"]}>
          <div>
            <img src={DiamondRing} alt="Diamond Ring 14K" />
          </div>
          <div>
            <p className={classes.tittle}>{productName}</p>
            <p className={classes["first-paragraph"]}>
              Mã sản phẩm: {productCode}
            </p>
            <p className={classes["second-paragraph"]}>
              Chất liệu: {materialName}
            </p>
            <p className={classes["third-paragraph"]}>
              Loại đá: {categoryName}
            </p>
            <p className={classes["fourth-paragraph"]}>{price}đ</p>
          </div>
          <div>
            <button onClick={handleClick} className={classes.button}>
              -
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceSellPurchase;
