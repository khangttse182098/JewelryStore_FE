/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import classes from "./TableCustomer.module.css";
import Pagination from "../../UtilsComponent/Pagination/Pagination";
import { formatter } from "../../../../util/formatter";

const TableCustomer = () => {
  const [searchField, setSearchField] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([...customerList]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("All");

  const handleStatus = (event) => {
    const status = event.target.getAttribute("status");
    setStatus(status);
  };

  //----------------------Pagination---------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage, setCustomerPerPage] = useState(5);

  const lastCustomerIndex = currentPage * customerPerPage;
  const firstCustomerIndex = lastCustomerIndex - customerPerPage;
  const currentCustomer = filterCustomer.slice(
    firstCustomerIndex,
    lastCustomerIndex
  );
  //------------------------------------------------------

  const handleInvoice = () => {
    fetch(`http://mahika.foundation:8080/swp/api/customer/list`, {
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

  const handleSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearchField(searchString);
  };

  useEffect(() => {
    const newFilterCustomer = customerList.filter((customer) => {
      return (
        customer.fullName.toLowerCase().includes(searchField) ||
        customer.phoneNumber.toLowerCase().includes(searchField) ||
        customer.address.toLowerCase().includes(searchField) ||
        customer.quantityOrder.toString().toLowerCase().includes(searchField) ||
        customer.expense.toString().toLowerCase().includes(searchField)
      );
    });
    setFilterCustomer(newFilterCustomer);
  }, [searchField, customerList]);

  return (
    <div>
      <div className={classes.title}>
        <p>Danh sách khách hàng</p>
      </div>
      <div className={classes["table-container"]}>
        <div>
          <button
            className={`${classes.button} ${
              status === "All" ? classes.current : ""
            }`}
            onClick={handleStatus}
            status="All"
          >
            Tất cả
          </button>
        </div>
        <hr />
        <div className={classes["search-container"]}>
          <input
            className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11"
            type="search"
            placeholder="Tìm kiếm khách hàng"
            onChange={handleSearchChange}
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
                <td className={classes.td}>{list.fullName}</td>
                <td className={classes.td}>{list.phoneNumber}</td>
                <td className={classes.td}>{list.address}</td>
                <td className={classes.td}>{list.quantityOrder}</td>
                <td className={classes.td}>{formatter.format(list.expense)}</td>
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
