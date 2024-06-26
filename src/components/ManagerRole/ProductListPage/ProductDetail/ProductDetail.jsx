import { useEffect, useRef, useState } from "react";
import { formatter } from "../../../../util/formatter";
import DeleteProduct from "../DeleteProduct/DeleteProduct";

const ProductDetail = ({ product }) => {
  const productInfor = product;
  const [diamondCriteria, setDiamondCriteria] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState({});
  const [counterList, setCounterList] = useState([]);
  const [selectedCounter, setSelectedCounter] = useState(
    productInfor.counterNo
  );
  const [materialList, setMaterialList] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(
    productInfor.materialName
  );
  console.log(selectedMaterial);
  const ids = [productInfor.id];
  const ProductDetailRef = useRef();
  const diamondControllerRef = useRef();
  const counterControllerRef = useRef();
  const materialControllerRef = useRef();
  const categoryControllerRef = useRef();
  const { register, handleSubmit } = useForm();

  async function onSubmit(submitData) {
    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // try {
    //   const res = await fetch(
    //     "http://mahika.foundation:8080/swp/api/file/upload",
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );
    //   const data = await res.json();
    // } catch (error) {
    //   console.log(error);
    // }
    const requestBody = {
      ...submitData,
      id: Number(id),
      ["counterId"]: Number(submitData.counterId),
      ["materialId"]: Number(submitData.materialId),
      ["gemCost"]: Number(submitData.gemCost),
      ["gemId"]: Number(submitData.gemId),
      ["materialCost"]: Number(submitData.materialCost),
      ["materialWeight"]: Number(submitData.materialWeight),
      ["priceRate"]: Number(submitData.priceRate),
      ["productionCost"]: Number(submitData.productionCost),
      // ["file"]: selectedFile,
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
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    ProductDetailRef.current.showModal();
  };

  const handleHide = () => {
    ProductDetailRef.current.close();
  };

  //-----------------------Material information------------------
  useEffect(() => {
    materialControllerRef.current?.abort();
    materialControllerRef.current = new AbortController();
    const signal = materialControllerRef.current.signal;
    const handleMaterial = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/material",
          { signal }
        );
        const dataMaterial = await response.json();
        setMaterialList(dataMaterial);
      } catch (err) {}
    };
    handleMaterial();
  }, []);

  const handleMaterialChange = (event) => {
    setSelectedMaterial(event.target.value);
  };

  //-----------------------Counter information------------------
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

  const handleCounterChange = (event) => {
    setSelectedCounter(event.target.value);
  };

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

  const handleDiamondSelect = (event) => {
    const selectedId = event.target.value;
    const diamond = diamondCriteria.find(
      (selectedDiamond) => selectedDiamond.gemId === parseInt(selectedId)
    );
    setSelectedDiamond(diamond);
  };

  useEffect(() => {
    if (productInfor.gemName) {
      const selectedDiamond = diamondCriteria.find(
        (diamond) => diamond.gemName === productInfor.gemName
      );
      setSelectedDiamond(selectedDiamond || {});
    }
  }, [productInfor.gemName, diamondCriteria]);

  return (
    <>
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
                type="text"
                defaultValue={productInfor.productCode}
              />
            </div>
            {selectedMaterial === null ? (
              <div>
                <label>Loại vàng</label>
                <input
                  value="Không có"
                  className="w-full border rounded p-2"
                  readOnly
                />
              </div>
            ) : (
              <div>
                <label>Loại vàng</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedMaterial}
                  onChange={(event) => setSelectedMaterial(event.target.value)}
                  // {...register("materialId")}
                >
                  <option disabled>Chọn loại vàng</option>
                  {materialList.map((material) => {
                    return (
                      <option key={material.id} value={material.name}>
                        {material.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            <div>
              <label>Tên sản phẩm</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                defaultValue={productInfor.productName}
              />
            </div>
            {productInfor.materialWeight === null ? (
              <div>
                <label>Khối lượng vàng</label>
                <input className="w-full border rounded p-2" value="Không có" />
              </div>
            ) : (
              <div>
                <label>Khối lượng vàng</label>
                <input
                  className="w-full border rounded p-2"
                  defaultValue={productInfor.materialWeight}
                  {...register("materialWeight")}
                />
              </div>
            )}
            <div>
              <label>Loại sản phẩm</label>
              <select
                className="w-full border rounded p-2"
                value={productInfor.categoryName}
                // {...register("categoryName")}
                onChange={(event) =>
                  setSelectedCategoryName(event.target.value)
                }
              >
                {categoryName.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>Quầy số</label>
              <select
                className="w-full border rounded p-2"
                value={selectedCounter}
                onChange={(event) => setSelectedCounter(event.target.value)}
                // {...register("counterId")}
              >
                {counterList.map((counter) => {
                  return (
                    <option key={counter.id} value={counter.No}>
                      {counter.counterNo}
                    </option>
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
            <p className="text-[#0088FF] cursor-pointer">Thêm ảnh</p>
          </div>
          <img
            src={productInfor.productImage}
            className="w-72 h-52 border-2 border-gray-300 rounded"
          />
          <div className="mt-4">
            <label>Danh mục</label> <br />
            <select
              className="w-72 border rounded p-2"
              defaultValue={selectedImageType}
              // {...register("subCategoryType")}
              onChange={(event) => setSelectedImageType(event.target.value)}
            >
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
              <label>Giá bán</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                defaultValue={formatter.format(productInfor.price)}
              />
            </div>
            <div>
              <label>Giá đá</label>
              <input
                className="w-full border rounded p-2"
                defaultValue={formatter.format(productInfor.gemCost)}
                {...register("gemCost")}
              />
            </div>
            <div>
              <label>Giá gia công</label>
              <input
                className="w-full border rounded p-2"
                defaultValue={formatter.format(productInfor.productionCost)}
                {...register("productionCost")}
              />
            </div>
            <div>
              <label>Giá nguyên liệu</label>
              <input
                className="w-full border rounded p-2"
                defaultValue={formatter.format(productInfor.materialCost)}
                {...register("materialCost")}
              />
            </div>
            <div>
              <label>Tỉ lệ áp giá</label>
              <input
                className="w-full border rounded p-2"
                defaultValue={productInfor.priceRate + "%"}
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
                defaultValue={productInfor.gemName}
                onChange={handleDiamondSelect}
              >
                <option>Chọn tên kim cương</option>
                {diamondCriteria.map((diamond) => (
                  <option key={diamond.gemId} value={diamond.gemName}>
                    {diamond.gemName}
                  </option>
                ))}
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
              />
            </div>
            <div>
              <label>Carat</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={selectedDiamond?.caratWeight || ""}
              />
            </div>
            <div>
              <label>Độ tinh khiết</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={selectedDiamond?.clarity || ""}
              />
            </div>
            <div>
              <label>Màu sắc</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={selectedDiamond?.color || ""}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/3 h-8 border rounded-md bg-[#0088FF] text-white font-semibold"
          >
            Sửa
          </button>
          <DeleteProduct
            ref={ProductDetailRef}
            handleHide={handleHide}
            deleteCode={ids}
          />
          <button
            type="submit"
            onClick={handleClick}
            className="w-1/3 h-8 border rounded-md bg-red-500 text-white font-semibold"
          >
            Xóa
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductDetail;
