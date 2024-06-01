import classes from "./InvoiceSellPurchase.module.css";
import DiamondRing from "/assets/DiamondRing.png";

const InvoiceSellPurchase = ({ itemPurchase }) => {
  const { productName, productCode, materialName, categoryName, price } =
    itemPurchase;
  return (
    <div className={classes["container"]}>
      <div>
        <img src={DiamondRing} alt="Diamond Ring 14K" />
      </div>
      <div>
        <p className={classes.tittle}>{productName}</p>
        <p className={classes["first-paragraph"]}>Mã sản phẩm: {productCode}</p>
        <p className={classes["second-paragraph"]}>Chất liệu: {materialName}</p>
        <p className={classes["third-paragraph"]}>Loại đá: {categoryName}</p>
        <p className={classes["fourth-paragraph"]}>{price}đ</p>
      </div>
      <div>
        <button className={classes.button}>
          +
        </button>
      </div>
    </div>
  );
};

export default InvoiceSellPurchase;
