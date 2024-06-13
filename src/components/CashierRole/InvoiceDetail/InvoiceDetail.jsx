import React, { useState } from "react";
import classes from "./InvoiceDetail.module.css";
import PenImg from "/assets/pen.png";

const ProductInvoiceList = () => {
  const [listInvoiceDetail, setListInvoiceDetail] = useState([]);

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
            <tr className={classes["invoice-title"]}>INV301</tr>
            <tr className={classes["invoice-props"]}>
              <th>Sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={classes["img-container"]}>
                <img src={RingImg} alt="ring" />
              </td>
              <td>Nhẫn kim cương vàng trắng 14k</td>
              <td>23,000,000đ</td>
            </tr>
            <tr>
              <td className={classes["img-container"]}>
                <img src={RingImg} alt="ring" />
              </td>
              <td>Nhẫn kim cương vàng trắng 14k</td>
              <td>23,000,000đ</td>
            </tr>
            <tr>
              <td className={classes["img-container"]}>
                <img src={RingImg} alt="ring" />
              </td>
              <td>Nhẫn kim cương vàng trắng 14k</td>
              <td>23,000,000đ</td>
            </tr>
            <tr>
              <td className={classes["img-container"]}>
                <img src={RingImg} alt="ring" />
              </td>
              <td>Nhẫn kim cương vàng trắng 14k</td>
              <td>23,000,000đ</td>
            </tr>
          </tbody>
        </table>

        <div className={classes["customer-detail"]}>
          <div className={classes["customer-title-container"]}>
            <p>Khách hàng</p>
            <div>
              <img src={PenImg} alt="pen-logo" />
            </div>
          </div>
          <hr
            style={{ width: "419px", marginLeft: "23px", marginBottom: "10px" }}
          />
          <div className={classes["customer-info"]}>
            <div className={classes["customer-name"]}>
              <p className={classes["customer-info-title"]}>Họ và tên: </p>
              <p>Anh Khang</p>
            </div>
            <div className={classes["customer-gender"]}>
              <p className={classes["customer-info-title"]}>Giới tính: </p>
              <p>Nam</p>
            </div>
            <div className={classes["customer-phone"]}>
              <p className={classes["customer-info-title"]}>SĐT: </p>
              <p>0999097466 </p>
            </div>
            <div className={classes["customer-address"]}>
              <p className={classes["customer-info-title"]}>Địa chỉ: </p>
              <p>100 Lê Văn Việt, TP. Hồ Chí Minh</p>
            </div>
          </div>
        </div>
      </div>
      {/* status */}
      <div className={classes["status-container"]}>
        <div className={`${classes.highlight}, ${classes["status-type"]}`}>
          Chưa thanh toán
        </div>
        <div className={classes["status-name-containter"]}>
          <div className={classes.highlight}>Tổng tiền hàng</div>
          <div className={classes["status-value"]}>69,000,000đ</div>
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
    </div>
  );
};

export default ProductInvoiceList;
