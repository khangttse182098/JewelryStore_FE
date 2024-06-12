/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import classes from "./TableStatus.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableStatus = () => {
  const [statusList, setStatusList] = useState([]);
  const doneModalRef = useRef();

  const handleDelivered = (invoiceCode) => {
    fetch("http://mahika.foundation:8080/swp/api/order/status/delivered", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceCode }),
    }).then((res) => {
      handleStatus();
      handleOpenDoneModal();
    });
  };

  const handleStatus = () => {
    fetch("http://mahika.foundation:8080/swp/api/order/seller-page", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataStatus) => {
        console.log(dataStatus);
        return setStatusList(dataStatus);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleStatus();
  }, []);

  function handleOpenDoneModal() {
    doneModalRef.current.showModal();
  }
  function handleCloseDoneModal() {
    doneModalRef.current.close();
  }

  //-------------------------Pagination----------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [statusPerPage, setStatusPerPage] = useState(4);
  const [searchField, setSearchField] = useState("");
  const [filterStatus, setFilterStatus] = useState([statusList]);

  const lastStatusIndex = currentPage * statusPerPage;
  const firstStatusIndex = lastStatusIndex - statusPerPage;
  const currentStatus = filterStatus.slice(firstStatusIndex, lastStatusIndex);
  //--------------------------------------------------------------

  //------------------------Search Invoice code--------------------

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

  let skeletonRowList = [];
  for (let index = 0; index < statusPerPage; index++) {
    skeletonRowList.push(
      <tr className={classes.tr}>
        <td colSpan="8">
          <Skeleton className={classes.td} />
        </td>
      </tr>
    );
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <DoneModal ref={doneModalRef} handleClose={handleCloseDoneModal} />
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
            {!currentStatus.length
              ? skeletonRowList
              : currentStatus.map((list) => {
                  return (
                    <tr className={classes.tr} key={list.invoiceCode}>
                      <td className={classes.td}>{list.invoiceCode}</td>
                      <td className={classes.td}>{list.customerName}</td>
                      <td className={classes.td}>
                        <p
                          className={
                            list.status === "Đã thanh toán"
                              ? classes["status-success"]
                              : classes["status-delivered"]
                          }
                        >
                          {list.status}
                        </p>
                      </td>
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
            isStatus={true}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableStatus;
