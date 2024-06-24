import classes from "./StaffDetail.module.css";
import Pen from "../../../../../public/assets/pen.png";
import React, { useRef, useState, useEffect, useContext } from "react";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { useLocation } from "react-router-dom";
import { formatter } from "../../../../util/formatter";
import UpdateIcon from "../../../../../public/assets/pen.png";
import EditStaffModal from "../EditStaffModal/EditStaffModal";

const StaffDetail = () => {
  // const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  const location = useLocation();
  const { staff } = location.state || {}; // Kiểm tra nếu state tồn tại
  const [orders, setOrders] = useState([]);
  const staffInputFormRef = useRef();

  if (!staff) {
    return <div>No staff data available</div>;
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
          (order) => order.staffName === staff.fullName
        );

        setOrders(orderList);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    handleOrder();
  }, []);

  function averageIncome(average) {
    if (staff.personalIncome !== 0)
      return (average = staff.personalIncome / staff.sellOrderQuantity);
    else return (average = 0);
  }

  function handleClick() {
    staffInputFormRef.current.showModal();
  }

  function handleHide() {
    staffInputFormRef.current.close();
  }

  return (
    <>
      <EditStaffModal
        staff={staff}
        onClose={handleHide}
        ref={staffInputFormRef}
      />
      {/* Personal Ìnormation */}
      <div className="p-4 w-full">
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-3xl">Thông tin cá nhân</h2>
            <img
              src={UpdateIcon}
              alt="UpdateIcon"
              className="w-[20px]"
              onClick={handleClick}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center mt-4 mb-4">
            <div>
              <label className="text-xl text-gray-700">Họ và tên</label>
              <div className="text-2xl mt-3 font-medium ">{staff.fullName}</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Số điện thoại</label>
              <div className="text-2xl mt-3 font-medium">{staff.phone}</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Vị trí</label>
              <div className="text-2xl mt-3 font-medium">{staff.role}</div>
            </div>
          </div>
          <hr className="w-full my-2" />
          <h2 className="font-semibold text-3xl">Doanh thu</h2>
          <div className="grid grid-cols-3 gap-3 text-center mt-4 mb-4">
            <div>
              <label className="text-xl text-gray-700">Số đơn hàng</label>
              <div className="text-2xl mt-3 font-medium">
                {staff.sellOrderQuantity}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">
                Tổng doanh thu cá nhân
              </label>
              <div className="text-2xl mt-3 font-medium">
                {formatter.format(staff.personalIncome)}
              </div>
            </div>
            <div>
              <label className="text-xl text-gray-700">
                Doanh thu trung bình
              </label>
              <div className="text-2xl mt-3 font-medium">
                {formatter.format(averageIncome())}
              </div>
            </div>
          </div>
        </div>
        {/* Recent invoice */}
        <div className="bg-white shadow-md p-4 rounded-md mt-4 ">
          <h2 className="font-semibold text-3xl">Hóa đơn gần đây</h2>
          <div className="overflow-y-scroll h-[423px]">
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
export default StaffDetail;
