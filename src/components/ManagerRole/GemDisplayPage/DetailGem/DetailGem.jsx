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
      gemId: gem.id,
      ["effectDate"]: formatDate(submitData.effectDate),
      ["buyPrice"]: Number(submitData.buyPrice),
      ["sellPrice"]: Number(submitData.sellPrice),
    };
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/diamong-price/information",
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
        <div className="flex-grow">
          <div className="h-5/6 w-[90%] mt-10 mx-auto grid grid-cols-2 grid-rows-7 bg-white rounded-xl">
            <h1 className="text-4xl mt-10 pt-10 ml-16 font-medium col-span-2">
              Thông tin giá kim cương
            </h1>
            <hr className="h-[2px] w-[90%] mx-auto my-3 bg-black rounded col-span-2" />
            <div className="flex flex-col justify-evenly bg-white rounded ml-10 row-span-2">
              <label className="ml-11 text-xl font-medium text-[#46515f]">
                Loại kim cương
              </label>
              <input
                name="goldName"
                className="py-5 pl-3 w-4/5 ml-11 border-2 border-[#d2d4d8] focus:outline-none bg-transparent rounded-lg"
                placeholder="Nhập loại kim cương"
                defaultValue={gem.name}
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
      </form>
    </>
  );
};

export default DetailGem;
