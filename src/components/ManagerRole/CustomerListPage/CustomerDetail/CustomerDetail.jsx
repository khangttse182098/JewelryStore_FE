import Pen from "../../../../../public/assets/pen.png";
import React, { useRef, useState, useEffect } from "react";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { useLocation, useNavigate } from "react-router-dom";
import { formatter } from "../../../../util/formatter";
import classes from "./CustomerDetail.module.css";
import EditCusModal from "../EditCustomerModal/EditCusModal";
import UpdateIcon from "../../../../../public/assets/pen.png";
import DeleteIcon from "../../../../../public/assets/delete.png";
import DeleteCustomerModal from "../DeleteCustomerModal/DeleteCustomerModal"; // Import the new modal

const CustomerDetail = () => {
  const doneModalRef = useRef();
  const deleteModalRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const { customer } = location.state || {};
  const [orders, setOrders] = useState([]);
  const [objCustomer, setObjCustomer] = useState(customer);
  const customerInputFormRef = useRef();

  if (!objCustomer) {
    return <div>No customer data available</div>;
  }

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

  function handleClick() {
    customerInputFormRef.current.showModal();
  }

  function handleClose(submitData) {
    setObjCustomer((o) => ({
      ...o,
      fullName: submitData.fullName,
      phoneNumber: submitData.phoneNumber,
      address: submitData.address,
      gender: submitData.gender,
    }));
    customerInputFormRef.current.close();
  }

  function handleDeleteClick() {
    deleteModalRef.current.showModal();
  }

  function handleDelete() {
    fetch(
      `http://mahika.foundation:8080/swp/api/customer/delete-${objCustomer.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          navigate("/manager/customer/list");
        } else {
          console.log("Error deleting customer");
        }
      })
      .catch((error) => console.log(error));
  }

  function averageExpense() {
    if (customer.quantityOrder === 0) {
      return 0;
    } else {
      return customer.expense / customer.quantityOrder;
    }
  }

  return (
    <>
      <EditCusModal
        customer={objCustomer}
        onClose={handleClose}
        ref={customerInputFormRef}
      />
      <DeleteCustomerModal
        ref={deleteModalRef}
        onDelete={handleDelete}
        hasOrders={orders.length > 0}
      />
      <div className="p-4 w-full">
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-3xl">Thông tin cá nhân</h2>
            <div className="flex items-center">
              <img
                src={UpdateIcon}
                alt="UpdateIcon"
                className="w-[20px] mr-5"
                onClick={handleClick}
              />

              <img
                src={DeleteIcon}
                alt="DeleteIcon"
                className="w-[20px]"
                onClick={handleDeleteClick}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 text-center mt-4 mb-4 h-[90px]">
            <div>
              <label className="text-xl text-gray-700">Họ và tên</label>
              <div className="text-2xl mt-3 font-medium">
                {objCustomer.fullName}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Số điện thoại</label>
              <div className="text-2xl mt-3 font-medium">
                {objCustomer.phoneNumber}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Địa chỉ</label>
              <div className="text-2xl mt-3 font-medium">
                {objCustomer.address}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Giới tính</label>
              <div className="text-2xl mt-3 font-medium">
                {objCustomer.gender}
              </div>
            </div>
          </div>
          <hr className="w-full my-2" />
          <h2 className="font-semibold text-3xl">Chi tiêu cá nhân</h2>
          <div className="grid grid-cols-3 gap-3 text-center mt-4 mb-4">
            <div>
              <label className="text-xl text-gray-700">Số đơn hàng</label>
              <div className="text-2xl mt-3 font-medium">
                {objCustomer.quantityOrder}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Tổng chi tiêu</label>
              <div className="text-2xl mt-3 font-medium">
                {formatter.format(objCustomer.expense)}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">
                Chi tiêu trung bình
              </label>
              <div className="text-2xl mt-3 font-medium">
                {formatter.format(averageExpense())}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md mt-4">
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
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-3 text-center mt-12 mb-12"
                  >
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
