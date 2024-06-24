import { useEffect, useRef, useState } from "react";
import classes from "./TableInvoice.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import SkeletonRowList from "../../../UtilComponent/SkeletonRowList/SkeletonRowList";

const TableProduct = () => {
  const controllerRef = useRef();
  const [orderList, setOrderList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterOrder, setFilterOrder] = useState([...orderList]);
  const [select, setSelect] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(4);
  const navigate = useNavigate();

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
        order.staffName.toLowerCase().includes(searchField)
      );
    });
    setFilterOrder(newFilterOrder);
  }, [searchField, orderList]);

  //------------------------Pagination---------------------
  const lastOrderIndex = currentPage * orderPerPage;
  const firstOrderIndex = lastOrderIndex - orderPerPage;
  const currentOrder = filterOrder.slice(firstOrderIndex, lastOrderIndex);

  //------------------------HandleCheckbox------------------
  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      setSelect(checked);
      const tempOrder = orderList.map((order) => {
        return { ...order, isChecked: checked };
      });
      setOrderList(tempOrder);
    } else {
      const tempOrder = orderList.map((order) => {
        return order.invoiceCode === name
          ? { ...order, isChecked: checked }
          : order;
      });
      setOrderList(tempOrder);
    }
  };

  function handleNavigate(order) {
    navigate("/managerinvoicedetail", { state: { order } });
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <div className="w-10/12 h-5/6 ">
        <div className="text-3xl font-medium py-9">
          <p>Danh sách hóa đơn</p>
        </div>
        <div className="bg-white border-2 rounded-xl">
          <div>
            <button className="h-[50px] w-[200px] border-b-4 border-[#0088FF] text-center text-[#0088FF] font-montserrat text-[15px] cursor-pointer">
              Tất cả
            </button>
          </div>
          <hr />
          <div className="mt-3 mb-3">
            <input
              className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11 ml-14 mr-4"
              type="search"
              placeholder="Tìm kiếm sản phẩm"
              onChange={handleSearch}
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={`${classes["table-header"]} ${classes.th}`}>
                  <input
                    type="checkbox"
                    name="allSelect"
                    onChange={handleCheckbox}
                    checked={select}
                  />
                </th>
                <th className={classes.th}>Mã đơn hàng</th>
                <th className={classes.th}>Tên khách hàng</th>
                <th className={classes.th}>Tên nhân viên</th>
                <th className={classes.th}>Loại</th>
                <th className={classes.th}>Trạng thái</th>
                <th className={classes.th}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {!currentOrder.length ? (
                <SkeletonRowList
                  amount={5}
                  style="border-b-[#dddddd] h-20 font-[400] text-center border-b-0"
                  col={7}
                />
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
                      className={`${classes.tr} ${
                        order?.isChecked ? classes.select : ""
                      }`}
                      key={order.invoiceCode}
                      onClick={() => {
                        handleNavigate(order);
                      }}
                    >
                      <td className={classes.td}>
                        <input
                          type="checkbox"
                          name={order.invoiceCode}
                          onChange={handleCheckbox}
                          checked={order?.isChecked || false}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </td>
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
