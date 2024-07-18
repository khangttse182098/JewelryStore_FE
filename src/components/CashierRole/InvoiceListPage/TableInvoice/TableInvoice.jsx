import { useState, useEffect } from "react";
import classes from "./TableInvoice.module.css";
import settingIcon from "/assets/setting.png";
import Pagination from "../../UtilsComponent/Pagination/Pagination";
import { formatter } from "../../../../util/formatter";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableInvoice = () => {
  const [invoiceList, setInvoiceList] = useState([]);

  const navigate = useNavigate();

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

  //------------------------------Search----------------------------------
  const [searchField, setSearchField] = useState("");
  const [filterInvoice, setFilterInvoice] = useState([...invoiceList]);

  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
    setCurrentPage(1);
  };

  useEffect(() => {
    const newFilterInvoice = invoiceList.filter((invoice) => {
      return (
        invoice.invoiceCode.toLowerCase().includes(searchField) ||
        invoice.createdDate.toLowerCase().includes(searchField) ||
        invoice.customerName.toLowerCase().includes(searchField) ||
        invoice.invoiceType.toLowerCase().includes(searchField) ||
        invoice.staffName.toLowerCase().includes(searchField) ||
        invoice.totalPrice.toString().toLowerCase().includes(searchField) ||
        invoice.status.toLowerCase().includes(searchField)
      );
    });
    setFilterInvoice(newFilterInvoice);
  }, [searchField, invoiceList]);
  //---------------------------------------------------------------------

  //------------------------Pagination-----------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicePerPage, setInvoicePerPage] = useState(4);

  const lastInvoiceIndex = currentPage * invoicePerPage;
  const firstInvoiceIndex = lastInvoiceIndex - invoicePerPage;
  const currentInvoice = filterInvoice.slice(
    firstInvoiceIndex,
    lastInvoiceIndex
  );
  //-------------------------------Status---------------------------------
  const [currentStatus, setCurrentStatus] = useState("Tất cả");
  const handleStatusOption = (event) => {
    const status = event.target.getAttribute("status");
    setCurrentStatus(status);
    if (status === "Tất cả") {
      setFilterInvoice([...invoiceList]);
    } else {
      const statusInvoice = invoiceList.filter(
        (invoice) => invoice.status === status
      );
      setFilterInvoice(statusInvoice);
    }
  };

  //------------------------------CheckBox--------------------------------
  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      const tempInvoice = invoiceList.map((invoice) => {
        return { ...invoice, isChecked: checked };
      });
      setInvoiceList(tempInvoice);
    } else {
      const tempInvoice = invoiceList.map((invoice) =>
        invoice.invoiceCode === name
          ? { ...invoice, isChecked: checked }
          : invoice
      );
      setInvoiceList(tempInvoice);
    }
  };
  //----------------------------------------------------------------------
  function handleNavigate(list) {
    navigate("/invoicedetail", { state: { list } });
  }

  let skeletonRowList = [];
  for (let index = 0; index < invoicePerPage; index++) {
    skeletonRowList.push(
      <tr>
        <td colSpan="8">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <div>
        <div className={classes.title}>
          <p>Danh sách hóa đơn</p>
        </div>
        <div className={classes["table-container"]}>
          <div>
            <button
              className={`${classes.button} ${
                currentStatus === "Tất cả" ? classes.current : ""
              }`}
              status="Tất cả"
              onClick={handleStatusOption}
            >
              Tất cả
            </button>
            <button
              className={`${classes.button} ${
                currentStatus === "Đã thanh toán" ? classes.current : ""
              }`}
              status="Đã thanh toán"
              onClick={handleStatusOption}
            >
              Đã thanh toán
            </button>
            <button
              className={`${classes.button} ${
                currentStatus === "Chưa thanh toán" ? classes.current : ""
              }`}
              status="Chưa thanh toán"
              onClick={handleStatusOption}
            >
              Chưa thanh toán
            </button>
          </div>
          <hr />
          <div className={classes["search-container"]}>
            <input
              onChange={handleSearch}
              className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11"
              type="search"
              placeholder="Tìm kiếm sản phẩm"
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
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  name="allSelect"
                />
              </th>
              <th className={classes.th}>Mã hóa đơn</th>
              <th className={classes.th}>Ngày tạo</th>
              <th className={classes.th}>Khách hàng</th>
              <th className={classes.th}>Loại hóa đơn</th>
              <th className={classes.th}>Nhân viên bán hàng</th>
              <th className={classes.th}>Thành tiền</th>
              <th className={classes.th}>Trạng thái thanh toán</th>
            </tr>
            {!currentInvoice.length
              ? skeletonRowList
              : currentInvoice.map((list) => {
                  return (
                    <tr
                      className={`${classes.tr} ${
                        list?.isChecked ? classes.select : ""
                      }`}
                      key={list.invoiceCode}
                      onClick={() => {
                        handleNavigate(list);
                      }}
                    >
                      <td className={`${classes.checkbox} ${classes.td}`}>
                        <input
                          type="checkbox"
                          name={list.invoiceCode}
                          onChange={handleCheckbox}
                          checked={list?.isChecked || false}
                        />
                      </td>
                      <td className={classes.td}>{list.invoiceCode}</td>
                      <td className={classes.td}>{list.createdDate}</td>
                      <td className={classes.td}>{list.customerName}</td>
                      <td className={classes.td}>{list.invoiceType}</td>
                      <td className={classes.td}>{list.staffName}</td>
                      <td className={classes.td}>
                        {formatter.format(list.totalPrice)}
                      </td>
                      <td className={classes.td}>
                        <p
                          className={
                            list.status === "Chưa thanh toán"
                              ? classes["status-inProgress"]
                              : list.status === "Đã thanh toán"
                              ? classes["status-success"]
                              : classes["status-received-delivered"]
                          }
                          style={{ marginLeft: "70px" }}
                        >
                          {list.status}
                        </p>
                      </td>
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
    </SkeletonTheme>
  );
};

export default TableInvoice;
