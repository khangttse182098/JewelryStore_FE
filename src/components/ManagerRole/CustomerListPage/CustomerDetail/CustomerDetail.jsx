import Pen from "../../../../../public/assets/pen.png";
import React, { useRef, useState, useEffect, useContext } from "react";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { useLocation } from "react-router-dom";
import { formatter } from "../../../../util/formatter";
import classes from "./CustomerDetail.module.css";

const CustomerDetail = () => {
  // const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  const location = useLocation();
  const { customer } = location.state || {}; // Kiểm tra nếu state tồn tại
  const [orders, setOrders] = useState([]);

  const handleOrder = () => {
    fetch("http://mahika.foundation:8080/swp/api/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const orderList = data.filter(
          (order) => order.customerId === customer.id
        );

        setOrders(orderList);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    handleOrder();
  }, []);

  if (!customer) {
    return <div>No customer data available</div>;
  }

  //   const averageExpense = customer.expense / customer.quantityOrder;
  //   if (customer.quantityOrder === 0) return averageExpense === 0;

  function averageExpense(average) {
    if (customer.quantityOrder === 0) {
      return (average = 0);
    } else {
      return (average = customer.expense / customer.quantityOrder);
    }
  }

  return (
    <>
      {/* Personal Ìnormation */}
      <div className="p-4 w-full">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="font-semibold text-3xl">Thông tin cá nhân</h2>

          <div className="grid grid-cols-4 gap-3 text-center mt-4 mb-4 h-[90px]">
            <div>
              <label className="text-xl text-gray-700">Họ và tên</label>
              <div className="text-2xl mt-3 font-medium">
                {customer.fullName}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Số điện thoại</label>
              <div className="text-2xl mt-3 font-medium">
                {customer.phoneNumber}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Địa chỉ</label>
              <div className="text-2xl mt-3 font-medium">
                {customer.address}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Giới tính</label>
              <div className="text-2xl mt-3 font-medium">{customer.gender}</div>
            </div>
          </div>
          <hr className="w-full my-2" />
          <h2 className="font-semibold text-3xl">Chi tiêu cá nhân</h2>
          <div className="grid grid-cols-3 gap-3 text-center mt-4 mb-4">
            <div>
              <label className="text-xl text-gray-700">Số đơn hàng</label>
              <div className="text-2xl mt-3 font-medium">
                {customer.quantityOrder}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Tổng chi tiêu</label>
              <div className="text-2xl mt-3 font-medium">
                {formatter.format(customer.expense)}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">
                Chi tiêu trung bình
              </label>
              <div className="text-2xl mt-3 font-medium ">
                {formatter.format(averageExpense())}
              </div>
            </div>
          </div>
        </div>
        {/* Recent invoice */}
        <div className="bg-white shadow-md p-4 rounded-md mt-4 ">
          <h2 className="font-semibold text-3xl mb-5">Hóa đơn gần đây</h2>
          <div className="overflow-y-scroll h-[383px]">
            {orders.length > 0 ? (
              orders.map((order, index) => {
                const statusClass =
                  order.status === "Chưa thanh toán"
                    ? classes["status-inProgress"]
                    : order.status === "Đã thanh toán"
                    ? classes["status-success"]
                    : classes["status-closed"];
                return (
                  <div className="grid grid-cols-4 gap-3 text-center mt-12 mb-12">
                    <div>
                      <div className="text-2xl mt-3 font-medium">
                        {order.invoiceCode}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl mt-3 font-medium">
                        {order.createdDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl mt-3 font-medium">
                        {formatter.format(order.totalPrice)}
                      </div>
                    </div>
                    <div>
                      <div className={`${statusClass} ${classes.status}`}>
                        {order.status}
                        {/* status */}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-red-600">No recent invoices found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomerDetail;
