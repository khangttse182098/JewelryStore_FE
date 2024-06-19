import classes from "./AddStaffModal.module.css";
import React, { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const AddStaffModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  const { register, handleSubmit } = useForm();

  const handleClose = (e) => {
    if (e.target.id === "input") onClose();
  };
  async function onSubmit(submitData) {
    const submitBody = { ...submitData, ["phone"]: Number(submitData.phone) };
    console.log(submitBody);
    try {
      await fetch("http://mahika.foundation:8080/swp/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitBody),
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      id="input"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div
        className="w-2/5 h-52 flex flex-col mb-96  bg-white rounded-lg border-solid border-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className=" flex flex-col justify-center items-center text-3xl mt-10 font-semibold">
          Nhập thông tin nhân viên mới
        </h3>
        <div className="flex flex-col justify-center items-center  ">
          <div className="block mt-10 ">
            <label className="flex">Nhập họ và tên</label>
            <input
              className="w-96 h-10 rounded-sm bg-gray-100"
              {...register("fullName")}
            />
          </div>
          <div className="block mt-5">
            <label className="flex">Nhập số điện thoại</label>
            <input
              className="w-96 h-10 rounded-sm bg-gray-100"
              {...register("phone")}
            />
          </div>
          <div className="block mt-5">
            <label className="flex">Nhập tên đăng nhập</label>
            <input
              className="w-96 h-10 rounded-sm bg-gray-100"
              {...register("userName")}
            />
          </div>
          <div className="block mt-5">
            <label className="flex">Nhập mật khẩu</label>
            <input
              className="w-96 h-10 rounded-sm bg-gray-100"
              {...register("password")}
            />
          </div>
          <div className="block mt-5">
            <label className="flex">Nhập vị trí làm việc</label>
            <input
              className="w-96 h-10 rounded-sm bg-gray-100"
              {...register("role")}
            />
          </div>
          <button
            className="mt-10 mb-10 bg-blue-600 w-52 h-10 rounded-lg hover:bg-blue-900 text-white"
            type="submit"
          >
            Thêm nhân viên mới
          </button>
        </div>
      </div>
    </form>
  );
};
export default AddStaffModal;
