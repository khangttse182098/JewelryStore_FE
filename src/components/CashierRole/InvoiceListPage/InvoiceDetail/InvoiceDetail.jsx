/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import classes from "./InvoiceDetail.module.css";
import PenImg from "/assets/pen.png";
import { formatter } from "../../../../util/formatter";
import loadImg from "../../../../util/loadImg";

const InvoiceDetail = ({ invoice }) => {
  const [productList, setProductList] = useState(
    invoice.list.productResponseDTOList
  );

  const [customer, setCustomer] = useState({});
  const [payPrice, setPayPrice] = useState("");
  const [image, setImage] = useState(null);
  const [fund, setFund] = useState("");
  const { invoiceCode, customerName, status, totalPrice, customerId } =
    invoice.list;

  const handleFund = (event) => {
    event.preventDefault();
    const input = event.target;
    const value = input.value;
    // Save the caret position
    const caretPosition = input.selectionStart;
    // Parse the input value to a number
    const pay = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    const fund = pay - totalPrice;
    // Format the number back to currency format
    const formattedPay = formatter.format(pay);
    // Update the input value with the formatted currency
    setPayPrice(formattedPay);
    setFund(fund);
    // Calculate the new caret position
    const newCaretPosition = formattedPay.length - value.length + caretPosition;
    // Set the new caret position
    setTimeout(() => {
      input.setSelectionRange(newCaretPosition, newCaretPosition);
    }, 0);
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
            {productList.map((list) => {
              if (image === null) {
                loadImg(list.productCode, setImage);
              }
              return (
                <tr>
                  <td className={classes["img-container"]}>
                    <img className={classes.img} src={image} alt="ring" />
                  </td>
                  <td>{list.productName}</td>
                  <td>{formatter.format(list.price)}</td>
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
            <input
              className={classes["status-value"]}
              onChange={handleFund}
              placeholder="Nhập tiền khách hàng trả"
              value={payPrice}
            />
          </div>
          <div className={classes["status-name-containter"]}>
            <div className={classes.highlight}>Tiền hoàn lại khách</div>
            <div className={classes["status-value"]}>
              {formatter.format(fund)}
            </div>
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
