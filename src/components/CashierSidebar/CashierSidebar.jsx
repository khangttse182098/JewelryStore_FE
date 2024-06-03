import classes from "./CashierSidebar.module.css";
import InvoiceList from "/assets/invoice-list.png";
import Product from "/assets/product.png";
import Customer from "/assets/customer.png";
import Disount from "/assets/discount.png";

const CashierSidebar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>Trang thu ngân</p>
      </div>
      <hr />
      <div className={classes.content}>
        <button className={classes.button}>
          <img
            src={InvoiceList}
            alt="Invoice icon"
            className={classes["icon"]}
          />
          <div className={classes["text"]}>
            <p>Danh sách hóa đơn</p>
          </div>
        </button>

        <button className={classes.button}>
          <img src={Product} alt="Product icon" className={classes["icon"]} />
          <div className={classes["text"]}>
            <p>Sản phẩm</p>
          </div>
        </button>

        <button className={classes.button}>
          <img src={Customer} alt="Customer icon" className={classes["icon"]} />
          <div className={classes["text"]}>
            <p>Khách hàng</p>
          </div>
        </button>

        <button className={classes.button}>
          <img src={Disount} alt="Disount icon" className={classes["icon"]} />
          <div className={classes["text"]}>
            <p>Khuyến mãi</p>
          </div>
        </button>
      </div>
      <hr />
    </div>
  );
};

export default CashierSidebar;
