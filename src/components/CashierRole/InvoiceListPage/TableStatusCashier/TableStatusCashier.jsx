import { useEffect, useState } from "react";
import classes from "./TableStatusCashier.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";

const TableStatusCashier = () => {
  const [statusList, setStatusList] = useState([]);
  // const [status] = useState("Đã thanh toán");

  const handleDelivered = (invoiceCode) => {
    fetch("http://mahika.foundation:8080/swp/api/order/status/delivered", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleStatus();
      });
  };

  const handleStatus = () => {
    fetch("http://mahika.foundation:8080/swp/api/order/cashier-page", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataStatus) => setStatusList(dataStatus))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleStatus();
  }, []);

  //-------------------------Pagination----------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [statusPerPage, setStatusPerPage] = useState(4);

  const lastStatusIndex = currentPage * statusPerPage;
  const firstStatusIndex = lastStatusIndex - statusPerPage;
  const currentStatus = statusList.slice(firstStatusIndex, lastStatusIndex);
  //--------------------------------------------------------------

  //------------------------Search Invoice code--------------------
  const [searchField, setSearchField] = useState("");
  const [filterStatus, setFilterStatus] = useState([statusList]);

  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
    setCurrentPage(1);
  };

  useEffect(() => {
    const newFilterStatus = statusList.filter((status) => {
      return status.invoiceCode.toLowerCase().includes(searchField);
    });
    setFilterStatus(newFilterStatus);
  }, [searchField, statusList]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>Danh sách trạng thái</p>
      </div>
      <div className={classes["table-container"]}>
        <div className={classes["search-container"]}>
          <input
            className={classes.search}
            type="search"
            placeholder="Tìm kiếm mã hóa đơn..."
            onChange={handleSearch}
          />
        </div>
        <table className={classes.table}>
          <tr className={classes.tr}>
            <th className={classes.th}>Mã hóa đơn</th>
            <th className={classes.th}>Khách hàng</th>
            <th className={classes.th}>Trạng thái thanh toán</th>
            <th className={classes.th}>Xác nhận trạng thái</th>
          </tr>
          {filterStatus.map((list) => {
            return (
              <tr className={classes.tr} key={list.invoiceCode}>
                <td className={classes.td}>{list.invoiceCode}</td>
                <td className={classes.td}>{list.customerName}</td>
                <td className={classes.td}>{list.status}</td>
                <td className={classes.td}>
                  <button
                    className={classes.button}
                    onClick={() => handleDelivered(list.invoiceCode)}
                  >
                    Xác nhận
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
        <Pagination
          totalInvoice={statusList.length}
          invoicePerPage={statusPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TableStatusCashier;
