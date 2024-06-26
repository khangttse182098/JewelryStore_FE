import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import toDatetimeLocal from "../../../../util/toDateTimeLocal";
import { formatDate } from "../../../../util/formateDate";

const AddGemCriteria = () => {
  const criteriaControllerRef = useRef();
  const { register, handleSubmit } = useForm();
  const [gemCriteria, setGemCriteria] = useState({
    origin: [],
    color: [],
    cut: [],
    clarity: [],
    fluorescence: [],
    polish: [],
    proportion: [],
    symmetry: [],
  });

  //----------------------------Criteria List----------------
  useEffect(() => {
    criteriaControllerRef.current?.abort();
    criteriaControllerRef.current = new AbortController();
    const signal = criteriaControllerRef.current.signal;
    const handleGemCriteria = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/diamond-criteria",
          { signal }
        );
        const dataGem = await response.json();
        setGemCriteria(dataGem);
      } catch (err) {}
    };
    handleGemCriteria();
  }, []);

  //---------------------------SubmitForm--------------------
  async function onSubmit(submitData) {
    const requestBody = {
      ...submitData,
      ["caratWeightFrom"]: Number(submitData.caratWeightFrom),
      ["caratWeightTo"]: Number(submitData.caratWeightTo),
      ["effectDate"]: formatDate(submitData.effectDate),
      ["buyPrice"]: Number(submitData.buyPrice),
      ["sellPrice"]: Number(submitData.sellPrice),
    };
    console.log(requestBody);
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/diamond-price/information/diamond/new-price",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className="grid gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
        <h2 className="font-semibold text-xl">Chi tiết kim cương</h2>
        <hr className="w-full my-2" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Trọng lượng từ (g)</label>
            <input
              className="w-full border rounded p-2"
              placeholder="Nhập trọng lượng kim cương từ"
              {...register("caratWeightFrom")}
            />
          </div>
          <div>
            <label>Trọng lượng tới (g)</label>
            <input
              className="w-full border rounded p-2"
              placeholder="Nhập trọng lượng kim cương tới"
              {...register("caratWeightTo")}
            />
          </div>
          <div>
            <label>Nguồn gốc</label>
            <select
              className="w-full border rounded p-2"
              {...register("origin")}
            >
              <option value="">Chọn nguồn gốc</option>
              {gemCriteria.origin.map((origin, index) => {
                return (
                  <option value={origin} key={index}>
                    {origin}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Màu sắc</label>
            <select
              className="w-full border rounded p-2"
              {...register("color")}
            >
              <option value="">Chọn màu sắc</option>
              {gemCriteria.color.map((color, index) => {
                return (
                  <option value={color} key={index}>
                    {color}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Độ tinh khiết</label>
            <select
              className="w-full border rounded p-2"
              {...register("clarity")}
            >
              <option value="">Chọn độ tinh khiết</option>
              {gemCriteria.clarity.map((clarity, index) => {
                return (
                  <option key={index} value={clarity}>
                    {clarity}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Giác cắt</label>
            <select className="w-full border rounded p-2" {...register("cut")}>
              <option value="">Chọn giác cắt</option>
              {gemCriteria.cut.map((cut, index) => {
                return (
                  <option value={cut} key={index}>
                    {cut}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Giá mua</label>
            <input
              className="w-full border rounded p-2"
              placeholder="Nhập giá mua"
              {...register("buyPrice")}
            />
          </div>
          <div>
            <label>Giá bán</label>
            <input
              className="w-full border rounded p-2"
              placeholder="Nhập giá bán"
              {...register("sellPrice")}
            />
          </div>
          <div>
            <label>Thời điểm</label>
            <input
              className="w-full border rounded p-2"
              type="datetime-local"
              placeholder="Nhập thời điểm"
              {...register("effectDate")}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-1/3 h-8 border rounded-md bg-[#0088FF] text-white font-semibold mx-64"
      >
        Lưu
      </button>
    </form>
  );
};

export default AddGemCriteria;
