import { useState, useEffect } from "react";
import classes from "./TableInvoice.module.css";
import settingIcon from "/assets/setting.png";
import Pagination from "../../UtilsComponent/Pagination/Pagination";

const TableInvoice = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicePerPage, setInvoicePerPage] = useState(4);

  const lastInvoiceIndex = currentPage * invoicePerPage;
  const firstInvoiceIndex = lastInvoiceIndex - invoicePerPage;
  const currentInvoice = invoiceList.slice(firstInvoiceIndex, lastInvoiceIndex);

  const handleInvoice = () => {
    fetch("http://mahika.foundation:8080/swp/api/order", {
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
    <div className={classes.body}>
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
          <table className={classes.table}>
            <tr className={classes.tr}>
              <th className={`${classes["table-header"]} ${classes.th}`}>
                <img
                  src={settingIcon}
                  alt="Setting Icon"
                  className={`${classes.settingIcon} ${classes.img}`}
                />
                <input type="checkbox" />
              </th>
              <th className={classes.th}>Mã hóa đơn</th>
              <th className={classes.th}>Ngày tạo</th>
              <th className={classes.th}>Khách hàng</th>
              <th className={classes.th}>Loại hóa đơn</th>
              <th className={classes.th}>Nhân viên bán hàng</th>
              <th className={classes.th}>Thành tiền</th>
              <th className={classes.th}>Trạng thái thanh toán</th>
            </tr>
            {currentInvoice.map((list) => {
              return (
                <tr className={classes.tr} key={list.invoiceCode}>
                  <td className={`${classes.checkbox} ${classes.td}`}>
                    <input type="checkbox" />
                  </td>
                  <td className={classes.td}>{list.invoiceCode}</td>
                  <td className={classes.td}>{list.createdDate}</td>
                  <td className={classes.td}>{list.customerName}</td>
                  <td className={classes.td}>{list.invoiceType}</td>
                  <td className={classes.td}>{list.staffName}</td>
                  <td className={classes.td}>{list.totalPrice}</td>
                  <td className={classes.td}>{list.status}</td>
                </tr>
              );
            })}
          </table>
          <Pagination
            totalInvoice={invoiceList.length}
            invoicePerPage={invoicePerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TableInvoice;
