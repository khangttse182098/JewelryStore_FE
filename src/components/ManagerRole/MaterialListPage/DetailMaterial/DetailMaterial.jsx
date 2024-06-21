import React, { useRef } from "react";
// import DetailDiscountInput from "../DetailDiscountInput/DetailDiscountInput";
import { useForm } from "react-hook-form";
import { formatDate } from "../../../../util/formateDate";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import toDatetimeLocal from "../../../../util/toDateTimeLocal";

const DetailMaterial = ({ material }) => {
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();
  const onSubmit = async (submitData) => {
    const reqBody = {
      materialId: material.id,
      ["effectDate"]: formatDate(submitData.effectDate),
      ["buyPrice"]: Number(submitData.buyPrice),
      ["sellPrice"]: Number(submitData.sellPrice),
    };
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/gold-price",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
      console.log(reqBody);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full border-2 flex flex-col"
      >
        <div className="w-full flex-grow ">
          <div className="h-5/6 w-[90%] mt-10 mx-auto grid grid-cols-2 grid-rows-7 bg-white rounded-xl">
            <h1 className="text-4xl mt-10 pt-10 ml-16 font-medium col-span-2">
              Thông tin giá vàng
            </h1>
            <hr className="h-[2px] w-[90%] mx-auto my-5 bg-black rounded col-span-2" />
            <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
              <label className="ml-11 text-xl font-medium text-[#46515f]">
                Loại vàng
              </label>
              <input
                name="goldName"
                className="py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                placeholder="Nhập loại vàng"
                defaultValue={material.goldName}
                readOnly
              />
            </div>
            <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
              <label className="ml-11 text-xl font-medium text-[#46515f]">
                Giá mua
              </label>
              <input
                name="buyPrice"
                className="py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                placeholder="Nhập giá mua"
                {...register("buyPrice")}
                defaultValue={material.buyPrice}
              />
            </div>
            <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
              <label className="ml-11 text-xl font-medium text-[#46515f]">
                Thời điểm
              </label>
              <input
                name="effectDate"
                type="datetime-local"
                className="py-5 pl-3 pr-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                {...register("effectDate")}
                defaultValue={toDatetimeLocal(material.effectDate)}
              />
            </div>
            <div className="flex flex-col justify-evenly  bg-white  rounded ml-10 row-span-2">
              <label className="ml-11 text-xl font-medium text-[#46515f]">
                Giá bán
              </label>
              <input
                name="sellPrice"
                className="py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                {...register("sellPrice")}
                defaultValue={material.sellPrice}
              />
            </div>
            <button
              type="submit"
              className="p-5 w-[40%] mx-auto mb-5 rounded bg-blue-500 hover:bg-blue-600 text-2xl font-medium text-slate-200 col-span-2"
            >
              Sửa
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DetailMaterial;
