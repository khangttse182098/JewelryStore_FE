import { useEffect, useState } from "react";
import classes from "./TableProduct.module.css";

const TableProduct = () => {
  const [productList, setProductList] = useState([]);

  const handleProduct = () => {
    fetch("http://mahika.foundation:8080/swp/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
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
        <div className={classes["search-container"]}>
          <input
            className={classes.search}
            type="search"
            placeholder="Tìm kiếm theo số điện thoại"
          />
        </div>
        <table className={classes.table}>
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
          {productList.map((product) => {
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
      </div>
    </div>
  );
};

export default TableProduct;
