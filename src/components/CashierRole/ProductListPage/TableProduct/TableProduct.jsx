import { useEffect, useRef, useState } from "react";
import classes from "./TableProduct.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import ImageLoader from "../../../../util/ImageLoader";
import Red from "/assets/red.png";
import Green from "/assets/green.png";
import SkeletonRowList from "../../../UtilComponent/SkeletonRowList/SkeletonRowList";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableProduct = () => {
  const controllerRef = useRef();
  const [productList, setProductList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterProduct, setFilterProduct] = useState([...productList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //------------------------Get list products--------------------
  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const handleProduct = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/product",
          {
            signal,
          }
        );
        const data = await response.json();
        setProductList(data);
        setIsLoading(false);
      } catch (err) {}
    };
    handleProduct();
  }, []);

  //-----------------------------HandleNavigate---------------------
  function handleNavigate(product) {
    navigate("/cashier/product/detail", { state: { product } });
  }

  //----------------------------Pagination---------------------------
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProduct = filterProduct.slice(
    firstProductIndex,
    lastProductIndex
  );

  //----------------------------Search-------------------------------
  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    const newFilterProduct = productList.filter((product) => {
      return (
        product.productCode.toLowerCase().includes(searchField) ||
        product.productName.toLowerCase().includes(searchField) ||
        product.categoryName.toLowerCase().includes(searchField)
      );
    });
    setFilterProduct(newFilterProduct);
  }, [searchField, productList]);

  let skeletonRowList = [];
  for (let index = 0; index < productPerPage; index++) {
    skeletonRowList.push(
      <tr key={index}>
        <td colSpan="7">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <div className="w-10/12 h-5/6 ">
        <div className="text-3xl font-medium py-5">
          <p>Danh sách sản phẩm</p>
        </div>
        <div className="bg-white border-2 rounded-xl">
          <div>
            <button className="h-[50px] w-[200px] border-b-4 border-[#0088FF] text-center text-[#0088FF] font-montserrat text-[15px] cursor-pointer">
              Tất cả
            </button>
          </div>
          <hr />
          <div className="mt-3 mb-3">
            <input
              className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11 ml-14 mr-4"
              type="search"
              placeholder="Tìm kiếm sản phẩm"
              onChange={handleSearch}
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>Hình ảnh</th>
                <th className={classes.th}>Mã sản phẩm</th>
                <th className={classes.th}>Tên sản phẩm</th>
                <th className={classes.th}>Loại sản phẩm</th>
                <th className={classes.th}>Quầy</th>
                <th className={classes.th}>Ngày khởi tạo</th>
                <th className={classes.th}> </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                skeletonRowList
              ) : !currentProduct.length ? (
                <tr>
                  <td
                    colSpan="8"
                    className="font-medium text-red-500 text-center h-32"
                  >
                    Không tìm thấy kết quả cho "{searchField}"
                  </td>
                </tr>
              ) : (
                currentProduct.map((product) => {
                  return (
                    <tr
                      className={classes.tr}
                      key={product.productCode}
                      onClick={() => handleNavigate(product)}
                    >
                      <td className={classes.td}>
                        <ImageLoader
                          URL={product.productImage}
                          imgStyle="w-28 h-20"
                          skeletonStyle="w-28 h-20"
                          alt="Jewelry"
                        />
                      </td>
                      <td className={classes.td}>{product.productCode}</td>
                      <td className={classes.td}>{product.productName}</td>
                      <td className={classes.td}>{product.categoryName}</td>
                      <td className={classes.td}>{product.counterNo}</td>
                      <td className={classes.td}>{product.createdDate}</td>
                      <td className={classes.td}>
                        {product.isSold === 1 ? (
                          <img src={Red} alt="Sold" />
                        ) : (
                          <img src={Green} alt="Not Sold" />
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Pagination
            totalInvoice={productList.length}
            invoicePerPage={productPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableProduct;
