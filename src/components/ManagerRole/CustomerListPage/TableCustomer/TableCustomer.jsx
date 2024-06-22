import { useEffect, useState, Fragment } from "react";
import classes from "./TableCustomer.module.css";
import { formatter } from "../../../../util/formatter";
import PaginationCustomerList from "./../PaginationCustomerList/PaginationCustomerList";
import { useNavigate } from "react-router-dom";

const TableCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage, setCustomerPerPage] = useState(5);
  const lastCustomerIndex = currentPage * customerPerPage;
  const firstCustomerIndex = lastCustomerIndex - customerPerPage;
  const currentCustomer = filterCustomer.slice(
    firstCustomerIndex,
    lastCustomerIndex
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleCustomer = async () => {
      const response = await fetch(
        "http://mahika.foundation:8080/swp/api/customer/list"
      );
      const data = await response.json();
      setCustomerList(data);
      setFilterCustomer(data); // Update filterCustomer when data is fetched
    };
    handleCustomer();
  }, []);

  const handleStatusOption = (event) => {
    const status = event.target.getAttribute("status");

    if (status === "Tất cả") {
      setFilterCustomer([...customerList]);
    }
  };

  function handleNavigate(customer) {
    navigate("/managercustomerdetail", { state: { customer } });
  }

  return (
    <Fragment>
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-10">
          <p>Danh sách khách hàng</p>
        </div>

        <div className="bg-white border-2 border-white rounded-xl shadow-lg">
          <div>
            {["Tất cả"].map((status) => (
              <button
                key={status}
                className={
                  "h-12 w-48 rounded-t-lg bg-white text-center font-montserrat text-base border-b-2 border-blue-600 text-blue-600"
                }
                status="Tất cả"
                onClick={handleStatusOption}
              >
                {status}
              </button>
            ))}
          </div>

          <hr />
          <div className="mt-5 mb-7">
            <input
              className="h-37 w-583 rounded-10 border-double border-[#dfd8d8] outline-none pl-11"
              type="search"
              placeholder="Tìm kiếm khách hàng"
            />
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
              {currentCustomer.map((customer) => (
                <tr
                  className={`${classes.tr} ${
                    customer.isChecked ? classes.select : ""
                  }`}
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
              ))}
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
    </Fragment>
  );
};

export default TableCustomer;
