import { useState, useEffect } from "react";
import classes from "./ListTableInvoice.module.css";
import settingIcon from "/assets/setting.png";

const ListTableInvoice = () => {
  const [invoiceList, setInvoiceList] = useState([]);

  const handleInvoice = () => {
    fetch("http://localhost:8080/api/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataInvoice) => setInvoiceList(dataInvoice))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleInvoice();
  }, []);

  console.log(invoiceList);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>Danh sách hóa đơn</p>
      </div>
      <div className={classes["table-container"]}>
        <div className={classes["infor-bar"]}>
          <button className={classes.button}>
            <p className={classes.status}>Tất cả</p>
          </button>
          <button className={classes.button}>
            <p className={classes.status}>Đã thanh toán</p>
          </button>
          <button className={classes.button}>
            <p className={classes.status}>Chưa thanh toán</p>
          </button>
        </div>
        <hr />
        <div className={classes["search-container"]}>
          <input
            className={classes.search}
            type="search"
            placeholder="Tìm kiếm theo mã hóa đơn"
          />
        </div>
        <table>
          <tr>
            <th className={classes["table-header"]}>
              <img
                src={settingIcon}
                alt="Setting Icon"
                className={classes.settingIcon}
              />
              <input type="checkbox" />
            </th>
            <th>Mã hóa đơn</th>
            <th>Ngày tạo</th>
            <th>Khách hàng</th>
            <th>Loại hóa đơn</th>
            <th>Nhân viên bán hàng</th>
            <th>Thành tiền</th>
            <th>Trạng thái thanh toán</th>
          </tr>
          {invoiceList.map((list) => {
            return (
              <tr key={list.invoiceCode}>
                <td className={classes.checkbox}>
                  <input type="checkbox" />
                </td>
                <td>{list.invoiceCode}</td>
                <td>{list.createdDate}</td>
                <td>{list.customerName}</td>
                <td>{list.invoiceType}</td>
                <td>{list.staffName}</td>
                <td>{list.totalPrice}</td>
                <td>{list.status}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ListTableInvoice;
