import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputDetail from "./InputDetail/InputDetail";
import { useEffect, useRef, useState } from "react";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const GemInforDetail = ({ gem }) => {
  console.log(gem);
  const doneModalRef = useRef();
  const errorModalRef = useRef();
  const navigate = useNavigate();
  const criteriaControllerRef = useRef();
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
  const [origin, setOrigin] = useState(gem.origin);
  const [color, setColor] = useState(gem.color);
  const [cut, setCut] = useState(gem.cut);
  const [clarity, setClarity] = useState(gem.clarity);
  const [fluorescence, setFluorescence] = useState(gem.fluorescence);
  const [polish, setPolish] = useState(gem.polish);
  const [proportion, setProportion] = useState(gem.proportions);
  const [symmetry, setSymmetry] = useState(gem.symmetry);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      origin: origin,
      color: color,
      cut: cut,
      clarity: clarity,
      fluorescence: fluorescence,
      polish: polish,
      proportions: proportion,
      symmetry: symmetry,
    },
  });

  //----------------------handle Gem Criteria-------------------
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

  //--------------------------submitForm---------------------------
  const onSubmit = async (submitData) => {
    const reqBody = {
      ...submitData,
      id: gem.id,
      ["caratWeight"]: Number(submitData.caratWeight),
    };
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/diamond-price/information/add",
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
      {gem.status === 1 ? (
        <InputDetail gem={gem} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full p-20">
          <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
            <h2 className="font-semibold text-2xl">Chi tiết kim cương</h2>
            <hr className="w-full my-2" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Tên kim cương</label>
                <input
                  className="bg-slate-200 w-full border rounded p-2"
                  defaultValue={gem.gemName}
                  {...register("gemName")}
                />
              </div>
              <div>
                <label>Nguồn gốc</label>
                <select
                  className="bg-slate-200 w-full border rounded p-2"
                  value={origin}
                  {...register("origin")}
                  onChange={(event) => {
                    setOrigin(event.target.value);
                    setValue("origin", event.target.value);
                  }}
                >
                  {gemCriteria.origin.map((originOpt) => {
                    return (
                      <option key={originOpt} value={originOpt}>
                        {originOpt}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Màu sắc</label>
                <select
                  className="bg-slate-200 w-full border rounded p-2"
                  value={color}
                  {...register("color")}
                  onChange={(event) => {
                    setColor(event.target.value);
                    setValue("color", event.target.value);
                  }}
                >
                  {gemCriteria.color.map((colorOpt) => {
                    return (
                      <option key={colorOpt} value={colorOpt}>
                        {colorOpt}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Độ tinh khiết</label>
                <select
                  className="bg-slate-200 w-full border rounded p-2"
                  value={clarity}
                  {...register("clarity")}
                  onChange={(event) => {
                    setClarity(event.target.value);
                    setValue("clarity", event.target.value);
                  }}
                >
                  {gemCriteria.clarity.map((clarityOpt) => {
                    return (
                      <option key={clarityOpt} value={clarityOpt}>
                        {clarityOpt}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Trọng lượng (g)</label>
                <input
                  className="bg-slate-200 w-full border rounded p-2"
                  defaultValue={gem.caratWeight}
                  {...register("caratWeight")}
                />
              </div>
              <div>
                <label>Giác cắt</label>
                <select
                  className="bg-slate-200 w-full border rounded p-2"
                  value={cut}
                  {...register("cut")}
                  onChange={(event) => {
                    setCut(event.target.value);
                    setValue("cut", event.target.value);
                  }}
                >
                  {gemCriteria.cut.map((cutOpt) => {
                    return (
                      <option key={cutOpt} value={cutOpt}>
                        {cutOpt}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Phần trăm cắt</label>
                <select
                  className="bg-slate-200 w-full border rounded p-2"
                  value={proportion}
                  {...register("proportions")}
                  onChange={(event) => {
                    setProportion(event.target.value);
                    setValue("proportions", event.target.value);
                  }}
                >
                  {gemCriteria.proportion.map((proportionOpt) => {
                    return (
                      <option key={proportionOpt} value={proportionOpt}>
                        {proportionOpt}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Độ nhẵn</label>
                <select
                  className="bg-slate-200 w-full border rounded p-2"
                  value={polish}
                  {...register("polish")}
                  onChange={(event) => {
                    setPolish(event.target.value);
                    setValue("polish", event.target.value);
                  }}
                >
                  {gemCriteria.polish.map((polishOpt) => {
                    return (
                      <option key={polishOpt} value={polishOpt}>
                        {polishOpt}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Độ cân đối</label>
                <select
                  className="bg-slate-200 w-full border rounded p-2"
                  value={symmetry}
                  {...register("symmetry")}
                  onChange={(event) => {
                    setSymmetry(event.target.value);
                    setValue("symmetry", event.target.value);
                  }}
                >
                  {gemCriteria.symmetry.map((symmetryOpt) => {
                    return (
                      <option key={symmetryOpt} value={symmetryOpt}>
                        {symmetryOpt}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Độ sáng</label>
                <select
                  className="bg-slate-200 w-full border rounded p-2"
                  value={fluorescence}
                  {...register("fluorescence")}
                  onChange={(event) => {
                    setFluorescence(event.target.value);
                    setValue("fluorescence", event.target.value);
                  }}
                >
                  {gemCriteria.fluorescence.map((fluorescenceOpt) => {
                    return (
                      <option key={fluorescenceOpt} value={fluorescenceOpt}>
                        {fluorescenceOpt}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex justify-around">
              <button
                onClick={() => navigate("/managergeminforlist")}
                className="w-64 h-14 border rounded-md bg-[#0088FF] text-white font-semibold text-lg  mt-5"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="w-64 h-14 border rounded-md bg-[#0088FF] text-white font-semibold text-lg mt-5"
              >
                Sửa
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default GemInforDetail;
