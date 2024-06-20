import { useEffect, useState } from "react";
import classes from "./TableProduct.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";

const TableProduct = () => {
  const [productList, setProductList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterProduct, setFilterProduct] = useState([...productList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);

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

  //------------------------Get list products--------------------
  useEffect(() => {
    const handleProduct = async () => {
      const response = await fetch(
        "http://mahika.foundation:8080/swp/api/product"
      );
      const data = await response.json();
      setProductList(data);
    };
    handleProduct();
  }, []);

  return (
    <div className="w-10/12 h-5/6 ">
      <div className="text-3xl font-medium py-10">
        <p>Danh sách sản phẩm</p>
      </div>
      <div className="bg-white border-2 rounded-xl">
        <div>
          <button
            className="h-[50px] w-[200px] border-none bg-white text-center text-[#a6abb2] font-montserrat text-[15px] 
            hover:border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer"
            status="All"
          >
            Tất cả
          </button>
        </div>
        <hr />
        <div className="mt-5 mb-7">
          <input
            className="h-37 w-560 rounded-2xl border-[#dfd8d8] outline-none pl-11"
            type="search"
            placeholder="Tìm kiếm sản phẩm"
            onChange={handleSearch}
          />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className={classes.tr}>
              <th className={`${classes["table-header"]} ${classes.th}`}>
                <input type="checkbox" name="allSelect" />
              </th>
              <th className={classes.th}>Mã sản phẩm</th>
              <th className={classes.th}>Tên sản phẩm</th>
              <th className={classes.th}>Loại sản phẩm</th>
              <th className={classes.th}>Quầy</th>
              <th className={classes.th}>Ngày khởi tạo</th>
            </tr>
          </thead>
          {currentProduct.map((product) => {
            return (
              <tbody>
                <tr className={classes.tr} key={product.productCode}>
                  <td className={classes.td}>
                    <input type="checkbox" name="allSelect" />
                  </td>
                  <td className={classes.td}>{product.productCode}</td>
                  <td className={classes.td}>{product.productName}</td>
                  <td className={classes.td}>{product.categoryName}</td>
                  <td className={classes.td}>{product.counterNo}</td>
                  <td className={classes.td}>
                    {new Date(product.createdDate).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <Pagination
          totalInvoice={productList.length}
          invoicePerPage={productPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TableProduct;
