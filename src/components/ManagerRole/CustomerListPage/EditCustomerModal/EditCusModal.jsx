import React, { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const EditCusModal = forwardRef(({ customer, onClose }, ref) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  const onSubmit = async (submitData) => {
    const reqBody = {
      ...submitData,
      id: customer.id,
    };
    console.log(reqBody);
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
      onClose(reqBody);
      handleOpen();
    } catch (error) {}
  };
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
          <p
            className="text-3xl font-semibold text-end mr-10 mt-3 text-red-500 cursor-pointer h-0"
            onClick={onClose(onSubmit)}
          >
            &times;
          </p>
          <h3 className=" text-center mt-5 text-3xl font-semibold">
            Nhập thông tin khách hàng
          </h3>
          <div className="flex flex-col justify-center items-center  ">
            <div className="block mt-10 ">
              <label className="flex">Họ và tên</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("fullName")}
                defaultValue={customer.fullName}
              />
            </div>
            <div className="block mt-5">
              <label className="flex">Số điện thoại</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("phoneNumber")}
                defaultValue={customer.phoneNumber}
              />
            </div>

            <div className="block mt-5">
              <label className="flex">Địa chỉ</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("address")}
                defaultValue={customer.address}
              />
            </div>

            <div className="block mt-5">
              <label className="flex">Giới tính</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("gender")}
                defaultValue={customer.gender}
              />
            </div>
            <button
              className="mt-10 mb-10 bg-blue-600 w-52 h-10 rounded-lg hover:bg-blue-900 text-white"
              type="submit"
            >
              Hoàn thành
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
});
export default EditCusModal;
