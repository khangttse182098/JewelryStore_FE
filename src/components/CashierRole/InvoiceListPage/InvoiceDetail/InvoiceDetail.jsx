import React, { useEffect, useState } from "react";
import classes from "./InvoiceDetail.module.css";
import RingImg from "/assets/ring.png";
import PenImg from "/assets/pen.png";
import { formatter } from "../../../../util/formatter";

const InvoiceDetail = ({ invoice }) => {
  const [productList, setProductList] = useState([]);
  const [customer, setCustomer] = useState({});
  const { invoiceCode, customerName, status, totalPrice, customerId } =
    invoice.list;

  const handleFetchProductList = () => {
    fetch(
      `http://mahika.foundation:8080/swp/api/product?invoiceCode=${invoiceCode}`
    )
      .then((res) => res.json())
      .then((dataProduct) => {
        console.log(dataProduct);
        return setProductList(dataProduct);
      });
  };

  const handleFetchCustomer = () => {
    fetch(`http://mahika.foundation:8080/swp/api/customer/list-${customerId}`)
      .then((res) => res.json())
      .then((customer) => {
        console.log(customer);
        return setCustomer(customer);
      });
  };

  const handleFetchPurchase = () => {
    fetch(`http://mahika.foundation:8080/swp/api/order/status/paid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    handleFetchProductList();
    handleFetchCustomer();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.title}>Chi tiết hóa đơn</div>
      <div className={classes["table-container"]}>
        <table
          cellspacing="0"
          cellpadding="0"
          className={classes["product-list"]}
        >
          <thead>
            <tr className={classes["invoice-title"]}>{invoiceCode}</tr>
            <tr className={classes["invoice-props"]}>
              <th>Sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => {
              return (
                <tr>
                  <td className={classes["img-container"]}>
                    <img className={classes.img} src={RingImg} alt="ring" />
                  </td>
                  <td>{product.productName}</td>
                  <td>{formatter.format(product.price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className={classes["customer-detail"]}>
          <div className={classes["customer-title-container"]}>
            <p>Khách hàng</p>
            <div>
              <img className={classes.img} src={PenImg} alt="pen-logo" />
            </div>
          </div>
          <hr
            style={{ width: "419px", marginLeft: "23px", marginBottom: "10px" }}
          />
          <div className={classes["customer-info"]}>
            <div className={classes["customer-name"]}>
              <p className={classes["customer-info-title"]}>Họ và tên: </p>
              <p>{customerName}</p>
            </div>
            <div className={classes["customer-gender"]}>
              <p className={classes["customer-info-title"]}>Giới tính: </p>
              <p>{customer.gender}</p>
            </div>
            <div className={classes["customer-phone"]}>
              <p className={classes["customer-info-title"]}>SĐT: </p>
              <p>{customer.phoneNumber} </p>
            </div>
            <div className={classes["customer-address"]}>
              <p className={classes["customer-info-title"]}>Địa chỉ: </p>
              <p>{customer.address}</p>
            </div>
          </div>
        </div>
      </div>
      {/* status */}
      <div className={classes["purchase-contatiner"]}>
        <div className={classes["status-container"]}>
          <div
            className={`${
              status === "Chưa thanh toán"
                ? `${classes["status-inProgress"]}`
                : `${classes["status-success"]}`
            } ${classes.highlight}`}
          >
            {status}
          </div>
          <div className={classes["status-name-containter"]}>
            <div className={classes.highlight}>Tổng tiền hàng</div>
            <div className={classes["status-value"]}>
              {formatter.format(totalPrice)}
            </div>
          </div>
          <div className={classes["status-name-containter"]}>
            <div className={classes.highlight}>Khách đã trả</div>
            <div className={classes["status-value"]}>70,000,000đ</div>
          </div>
          <div className={classes["status-name-containter"]}>
            <div className={classes.highlight}>Tiền hoàn lại khách</div>
            <div className={classes["status-value"]}>1,000,000đ</div>
          </div>
        </div>
        <button
          className={classes["purchase-button"]}
          onClick={handleFetchPurchase}
        >
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetail;
