import classes from "./CashierSidebar.module.css";
import InvoiceList from "/assets/invoice-list.png";
import Product from "/assets/product.png";
import Customer from "/assets/customer.png";
import Disount from "/assets/discount.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CashierSidebar = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>Trang thu ngân</p>
      </div>
      <hr className={classes.hr} />
      <div className={classes.content}>
        <Link to="/invoicelist">
          <button
            className={`${classes.button} ${
              currentPage === "/invoicelist" ? classes.current : ""
            }`}
          >
            <img
              src={InvoiceList}
              alt="Invoice icon"
              className={classes.icon}
            />
            <div className={classes.text}>
              <p>Danh sách hóa đơn</p>
            </div>
          </button>
        </Link>

        <Link to="/products">
          <button
            className={`${classes.button} ${
              currentPage === "/products" ? classes.current : ""
            }`}
          >
            <img src={Product} alt="Product icon" className={classes.icon} />
            <div className={classes.text}>
              <p>Sản phẩm</p>
            </div>
          </button>
        </Link>

        <Link to="/customerlist">
          <button
            className={`${classes.button} ${
              currentPage === "/customerlist" ? classes.current : ""
            }`}
          >
            <img src={Customer} alt="Customer icon" className={classes.icon} />
            <div className={classes.text}>
              <p>Khách hàng</p>
            </div>
          </button>
        </Link>

        <Link to="/statuslistcashier">
          <button
            className={`${classes.button} ${
              currentPage === "/statuslistcashier" ? classes.current : ""
            }`}
          >
            <img src={Disount} alt="Disount icon" className={classes.icon} />
            <div className={classes.text}>
              <p>Trạng thái đơn hàng</p>
            </div>
          </button>
        </Link>
      </div>
      <hr className={classes.hr} />
    </div>
  );
};

export default CashierSidebar;
