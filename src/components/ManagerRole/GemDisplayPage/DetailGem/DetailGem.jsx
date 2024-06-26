import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { formatDate } from "../../../../util/formateDate";
import toDatetimeLocal from "../../../../util/toDateTimeLocal";

const DetailGem = ({ gem }) => {
  console.log(gem);
  const { register, handleSubmit } = useForm();
  const doneModalRef = useRef();
  const navigate = useNavigate();
  const onSubmit = async (submitData) => {
    const reqBody = {
      origin: gem.origin,
      clarity: gem.clarity,
      color: gem.color,
      cut: gem.cut,
      caratWeightFrom: gem.caratWeightFrom,
      caratWeightTo: gem.caratWeightTo,
      ["effectDate"]: formatDate(submitData.effectDate),
      ["buyPrice"]: Number(submitData.buyPrice),
      ["sellPrice"]: Number(submitData.sellPrice),
    };
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/diamond-price/information/diamond/new-price",
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
    navigate(-1);
  }
  return (
    <>
      <DoneModal ref={doneModalRef} handleClose={handleClose} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full border-2 flex flex-col"
      >
        <div className="grid gap-2 p-4">
          <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
            <h1 className="font-semibold text-2xl">Thông tin giá kim cương</h1>
            <hr className="w-full my-2" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
                <label className="ml-11 text-xl font-medium text-[#46515f]">
                  Nguồn gốc
                </label>
                <input
                  name="origin"
                  className="py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg bg-slate-200"
                  placeholder="Nhập loại kim cương"
                  defaultValue={gem.origin}
                  readOnly
                />
              </div>
              <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
                <label className="ml-11 text-xl font-medium text-[#46515f]">
                  Màu sắc
                </label>
                <input
                  name="color"
                  className="bg-slate-200 py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                  placeholder="Nhập loại kim cương"
                  defaultValue={gem.color}
                  readOnly
                />
              </div>
              <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
                <label className="ml-11 text-xl font-medium text-[#46515f]">
                  Giác cắt
                </label>
                <input
                  name="cut"
                  className="bg-slate-200 py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                  placeholder="Nhập loại kim cương"
                  defaultValue={gem.cut}
                  readOnly
                />
              </div>
              <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
                <label className="ml-11 text-xl font-medium text-[#46515f]">
                  Độ tinh khiết
                </label>
                <input
                  name="clarity"
                  className="bg-slate-200 py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                  placeholder="Nhập loại kim cương"
                  defaultValue={gem.clarity}
                  readOnly
                />
              </div>
              <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
                <label className="ml-11 text-xl font-medium text-[#46515f]">
                  Trọng lượng từ
                </label>
                <input
                  name="caratWeightFrom"
                  className="bg-slate-200 py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                  placeholder="Nhập loại kim cương"
                  defaultValue={gem.caratWeightFrom}
                  readOnly
                />
              </div>
              <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
                <label className="ml-11 text-xl font-medium text-[#46515f]">
                  Trọng lượng tới
                </label>
                <input
                  name="caratWeightTo"
                  className="bg-slate-200 py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                  placeholder="Nhập loại kim cương"
                  defaultValue={gem.caratWeightTo}
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
                  defaultValue={gem.buyPrice}
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
                  defaultValue={toDatetimeLocal(gem.effectDate)}
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
                  defaultValue={gem.sellPrice}
                />
              </div>
              <button
                type="submit"
                className="p-5 w-[40%] mx-auto mb-5 rounded bg-blue-500 hover:bg-blue-600 text-2xl font-medium text-slate-200 col-span-2"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DetailGem;
