import { useEffect, useRef, useState } from "react";
import classes from "./TableInvoice.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SkeletonRowList from "../../../UtilComponent/SkeletonRowList/SkeletonRowList";

const TableProduct = () => {
  const controllerRef = useRef();
  const [orderList, setOrderList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterOrder, setFilterOrder] = useState([...orderList]);
  const [status, setStatus] = useState("Tất cả");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(5);
  const navigate = useNavigate();

  //------------------------Get status-------------------------
  const handleStatus = (event) => {
    const status = event.target.getAttribute("status");
    setStatus(status);
    if (status === "Tất cả") {
      setFilterOrder([...orderList]);
    } else {
      const statusOrder = orderList.filter((order) => order.status === status);
      setFilterOrder(statusOrder);
    }
  };

  //------------------------Get list orders--------------------
  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const handleProduct = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/order",
          { signal }
        );
        const data = await response.json();
        setOrderList(data);
        setIsLoading(false);
      } catch (err) {}
    };
    handleProduct();
  }, []);

  //---------------------handleSearch----------------------
  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    const newFilterOrder = orderList.filter((order) => {
      return (
        order.invoiceCode.toLowerCase().includes(searchField) ||
        order.customerName.toLowerCase().includes(searchField) ||
        order.invoiceType.toLowerCase().includes(searchField) ||
        order.staffName.toLowerCase().includes(searchField) ||
        order.status.toLowerCase().includes(searchField) ||
        order.createdDate.includes(searchField)
      );
    });
    setFilterOrder(newFilterOrder);
  }, [searchField, orderList]);

  //------------------------Pagination---------------------
  const lastOrderIndex = currentPage * orderPerPage;
  const firstOrderIndex = lastOrderIndex - orderPerPage;
  const currentOrder = filterOrder.slice(firstOrderIndex, lastOrderIndex);

  function handleNavigate(order) {
    navigate("/manager/invoice/detail", { state: { order } });
  }

  let skeletonRowList = [];
  for (let index = 0; index < orderPerPage; index++) {
    skeletonRowList.push(
      <tr key={index}>
        <td colSpan="7">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <div className="w-10/12 h-5/6 ">
        <div className="text-3xl font-medium py-7">
          <p>Danh sách hóa đơn</p>
        </div>
        <div className="bg-white border-2 rounded-xl">
          <div>
            <button
              status="Tất cả"
              className={`${classes.button} ${
                status === "Tất cả" ? classes.current : ""
              }`}
              onClick={handleStatus}
            >
              Tất cả
            </button>
            <button
              status="Chưa thanh toán"
              className={`${classes.button} ${
                status === "Chưa thanh toán" ? classes.current : ""
              }`}
              onClick={handleStatus}
            >
              Chưa thanh toán
            </button>
            <button
              status="Đã thanh toán"
              className={`${classes.button} ${
                status === "Đã thanh toán" ? classes.current : ""
              }`}
              onClick={handleStatus}
            >
              Đã thanh toán
            </button>
            <button
              status="Đã giao hàng"
              className={`${classes.button} ${
                status === "Đã giao hàng" ? classes.current : ""
              }`}
              onClick={handleStatus}
            >
              Đã giao hàng
            </button>
          </div>
          <hr />
          <div className="my-5">
            <input
              className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11 ml-14 mr-4"
              type="search"
              placeholder="Tìm kiếm hóa đơn"
              onChange={handleSearch}
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>Mã đơn hàng</th>
                <th className={classes.th}>Tên khách hàng</th>
                <th className={classes.th}>Tên nhân viên</th>
                <th className={classes.th}>Loại</th>
                <th className={classes.th}>Trạng thái</th>
                <th className={classes.th}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                skeletonRowList
              ) : !currentOrder.length ? (
                <tr>
                  <td
                    colSpan="7"
                    className="font-medium text-red-500 text-center h-32"
                  >
                    Không tìm thấy kết quả cho "{searchField}"
                  </td>
                </tr>
              ) : (
                currentOrder.map((order) => {
                  const statusClass =
                    order.status === "Đã thanh toán"
                      ? classes["status-success"]
                      : order.status === "Đã giao hàng"
                      ? classes["status-delivered"]
                      : classes["status-failed"];
                  return (
                    <tr
                      className={classes.tr}
                      key={order.invoiceCode}
                      onClick={() => {
                        handleNavigate(order);
                      }}
                    >
                      <td className={classes.td}>{order.invoiceCode}</td>
                      <td className={classes.td}>{order.customerName}</td>
                      <td className={classes.td}>{order.staffName}</td>
                      <td className={classes.td}>{order.invoiceType}</td>
                      <td className={classes.td}>
                        <p className={` ${statusClass} ${classes.status}`}>
                          {order.status}
                        </p>
                      </td>
                      <td className={classes.td}>{order.createdDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Pagination
            totalInvoice={orderList.length}
            invoicePerPage={orderPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableProduct;
