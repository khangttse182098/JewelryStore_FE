import classes from "./Invoice.module.css";
import DiamondRing from "../../public/assets/DiamondRing.png";

const Invoice = () => {
  return (
    <div className={classes["container"]}>
      <div>
        <img src={DiamondRing} alt="Diamond Ring 14K" />
      </div>
      <div>
        <p className={classes.tittle}>Nhẫn Kim cương Vàng trắng 14K</p>
        <p className={classes["first-paragraph"]}>Mã sản phẩm: PRO192</p>
        <p className={classes["second-paragraph"]}>Chất liệu: Vàng trắng, Vàng trắng 1</p>
        <p className={classes["third-paragraph"]}>Loại đá: Kim Cương, Kim cương 1</p>
        <p className={classes["fourth-paragraph"]}>37.691.000đ</p>
      </div>
      <div>
        <button className={classes.button}>+</button>
      </div>
    </div>
  );
};

export default Invoice;
