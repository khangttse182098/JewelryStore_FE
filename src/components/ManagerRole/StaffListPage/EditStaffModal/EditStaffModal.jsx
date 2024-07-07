import classes from "./EditStaffModal.module.css";
import React, { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const EditStaffModal = forwardRef(({ staff, onClose }, ref) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  const onSubmit = async (submitData) => {
    const reqBody = {
      ...submitData,
      id: staff.id,
      userName: "",
      password: "",
    };
    console.log(reqBody);
    try {
      const res = await fetch("http://mahika.foundation:8080/swp/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
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
        className=" w-2/5 translate-x-3/4 translate-y-1/3 rounded drop-shadow-xl"
      >
        <form
          className="flex flex-col gap-10 h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className=" text-center mt-5 text-3xl font-semibold">
            Nhập thông tin nhân viên
          </h3>
          <div className="flex flex-col justify-center items-center  ">
            <div className="block mt-10 ">
              <label className="flex">Nhập họ và tên</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("fullName")}
                defaultValue={staff.fullName}
              />
            </div>
            <div className="block mt-5">
              <label className="flex">Nhập số điện thoại</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("phone")}
                defaultValue={staff.phone}
              />
            </div>

            <div className="block mt-5">
              <label className="flex">Nhập vị trí làm việc</label>
              <input
                className="w-96 h-10 rounded-sm bg-gray-100"
                {...register("role")}
                defaultValue={staff.role}
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
export default EditStaffModal;
