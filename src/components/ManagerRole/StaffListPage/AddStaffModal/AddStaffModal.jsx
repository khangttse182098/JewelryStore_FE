import classes from "./AddStaffModal.module.css";
import React, { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const AddStaffModal = forwardRef(({ onClose }, ref) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  async function onSubmit(submitData) {
    const submitBody = { ...submitData, submitData };

    try {
      await fetch("http://mahika.foundation:8080/swp/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitBody),
      });
      onClose();
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  }
  function handleOpen() {
    doneModalRef.current.showModal();
  }

  function handleClose() {
    doneModalRef.current.close();
  }
  return (
    <>
      <DoneModal ref={doneModalRef} handleClose={handleClose} />
      <dialog
        ref={ref}
        className=" w-2/5 translate-x-3/4 absolute inset-y-44 inset-x-auto rounded drop-shadow-xl"
      >
        <form
          className="flex flex-col gap-10 h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className=" text-center mt-5 text-3xl font-semibold">
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
        </form>
      </dialog>
    </>
  );
});
export default AddStaffModal;
