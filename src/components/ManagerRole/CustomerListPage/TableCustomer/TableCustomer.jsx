import { useEffect, useState, useRef, Fragment } from "react";
import classes from "./TableCustomer.module.css";
import { formatter } from "../../../../util/formatter";
import PaginationCustomerList from "./../PaginationCustomerList/PaginationCustomerList";
import { useNavigate } from "react-router-dom";
import SkeletonRowList from "../../../UtilComponent/SkeletonRowList/SkeletonRowList";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([...customerList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage, setCustomerPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const lastCustomerIndex = currentPage * customerPerPage;
  const firstCustomerIndex = lastCustomerIndex - customerPerPage;
  const currentCustomer = filterCustomer.slice(
    firstCustomerIndex,
    lastCustomerIndex
  );
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const customerInputFormRef = useRef();
  function handleClick() {
    customerInputFormRef.current.showModal();
  }
  function handleHide() {
    customerInputFormRef.current.close();
    getData();
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const handleCustomer = async () => {
      const response = await fetch(
        "http://mahika.foundation:8080/swp/api/customer/list"
      );
      const data = await response.json();
      setCustomerList(data);
      setFilterCustomer(data);
      setIsLoading(false);
    };
    return await handleCustomer();
  };

  const handleStatusOption = (event) => {
    const status = event.target.getAttribute("status");

    if (status === "Tất cả") {
      setFilterCustomer([...customerList]);
    }
  };

  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
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

  function handleNavigate(customer) {
    navigate("/managercustomerdetail", { state: { customer } });
  }

  let skeletonRowList = [];
  for (let index = 0; index < customerPerPage; index++) {
    skeletonRowList.push(
      <tr key={index}>
        <td colSpan="5">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <AddStaffModal onClose={handleHide} ref={customerInputFormRef} />
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-7">
          <p>Danh sách khách hàng</p>
        </div>
        <div className="bg-white border-2 border-white rounded-xl shadow-lg">
          <div>
            {["Tất cả"].map((status) => (
              <button
                key={status}
                className={
                  "h-12 w-48 rounded-t-lg bg-white text-center font-montserrat text-base border-b-4 border-blue-600 text-[#2661ec] font-semibold"
                }
                status="Tất cả"
                onClick={handleStatusOption}
              >
                {status}
              </button>
            ))}
          </div>

          <hr />
          <div className="my-5">
            <input
              className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11 ml-14 mr-4"
              type="search"
              placeholder="Tìm kiếm khách hàng"
              onChange={handleSearch}
            />
            <button
              className="w-40 h-10 bg-blue-600 rounded-md text-white ml-10 hover:bg-blue-900 text-xl"
              onClick={handleClick}
            >
              + Thêm mới
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>Tên khách hàng</th>
                <th className={classes.th}>Số điện thoại</th>
                <th className={classes.th}>Địa chỉ</th>
                <th className={classes.th}>Số lượng đơn hàng</th>
                <th className={classes.th}>Tổng chi tiêu</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                skeletonRowList
              ) : !currentCustomer.length ? (
                <tr>
                  <td
                    colSpan="5"
                    className="font-medium text-red-500 text-center h-32"
                  >
                    Không tìm thấy kết quả cho "{searchField}"
                  </td>
                </tr>
              ) : (
                currentCustomer.map((customer) => (
                  <tr
                    className={classes.tr}
                    key={customer.id}
                    onClick={() => handleNavigate(customer)}
                  >
                    <td className={classes.td}>{customer.fullName}</td>
                    <td className={classes.td}>{customer.phoneNumber}</td>
                    <td className={classes.td}>{customer.address}</td>
                    <td className={classes.td}>{customer.quantityOrder}</td>
                    <td className={classes.td}>
                      {formatter.format(customer.expense)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <PaginationCustomerList
            totalCustomer={filterCustomer.length}
            customerPerPage={customerPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableCustomer;
