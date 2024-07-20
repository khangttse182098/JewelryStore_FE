import { useEffect, useRef, useState } from "react";
import { formatter } from "../../../../util/formatter";

const ProductDetail = ({ product }) => {
  console.log(product);
  const diamondControllerRef = useRef();
  const [diamondCriteria, setDiamondCriteria] = useState([]);
  const [currentDiamond, setCurrentDiamond] = useState(null);
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
    const diamond = diamondCriteria.find(
      (diamond) => diamond.gemName === product.gemName
    );
    setCurrentDiamond(diamond);
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-2 p-4">
        {/* Section Product */}
        <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
          <h2 className="font-semibold text-xl">Chi tiết sản phẩm</h2>
          <hr className="w-full my-2" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Mã sản phẩm</label>
              <input
                className="w-full border rounded p-2"
                value={product.productCode}
                readOnly
              />
            </div>
            {product.materialName === null ? (
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
                <input
                  value={product.materialName}
                  className="w-full border rounded p-2"
                  readOnly
                />
              </div>
            )}
            <div>
              <label>Tên sản phẩm</label>
              <input
                className="w-full border rounded p-2"
                value={product.productName}
                readOnly
              />
            </div>
            {product.materialWeight === null ? (
              <div>
                <label>Khối lượng vàng</label>
                <input className="w-full border rounded p-2" value="Không có" />
              </div>
            ) : (
              <div>
                <label>Khối lượng vàng</label>
                <input
                  className="w-full border rounded p-2"
                  value={product.materialWeight}
                  readOnly
                />
              </div>
            )}
            <div>
              <label>Loại sản phẩm</label>
              <input
                className="w-full border rounded p-2"
                value={product.categoryName}
                readOnly
              />
            </div>
            <div>
              <label>Quầy số</label>
              <input
                className="w-full border rounded p-2"
                value={product.counterNo}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Section Image  */}
        <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Ảnh sản phẩm</h2>
          </div>
          <img
            src={product.productImage}
            className="w-72 h-52 border-2 border-gray-300 rounded"
          />
          <div className="mt-4">
            <label>Danh mục</label> <br />
            <input
              className="w-72 border rounded p-2"
              value={product.subCategoryType}
              readOnly
            />
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
                value={formatter.format(product.price)}
              />
            </div>
            <div>
              <label>Giá đá</label>
              <input
                className="w-full border rounded p-2"
                value={product.gemCost}
                readOnly
              />
            </div>
            <div>
              <label>Giá gia công</label>
              <input
                className="w-full border rounded p-2"
                value={product.productionCost}
                readOnly
              />
            </div>
            <div>
              <label>Giá nguyên liệu</label>
              <input
                className="w-full border rounded p-2"
                value={product.materialCost}
                readOnly
              />
            </div>
            <div>
              <label>Tỉ lệ áp giá (%)</label>
              <input
                className="w-full border rounded p-2"
                value={product.priceRate}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Section Diamond */}
        {product.gemName === null ? (
          <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
            <h2 className="font-semibold text-xl">Thông tin kim cương</h2>
            <hr className="w-full my-2" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Tên kim cương</label>
                <input
                  className="w-full border rounded p-2"
                  value="Không có"
                  readOnly
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
            <h2 className="font-semibold text-xl">Thông tin kim cương</h2>
            <hr className="w-full my-2" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Tên kim cương</label>
                <input
                  className="w-full border rounded p-2"
                  value={product.gemName}
                  readOnly
                />
              </div>
              <div>
                <label>Nguồn gốc</label>
                <input
                  className="w-full border rounded p-2"
                  value={currentDiamond?.origin}
                  readOnly
                />
              </div>
              <div>
                <label>Giác cắt</label>
                <input
                  className="w-full border rounded p-2"
                  value={currentDiamond?.cut}
                  readOnly
                />
              </div>
              <div>
                <label>Carat</label>
                <input
                  className="w-full border rounded p-2"
                  value={currentDiamond?.caratWeight}
                  readOnly
                />
              </div>
              <div>
                <label>Độ tinh khiết</label>
                <input
                  className="w-full border rounded p-2"
                  value={currentDiamond?.clarity}
                  readOnly
                />
              </div>
              <div>
                <label>Màu sắc</label>
                <input
                  className="w-full border rounded p-2"
                  value={currentDiamond?.color}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
