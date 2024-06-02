import { useState, useContext } from "react";
import { ProductPurchaseContext } from "../../context/ProductPurchaseContext";
import classes from "./Invoice.module.css";
import DiamondRing from "/assets/DiamondRing.png";

const Invoice = ({ invoice }) => {
  const { productName, productCode, materialName, categoryName, price } =
    invoice;
  const [isDisplay, setIsDisplay] = useState(true);

  const onChangeHandler = () => setIsDisplay((prevIsDisplay) => !prevIsDisplay);

  const { itemPurchase, addItemToPurchase, removeItemFromPurchase } =
    useContext(ProductPurchaseContext);

  //search in intemPurchase (context)
  const isPurchased = itemPurchase.some(
    (invoiceItem) => invoiceItem.productCode === productCode
  );

  const handleClick = () => {
    if (isPurchased) {
      onChangeHandler();
    } else {
      addItemToPurchase(invoice);
      onChangeHandler();
    }
  };

  return (
    <>
      {isDisplay && (
        <div key={productCode} className={classes["container"]}>
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
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
