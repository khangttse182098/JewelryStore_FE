import { useEffect, useRef, useState } from "react";

const AddProduct = () => {
  const [counterList, setCounterList] = useState([]);
  const [goldList, setGoldList] = useState([]);
  const [imageType, setImageType] = useState([]);
  const [diamondCriteria, setDiamondCriteria] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const counterControllerRef = useRef();
  const goldControllerRef = useRef();
  const diamondControllerRef = useRef();
  const imageControllerRef = useRef();

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
    <form className="grid grid-cols-2 gap-2 p-4">
      {/* Section Product */}
      <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
        <h2 className="font-semibold text-xl">Chi tiết sản phẩm</h2>
        <hr className="w-full my-2" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Mã sản phẩm</label>
            <input className="w-full border rounded p-2" type="text" />
          </div>
          <div>
            <label>Loại vàng</label>
            <select className="w-full border rounded p-2">
              <option>Chọn loại vàng</option>
              {goldList.map((type) => {
                return <option key={type.id}>{type.name}</option>;
              })}
            </select>
          </div>
          <div>
            <label>Tên sản phẩm</label>
            <input className="w-full border rounded p-2" type="text" />
          </div>
          <div>
            <label>Khối lượng vàng</label>
            <input className="w-full border rounded p-2" type="text" />
          </div>
          <div>
            <label>Loại sản phẩm</label>
            <input className="w-full border rounded p-2" type="text" />
          </div>
          <div>
            <label>Quầy số</label>
            <select className="w-full border rounded p-2">
              <option>Chọn quầy</option>
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
          <p className="text-[#0088FF] cursor-pointer">Thêm ảnh</p>
        </div>
        <div className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded">
          <input className="mt-4 cursor-pointer" type="file" />
        </div>
        <div className="mt-4">
          <label>Danh mục</label> <br />
          <select className="w-72 border rounded p-2">
            <option>Chọn danh mục</option>
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
            <input className="w-full border rounded p-2" type="text" />
          </div>
          <div>
            <label>Giá gia công</label>
            <input className="w-full border rounded p-2" type="text" />
          </div>
          <div>
            <label>Giá nguyên liệu</label>
            <input className="w-full border rounded p-2" type="text" />
          </div>
          <div>
            <label>Tỉ lệ áp giá</label>
            <input className="w-full border rounded p-2" type="text" />
          </div>
        </div>
        <button className="w-1/3 h-8 border rounded-md bg-[#0088FF] text-white font-semibold mx-44 my-5">
          Lưu
        </button>
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
              onChange={handleDiamondSelect}
            >
              <option>Chọn tên kim cương</option>
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
    </form>
  );
};

export default AddProduct;
