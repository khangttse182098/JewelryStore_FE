import { useEffect, useState } from "react";
import classes from "./TableCustomer.module.css";
import Pagination from "../../UtilsComponent/Pagination/Pagination";

const TableCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage, setCustomerPerPage] = useState(4);

  const lastCustomerIndex = currentPage * customerPerPage;
  const firstCustomerIndex = lastCustomerIndex - customerPerPage;
  const currentCustomer = customerList.slice(
    firstCustomerIndex,
    lastCustomerIndex
  );

  const handleInvoice = () => {
    fetch("http://localhost:8080/api/customer/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataInvoice) => setCustomerList(dataInvoice))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleInvoice();
  }, []);

  // console.log(invoiceList);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>Danh sách khách hàng</p>
      </div>
      <div className={classes["table-container"]}>
        <div>
          <button className={classes.button}>
            <p className={classes.para}>Tất cả</p>
          </button>
          <button className={classes.button}>
            <p className={classes.para}>Khách hàng thân thiết</p>
          </button>
        </div>
        <hr />
        <div className={classes["search-container"]}>
          <input
            className={classes.search}
            type="search"
            placeholder="Tìm kiếm theo số điện thoại"
          />
        </div>
        <table className={classes.table}>
          <tr className={classes.tr}>
            <th className={classes.th}>Tên khách hàng</th>
            <th className={classes.th}>Số điện thoại</th>
            <th className={classes.th}>Địa chỉ</th>
            <th className={classes.th}>Số lượng đơn hàng</th>
            <th className={classes.th}>Tổng chi tiêu</th>
          </tr>
          {currentCustomer.map((list) => {
            return (
              <tr className={classes.tr} key={list.invoiceCode}>
                <td className={classes.td}>{list.invoiceCode}</td>
                <td className={classes.td}>{list.createdDate}</td>
                <td className={classes.td}>{list.customerName}</td>
                <td className={classes.td}>{list.invoiceType}</td>
                <td className={classes.td}>{list.staffName}</td>
              </tr>
            );
          })}
        </table>
        <Pagination
          totalInvoice={customerList.length}
          invoicePerPage={customerPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TableCustomer;
