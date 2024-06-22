import React, { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./AddMaterial.module.css";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { formatDate } from "../../../../util/formateDate";
import ErrorModal from "../../../UtilComponent/ErrorModal/ErrorModal";

const AddMaterialModal = forwardRef(({ onClose }, ref) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();
  const errorModalRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);

  async function onSubmit(submitData) {
    const requestBody = {
      ...submitData,
      ["effectDate"]: formatDate(submitData.effectDate),
      ["buyPrice"]: Number(submitData.buyPrice),
      ["sellPrice"]: Number(submitData.sellPrice),
    };
    console.log(requestBody);
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/gold-price",
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
      console.log(error);
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
        className="h-1/2 w-1/2 absolute inset-y-44 inset-x-auto rounded drop-shadow-xl"
      >
        <form
          className="flex flex-col gap-10 h-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center mt-5 text-xl font-medium">
            Thêm loại vàng
          </h1>
          <div className="flex grow flex-col ml-16 mr-16 justify-around ">
            <div className={classes["input-container"]}>
              <label className={classes.label}>Tên loại vàng</label>
              <input className={classes.input} {...register("goldName")} />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Giá bán</label>
              <input className={classes.input} {...register("sellPrice")} />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Giá mua</label>
              <input className={classes.input} {...register("buyPrice")} />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Ngày bắt đầu hiệu lực</label>
              <input
                type="datetime-local"
                className={classes.input}
                {...register("effectDate")}
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-slate-200 p-3 w-1/3 mb-3 text-lg self-center rounded"
            type="submit"
          >
            Thêm
          </button>
        </form>
      </dialog>
    </>
  );
});

export default AddMaterialModal;
