import { useEffect, useRef, useState } from "react";
import classes from "./TableStatusCashier.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const TableStatusCashier = () => {
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
      <tr>
        <td colSpan="8">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  function handleOpenDoneModal() {
    doneModalRef.current.showModal();
  }
  function handleCloseDoneModal() {
    doneModalRef.current.close();
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
                      <td className={`${classes.td}`}>
                        <p
                          className={`${
                            list.status === "Đã thanh toán"
                              ? `${classes["status-success"]}`
                              : `${classes["status-received"]}`
                          }`}
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
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableStatusCashier;
