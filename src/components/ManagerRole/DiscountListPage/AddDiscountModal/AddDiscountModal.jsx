import React, { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./AddDiscountModal.module.css";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { formatDate } from "../../../../util/formateDate";
import ErrorModal from "../../../UtilComponent/ErrorModal/ErrorModal";

const AddDiscountModal = forwardRef(({ onClose }, ref) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();
  const errorModalRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);

  async function onSubmit(submitData) {
    const requestBody = {
      ...submitData,
      ["endDate"]: formatDate(submitData.endDate),
      ["startDate"]: formatDate(submitData.startDate),
      ["value"]: Number(submitData.value),
    };
    console.log(requestBody);
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/discount/information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const obj = await res.json();
      if (!obj.data) {
        onClose();
        handleOpenErrorModal();
        setErrorMsg(obj.message);
      } else {
        onClose();
        handleOpen();
      }
    } catch (error) {
      console.log("Loi rrrr");
    }
  }

  function handleOpen() {
    doneModalRef.current.showModal();
  }

  function handleClose() {
    doneModalRef.current.close();
  }

  function handleOpenErrorModal() {
    errorModalRef.current.showModal();
  }

  function handleCLoseErrorModal() {
    errorModalRef.current.close();
  }

  return (
    <>
      <DoneModal ref={doneModalRef} handleClose={handleClose} />
      <ErrorModal
        ref={errorModalRef}
        handleClose={handleCLoseErrorModal}
        msg={errorMsg}
      />
      <dialog
        ref={ref}
        className="h-1/2 w-1/2 fixed rounded translate-x-2/4 translate-y-2/4 drop-shadow-xl"
      >
        <form
          className="flex flex-col h-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <p
            className="text-3xl font-semibold text-end mr-10 mt-3 text-red-500 cursor-pointer"
            onClick={onClose}
          >
            &times;
          </p>
          <h1 className="text-center text-xl font-medium">
            Thêm mã khuyến mãi
          </h1>
          <div className="flex grow flex-col ml-16 mr-16 justify-around ">
            <div className={classes["input-container"]}>
              <label className={classes.label}>Mã hóa đơn</label>
              <input className={classes.input} {...register("code")} />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Phần trăm</label>
              <input className={classes.input} {...register("value")} />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Ngày bắt đầu</label>
              <input
                type="datetime-local"
                className={classes.input}
                {...register("startDate")}
              />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Ngày kết thúc</label>
              <input
                type="datetime-local"
                className={classes.input}
                {...register("endDate")}
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-slate-200 p-3 w-1/3 mb-3 text-lg self-center rounded mt-3"
            type="submit"
          >
            Thêm
          </button>
        </form>
      </dialog>
    </>
  );
});

export default AddDiscountModal;
