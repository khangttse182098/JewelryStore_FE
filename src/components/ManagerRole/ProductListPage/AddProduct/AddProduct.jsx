import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [counterList, setCounterList] = useState([]);
  const [goldList, setGoldList] = useState([]);
  const [imageType, setImageType] = useState([]);
  const [diamondCriteria, setDiamondCriteria] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const counterControllerRef = useRef();
  const goldControllerRef = useRef();
  const diamondControllerRef = useRef();
  const imageControllerRef = useRef();
  const categoryControllerRef = useRef();
  const doneModalRef = useRef();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  function handleOpen() {
    doneModalRef.current.showModal();
  }

  function handleClose() {
    doneModalRef.current.close();
    navigate(-1);
  }

  //---------------------------SubmitForm--------------------
  async function onSubmit(submitData) {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await fetch(
        "http://mahika.foundation:8080/swp/api/file/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
    const requestBody = {
      ...submitData,
      ["counterId"]: Number(submitData.counterId),
      ["materialId"]: Number(submitData.materialId),
      ["gemCost"]: Number(submitData.gemCost),
      ["gemId"]: Number(submitData.gemId),
      ["materialCost"]: Number(submitData.materialCost),
      ["materialWeight"]: Number(submitData.materialWeight),
      ["priceRate"]: Number(submitData.priceRate),
      ["productionCost"]: Number(submitData.productionCost),
      ["file"]: selectedFile,
    };
    console.log(requestBody);
    try {
      const res = await fetch("http://mahika.foundation:8080/swp/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log(res);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  }

  //---------------------------SubmitFileImage---------------
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    file = new File([file], file.name, { type: file.type });
    setSelectedFile(file);
  };

  //---------------------------CategoryName------------------
  useEffect(() => {
    categoryControllerRef.current?.abort();
    categoryControllerRef.current = new AbortController();
    const signal = categoryControllerRef.current.signal;
    const handleCategoryName = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/product-category/category-name",
          { signal }
        );
        const dataCategory = await response.json();
        setCategoryName(dataCategory);
      } catch (err) {}
    };
    handleCategoryName();
  }, []);

  //---------------------------GoldType----------------------
  useEffect(() => {
    goldControllerRef.current?.abort();
    goldControllerRef.current = new AbortController();
    const signal = goldControllerRef.current.signal;
    const handleGoldType = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/material",
          { signal }
        );
        const dataGold = await response.json();
        console.log(dataGold);
        setGoldList(dataGold);
      } catch (err) {}
    };
    handleGoldType();
  }, []);

  //---------------------------Counter-----------------------
  useEffect(() => {
    counterControllerRef.current?.abort();
    counterControllerRef.current = new AbortController();
    const signal = counterControllerRef.current.signal;
    const handleCounter = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/counter",
          { signal }
        );
        const dataCounter = await response.json();
        setCounterList(dataCounter);
      } catch (err) {}
    };
    handleCounter();
  }, []);

  //--------------------------ImageType-------------------------
  useEffect(() => {
    imageControllerRef.current?.abort();
    imageControllerRef.current = new AbortController();
    const signal = imageControllerRef.current.signal;
    const handleImageType = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/product-category/sub-category-type",
          { signal }
        );
        const dataImage = await response.json();
        setImageType(dataImage);
      } catch (err) {}
    };
    handleImageType();
  });
  //-----------------------Diamond information------------------
  useEffect(() => {
    diamondControllerRef.current?.abort();
    diamondControllerRef.current = new AbortController();
    const signal = diamondControllerRef.current.signal;
    const handleDiamond = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/gem",
          { signal }
        );
        const dataDiamond = await response.json();
        setDiamondCriteria(dataDiamond);
      } catch (err) {}
    };
    handleDiamond();
  }, []);

  //--------------------------handleDiamondSelection----------------------
  const handleDiamondSelect = (event) => {
    const selectedId = event.target.value;
    const diamond = diamondCriteria.find(
      (selectedDiamond) => selectedDiamond.gemId === parseInt(selectedId)
    );
    setSelectedDiamond(diamond);
  };

  return (
    <>
      <DoneModal ref={doneModalRef} handleClose={handleClose} />
      <form
        className="grid grid-cols-2 gap-2 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Section Product */}
        <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
          <h2 className="font-semibold text-xl">Chi tiết sản phẩm</h2>
          <hr className="w-full my-2" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Mã sản phẩm</label>
              <input
                className="w-full border rounded p-2"
                {...register("productCode")}
              />
            </div>
            <div>
              <label>Loại vàng</label>
              <select
                className="w-full border rounded p-2"
                {...register("materialId")}
                defaultValue=""
              >
                <option value="" disabled>
                  Chọn loại vàng
                </option>
                {goldList.map((type) => {
                  return (
                    <option value={type.id} key={type.id}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>Tên sản phẩm</label>
              <input
                className="w-full border rounded p-2"
                {...register("productName")}
              />
            </div>
            <div>
              <label>Khối lượng vàng</label>
              <input
                className="w-full border rounded p-2"
                type="number"
                {...register("materialWeight")}
              />
            </div>
            <div>
              <label>Loại sản phẩm</label>
              <select
                className="w-full border rounded p-2"
                {...register("productCategoryName")}
                defaultValue=""
              >
                <option value="" disabled>
                  Chọn loại sản phẩm
                </option>
                {categoryName.map((category) => {
                  return <option key={category}>{category}</option>;
                })}
              </select>
            </div>
            <div>
              <label>Quầy số</label>
              <select
                className="w-full border rounded p-2"
                {...register("counterId")}
                defaultValue=""
              >
                <option value="" disabled>
                  Chọn quầy
                </option>
                {counterList.map((counter) => {
                  return (
                    <option key={counter.counterNo}>{counter.counterNo}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Section Image  */}
        <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Ảnh sản phẩm</h2>
          </div>
          <div className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded">
            <input
              className="mt-4 cursor-pointer"
              type="file"
              name="upfile"
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-4">
            <label>Danh mục</label> <br />
            <select
              className="w-72 border rounded p-2"
              {...register("subCategoryType")}
              defaultValue=""
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {imageType.map((type) => {
                return (
                  <option key={type.productCategoryId}>
                    {type.subCategoryType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Section Price  */}
        <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
          <h2 className="font-semibold text-xl">Thông tin giá</h2>
          <hr className="w-full my-2" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Giá đá</label>
              <input
                className="w-full border rounded p-2"
                {...register("gemCost")}
              />
            </div>
            <div>
              <label>Giá gia công</label>
              <input
                className="w-full border rounded p-2"
                {...register("productionCost")}
              />
            </div>
            <div>
              <label>Giá nguyên liệu</label>
              <input
                className="w-full border rounded p-2"
                {...register("materialCost")}
              />
            </div>
            <div>
              <label>Tỉ lệ áp giá</label>
              <input
                className="w-full border rounded p-2"
                {...register("priceRate")}
              />
            </div>
          </div>
        </div>

        {/* Section Diamond */}
        <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
          <h2 className="font-semibold text-xl">Thông tin kim cương</h2>
          <hr className="w-full my-2" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Tên kim cương</label>
              <select
                className="w-full border rounded p-2"
                {...register("gemId")}
                onChange={handleDiamondSelect}
                defaultValue=""
              >
                <option value="" disabled>
                  Chọn tên kim cương
                </option>
                {diamondCriteria.map((diamond) => {
                  return (
                    <option key={diamond.gemId} value={diamond.gemId}>
                      {diamond.gemName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>Nguồn gốc</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={selectedDiamond?.origin || ""}
                readOnly
              />
            </div>
            <div>
              <label>Giác cắt</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={selectedDiamond?.cut || ""}
                readOnly
              />
            </div>
            <div>
              <label>Carat</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={selectedDiamond?.caratWeight || ""}
                readOnly
              />
            </div>
            <div>
              <label>Độ tinh khiết</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={selectedDiamond?.clarity || ""}
                readOnly
              />
            </div>
            <div>
              <label>Màu sắc</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={selectedDiamond?.color || ""}
                readOnly
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-1/3 h-8 border rounded-md bg-[#0088FF] text-white font-semibold mx-96"
        >
          Lưu
        </button>
      </form>
    </>
  );
};

export default AddProduct;
