import { useEffect, useRef, useState } from "react";
import { formatter } from "../../../../util/formatter";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import { useForm } from "react-hook-form";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product }) => {
  const productInfor = product;
  console.log(productInfor);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [categoryName, setCategoryName] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    productInfor.categoryName
  );
  const [diamondCriteria, setDiamondCriteria] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [selectedDiamondId, setSelectedDiamondId] = useState(
    productInfor.gemId
  );
  const [selectedDiamondCriteria, setSelectedDiamondCriteria] =
    useState(selectedDiamond);
  const [imageType, setImageType] = useState([]);
  const [selectedImageType, setSelectedImageType] = useState(
    productInfor.subCategoryType
  );
  const [counterList, setCounterList] = useState([]);
  const [selectedCounter, setSelectedCounter] = useState(
    productInfor.counterNo
  );
  const id = productInfor.id;
  const [materialList, setMaterialList] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(
    productInfor.materialName
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    productInfor.materialId
  );
  const ids = [productInfor.id];
  const imageControllerRef = useRef();
  const ProductDetailRef = useRef();
  const diamondControllerRef = useRef();
  const counterControllerRef = useRef();
  const materialControllerRef = useRef();
  const categoryControllerRef = useRef();
  const doneModalRef = useRef();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

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
      id: Number(id),
      ["productCategoryName"]: selectedCategoryName,
      counterId: Number(selectedCounter),
      gemId: Number(selectedDiamondId),
      materialId: Number(selectedMaterialId),
      gemCost: Number(submitData.gemCost),
      materialCost: Number(submitData.materialCost),
      materialWeight: Number(submitData.materialWeight),
      priceRate: Number(submitData.priceRate),
      productionCost: Number(submitData.productionCost),
      subCategoryType: selectedImageType,
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

  function handleOpen() {
    doneModalRef.current.showModal();
  }

  function handleClose() {
    doneModalRef.current.close();
    navigate(-1);
  }

  const handleClick = () => {
    ProductDetailRef.current.showModal();
  };

  const handleHide = () => {
    ProductDetailRef.current.close();
  };

  //---------------------------SubmitFileImage---------------
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    file = new File([file], file.name, { type: file.type });
    setSelectedFile(file);
  };

  //-----------------------Category--------------------------
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

  useEffect(() => {
    if (selectedDiamondId) {
      const selectedDiamondDetail = diamondCriteria.find(
        (diamond) => diamond.gemId === selectedDiamondId
      );
      setSelectedDiamond(selectedDiamondDetail);
      setSelectedDiamondCriteria(selectedDiamondDetail);
    }
  }, [selectedDiamondId, diamondCriteria]);

  const handleDiamondChange = (event) => {
    const selectDiamond = diamondCriteria.find(
      (diamond) => diamond.gemId === parseInt(event.target.value)
    );
    setSelectedDiamond(selectDiamond);
    setSelectedDiamondId(event.target.value);
  };
  //--------------------------Image----------------------------
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
  }, []);

  return (
    <>
      <DoneModal ref={doneModalRef} handleClose={handleClose} />
      <div>
        <h3></h3>

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
                  name="productCode"
                  className="w-full border rounded p-2"
                  {...register("productCode")}
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
                    name="materialId"
                    className="w-full border rounded p-2"
                    value={selectedMaterialId}
                    {...register("materialId")}
                    onChange={(event) => {
                      const selectMaterial = materialList.find((material) => {
                        material.id === event.target.value;
                      });
                      setSelectedMaterial(selectMaterial);
                      setSelectedMaterialId(event.target.value);
                    }}
                  >
                    <option disabled>Chọn loại vàng</option>
                    {materialList.map((material) => {
                      return (
                        <option key={material.id} value={material.id}>
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
                  name="productName"
                  className="w-full border rounded p-2"
                  {...register("productName")}
                  defaultValue={productInfor.productName}
                />
              </div>
              {productInfor.materialWeight === null ? (
                <div>
                  <label>Khối lượng vàng</label>
                  <input
                    className="w-full border rounded p-2"
                    value="Không có"
                  />
                </div>
              ) : (
                <div>
                  <label>Khối lượng vàng</label>
                  <input
                    name="materialWeight"
                    className="w-full border rounded p-2"
                    defaultValue={productInfor.materialWeight}
                    {...register("materialWeight")}
                  />
                </div>
              )}
              <div>
                <label>Loại sản phẩm</label>
                <select
                  name="productCategoryName"
                  className="w-full border rounded p-2"
                  value={selectedCategoryName}
                  {...register("productCategoryName")}
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
                  name="counterId"
                  className="w-full border rounded p-2"
                  value={selectedCounter}
                  {...register("counterId")}
                  onChange={(event) => setSelectedCounter(event.target.value)}
                >
                  {counterList.map((counter) => {
                    return (
                      <option key={counter.id} value={counter.id}>
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
              <p
                className="text-[#0088FF] cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                Thêm ảnh
              </p>
              <input
                type="file"
                name="upfile"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <img
              src={productInfor.productImage}
              className="w-72 h-52 border-2 border-gray-300 rounded"
            />
            <div className="mt-4">
              <label>Danh mục</label> <br />
              <select
                name="subCategoryType"
                className="w-72 border rounded p-2"
                value={selectedImageType}
                {...register("subCategoryType")}
                onChange={(event) => setSelectedImageType(event.target.value)}
              >
                {imageType.map((type) => {
                  return (
                    <option
                      key={type.productCategoryId}
                      value={type.subCategoryType}
                    >
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
                  readOnly
                  defaultValue={formatter.format(productInfor.price)}
                />
              </div>
              <div>
                <label>Giá đá</label>
                <input
                  name="gemCost"
                  className="w-full border rounded p-2"
                  defaultValue={productInfor.gemCost}
                  {...register("gemCost")}
                />
              </div>
              <div>
                <label>Giá gia công</label>
                <input
                  name="productionCost"
                  className="w-full border rounded p-2"
                  defaultValue={productInfor.productionCost}
                  {...register("productionCost")}
                />
              </div>
              <div>
                <label>Giá nguyên liệu</label>
                <input
                  name="materialCost"
                  className="w-full border rounded p-2"
                  defaultValue={productInfor.materialCost}
                  {...register("materialCost")}
                />
              </div>
              <div>
                <label>Tỉ lệ áp giá (%)</label>
                <input
                  name="priceRate"
                  className="w-full border rounded p-2"
                  defaultValue={productInfor.priceRate}
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
                  name="gemId"
                  className="w-full border rounded p-2"
                  value={selectedDiamondId}
                  {...register("gemId")}
                  onChange={handleDiamondChange}
                >
                  <option>Chọn tên kim cương</option>
                  {diamondCriteria.map((diamond) => (
                    <option key={diamond.gemId} value={diamond.gemId}>
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
                  value={
                    selectedDiamond
                      ? selectedDiamond.origin
                      : selectedDiamondCriteria
                  }
                />
              </div>
              <div>
                <label>Giác cắt</label>
                <input
                  className="w-full border rounded p-2"
                  type="text"
                  value={
                    selectedDiamond
                      ? selectedDiamond.cut
                      : selectedDiamondCriteria
                  }
                />
              </div>
              <div>
                <label>Carat</label>
                <input
                  className="w-full border rounded p-2"
                  type="text"
                  value={
                    selectedDiamond
                      ? selectedDiamond.caratWeight
                      : selectedDiamondCriteria
                  }
                />
              </div>
              <div>
                <label>Độ tinh khiết</label>
                <input
                  className="w-full border rounded p-2"
                  type="text"
                  value={
                    selectedDiamond
                      ? selectedDiamond.clarity
                      : selectedDiamondCriteria
                  }
                />
              </div>
              <div>
                <label>Màu sắc</label>
                <input
                  className="w-full border rounded p-2"
                  type="text"
                  value={
                    selectedDiamond
                      ? selectedDiamond.color
                      : selectedDiamondCriteria
                  }
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
          </div>
        </form>
        <DeleteProduct
          ref={ProductDetailRef}
          handleHide={handleHide}
          deleteCode={ids}
        />
        <button
          onClick={handleClick}
          className="w-52 h-8 border rounded-md bg-red-500 text-white font-semibold ml-56"
        >
          Xóa
        </button>
      </div>
    </>
  );
};

export default ProductDetail;
