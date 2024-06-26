import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AddGem = () => {
  const doneModalRef = useRef();
  const errorModalRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);
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
      ["caratWeight"]: Number(submitData.caratWeight),
    };
    console.log(requestBody);
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/diamond-price/information/add",
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
            <label>Tên kim cương</label>
            <input
              className="w-full border rounded p-2"
              {...register("gemName")}
            />
          </div>
          <div>
            <label>Trọng lượng (g)</label>
            <input
              className="w-full border rounded p-2"
              placeholder="Nhập trọng lượng kim cương"
              {...register("caratWeight")}
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
            <label>Phần trăm cắt</label>
            <select
              className="w-full border rounded p-2"
              {...register("proportions")}
            >
              <option value="">Chọn phần trăm cắt</option>
              {gemCriteria.proportion.map((proportion, index) => {
                return (
                  <option value={proportion} key={index}>
                    {proportion}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Độ nhẵn</label>
            <select
              className="w-full border rounded p-2"
              {...register("polish")}
            >
              <option value="">Chọn độ nhẵn</option>
              {gemCriteria.polish.map((polish, index) => {
                return (
                  <option value={polish} key={index}>
                    {polish}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Độ cân đối</label>
            <select
              className="w-full border rounded p-2"
              {...register("symmetry")}
            >
              <option value="">Chọn độ cân đối</option>
              {gemCriteria.symmetry.map((symmetry, index) => {
                return (
                  <option value={symmetry} key={index}>
                    {symmetry}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Độ sáng</label>
            <select
              className="w-full border rounded p-2"
              {...register("fluorescence")}
            >
              <option value="">Chọn độ sáng</option>
              {gemCriteria.fluorescence.map((fluorescence, index) => {
                return (
                  <option value={fluorescence} key={index}>
                    {fluorescence}
                  </option>
                );
              })}
            </select>
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

export default AddGem;
