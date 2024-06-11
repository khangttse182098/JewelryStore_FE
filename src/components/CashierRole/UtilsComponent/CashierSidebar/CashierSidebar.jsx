import classes from "./CashierSidebar.module.css";
import InvoiceList from "/assets/invoice-list.png";
import Product from "/assets/product.png";
import Customer from "/assets/customer.png";
import Disount from "/assets/discount.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const CashierSidebar = () => {
  const [currentPage, setCurrentPage] = useState("Danh sách hóa đơn");

  const handlePage = (event) => {
    const page = event.currentTarget.getAttribute("page");
    setCurrentPage(page);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>Trang thu ngân</p>
      </div>
      <hr />
      <div className={classes.content}>
        <Link to="/invoicelist">
          <button
            className={`${classes.button} ${
              currentPage === "Danh sách hóa đơn" ? classes.current : ""
            }`}
            page="Danh sách hóa đơn"
            onClick={handlePage}
          >
            <img
              src={InvoiceList}
              alt="Invoice icon"
              className={classes["icon"]}
            />
            <div className={classes["text"]}>
              <p>Danh sách hóa đơn</p>
            </div>
          </button>
        </Link>

        <Link to="/invoicelist">
          <button
            className={`${classes.button} ${
              currentPage === "Sản phẩm" ? classes.current : ""
            }`}
            page="Sản phẩm"
            onClick={handlePage}
          >
            <img src={Product} alt="Product icon" className={classes["icon"]} />
            <div className={classes["text"]}>
              <p>Sản phẩm</p>
            </div>
          </button>
        </Link>

        <Link to="/customerlist">
          <button
            className={`${classes.button} ${
              currentPage === "Khách hàng" ? classes.current : ""
            }`}
            page="Khách hàng"
            onClick={handlePage}
          >
            <img
              src={Customer}
              alt="Customer icon"
              className={classes["icon"]}
            />
            <div className={classes["text"]}>
              <p>Khách hàng</p>
            </div>
          </button>
        </Link>

        <Link to="/statuslistcashier">
          <button
            className={`${classes.button} ${
              currentPage === "Khuyến mãi" ? classes.current : ""
            }`}
            page="Khuyến mãi"
            onClick={handlePage}
          >
            <img src={Disount} alt="Disount icon" className={classes["icon"]} />
            <div className={classes["text"]}>
              <p>Trạng thái đơn hàng</p>
            </div>
          </button>
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default CashierSidebar;
