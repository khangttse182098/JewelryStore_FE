import React, { useRef } from "react";
import DetailDiscountInput from "../DetailDiscountInput/DetailDiscountInput";
import { useForm } from "react-hook-form";
import { formatDate } from "../../../../util/formateDate";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const DetailDiscount = ({ discount }) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();

  async function handleDelete() {
    try {
      const res = await fetch(
        `http://mahika.foundation:8080/swp/api/discount/delete-${discount.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (submitData) => {
    const reqBody = {
      ...submitData,
      id: discount.id,
      code: discount.code,
      ["value"]: Number(submitData.value),
      ["startDate"]: formatDate(submitData.startDate),
      ["endDate"]: formatDate(submitData.endDate),
    };
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/discount/information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
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
      <form onSubmit={handleSubmit(onSubmit)} className="h-4/5 flex flex-col">
        <h1 className="text-4xl mt-16 ml-16 font-medium">{discount.code}</h1>
        <div className="w-full flex flex-grow">
          <div className="h-1/2 w-3/4">
            <DetailDiscountInput
              title="giá trị khuyến mãi"
              register={register}
              discount={discount}
            />
            <DetailDiscountInput
              title="Thời gian"
              isDate={true}
              register={register}
              discount={discount}
            />
            <div className="mt-10 ml-10">
              <button
                type="submit"
                className="p-5 w-[20%]  mb-5 rounded bg-blue-500 hover:bg-blue-600 text-2xl font-medium text-slate-200"
              >
                Sửa
              </button>
              <button
                type="submit"
                className="p-5 w-[20%] ml-5 mb-5 rounded bg-red-500 hover:bg-red-600 text-2xl font-medium text-slate-200"
                onClick={handleDelete}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DetailDiscount;
