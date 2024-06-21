import classes from "./StaffDetail.module.css";
import Pen from "../../../../../public/assets/pen.png";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const StaffDetail = ({ staff }) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  return (
    <>
      {/* Personal Ìnormation */}
      <div className="p-4 w-full">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="font-semibold text-3xl">Thông tin cá nhân</h2>
          <div>alo</div>
          <div className="grid grid-cols-3 gap-3 text-center mt-4 mb-4">
            <div>
              <label className="text-xl text-gray-700">Họ và tên</label>
              <div className="text-2xl mt">Nguyễn Văn A</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Số điện thoại</label>
              <div className="text-2xl ">0905772158</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Vị trí</label>
              <div className="text-2xl">Nhân viên</div>
            </div>
          </div>
          <hr className="w-full my-2" />
          <h2 className="font-semibold text-3xl">Doanh thu</h2>
          <div className="grid grid-cols-3 gap-3 text-center mt-4 mb-4">
            <div>
              <label className="text-xl text-gray-700">Số đơn hàng</label>
              <div className="text-2xl mt-3">2</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">Doanh thu cá nhân</label>
              <div className="text-2xl mt-3">100.000.000 vnd</div>
            </div>
            <div>
              <label className="text-xl text-gray-700">
                Doanh thu trung bình
              </label>
              <div className="text-2xl mt-3">50.000.000 vnd</div>
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
