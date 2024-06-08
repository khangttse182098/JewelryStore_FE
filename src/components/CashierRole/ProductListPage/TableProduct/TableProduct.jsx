import { useState } from "react";
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
      .then((data) => setProductList(data))
      .catch((err) => console.log(err));
  };

  //----------------------------Pagination-------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);

  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProduct = productList.slice(firstProductIndex, lastProductIndex);
  //----------------------------------------------------------------

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>Danh sách sản phẩm</p>
      </div>
      <div className={classes["table-container"]}>
        <div>
          <button className={classes.button}>Tất cả</button>
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
            <th className={classes.th}>Ảnh sản phẩm</th>
            <th className={classes.th}>Mã sản phẩm</th>
            <th className={classes.th}>Tên sản phẩm</th>
            <th className={classes.th}>Loại sản phẩm</th>
            <th className={classes.th}>Quầy</th>
            <th className={classes.th}>Ngày khởi tạo</th>
          </tr>
          {productList.map((list) => {
            return (
              <tr className={classes.tr} key={list.id}>
                <td className={classes.td}>{list.fullName}</td>
                <td className={classes.td}>{list.productCode}</td>
                <td className={classes.td}>{list.address}</td>
                <td className={classes.td}>{list.quantityOrder}</td>
                <td className={classes.td}>{list.expense}</td>
              </tr>
            );
          })}
        </table>
        {/* <Pagination
          totalInvoice={customerList.length}
          invoicePerPage={customerPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        /> */}
      </div>
    </div>
  );
};

export default TableProduct;
