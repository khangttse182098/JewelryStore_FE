import classes from "./StaffDetail.module.css";
import Pen from "../../../../../public/assets/pen.png";
import React, { useRef, useState, useEffect, useContext } from "react";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { useLocation } from "react-router-dom";

const StaffDetail = () => {
  // const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  const location = useLocation();
  const { staff } = location.state || {}; // Kiểm tra nếu state tồn tại

  if (!staff) {
    return <div>No staff data available</div>;
  }

  // function averageIncome() {
  //   if (staff.personalIncome !== 0)
  //     return staff.personalIncome / staff.sellOrderQuantity;
  // }
  return (
    <>
      {/* Personal Ìnormation */}
      <div className="p-4 w-full">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="font-semibold text-3xl">Thông tin cá nhân</h2>

          <div className="grid grid-cols-3 gap-3 text-center mt-4 mb-4">
            <div>
              <label className="text-xl text-gray-700">Họ và tên</label>
              <div className="text-2xl mt">{staff.fullName}</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Số điện thoại</label>
              <div className="text-2xl ">{staff.phone}</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Vị trí</label>
              <div className="text-2xl">{staff.role}</div>
            </div>
          </div>
          <hr className="w-full my-2" />
          <h2 className="font-semibold text-3xl">Doanh thu</h2>
          <div className="grid grid-cols-3 gap-3 text-center mt-4 mb-4">
            <div>
              <label className="text-xl text-gray-700">Số đơn hàng</label>
              <div className="text-2xl mt-3">{staff.sellOrderQuantity}</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Doanh thu cá nhân</label>
              <div className="text-2xl mt-3">{staff.personalIncome}</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">
                Doanh thu trung bình
              </label>
              <div className="text-2xl mt-3"></div>
            </div>
          </div>
        </div>
        {/* Recent invoice */}
        <div className="bg-white shadow-md p-4 rounded-md mt-4 ">
          <h2 className="font-semibold text-3xl">Hóa đơn gần đây</h2>
          <div className="overflow-y-scroll max-h-[430px]">
            <div className="grid grid-cols-4 gap-3 text-center mt-10 mb-10">
              <div>
                <div className="text-2xl mt-3">INV301</div>
              </div>
              <div>
                <div className="text-2xl mt-3">17/05/2024 15:04</div>
              </div>
              <div>
                <div className="text-2xl mt-3">5,000,000đ</div>
              </div>
              <div>
                <div className="text-2xl mt-3">Đã thanh toán</div>
              </div>
            </div>
            <hr className="w-full my-2" />
          </div>
        </div>
      </div>
    </>
  );
};
export default StaffDetail;
