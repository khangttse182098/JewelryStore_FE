import React, { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const AddCustomerModal = forwardRef(({ onClose }, ref) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  async function onSubmit(submitData) {
    const submitBody = { ...submitData, submitData };

    try {
      await fetch("http://mahika.foundation:8080/swp/api/customer", {
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
        className="w-2/5 fixed rounded translate-x-3/4 translate-y-7 drop-shadow-xl"
      >
        <form
          className="flex flex-col h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p
            className="text-3xl font-semibold text-end mr-10 mt-3 text-red-500 cursor-pointer"
            onClick={onClose}
          >
            &times;
          </p>
          <h3 className="text-center mt-5 text-3xl font-semibold">
            Nhập thông tin khách hàng mới
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
                {...register("phoneNumber")}
              />
            </div>
            <div className="block mt-5">
              <label className="flex">Nhập địa chỉ</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("address")}
              />
            </div>
            <div className="block mt-5">
              <label className="flex">Nhập giới tính</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("gender")}
              />
            </div>
            <button
              className="mt-10 mb-10 bg-blue-600 w-52 h-10 rounded-lg hover:bg-blue-900 text-white"
              type="submit"
            >
              Thêm khách hàng mới
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
});
export default AddCustomerModal;
