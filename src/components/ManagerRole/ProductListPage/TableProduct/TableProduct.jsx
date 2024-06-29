import { useEffect, useRef, useState } from "react";
import classes from "./TableProduct.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import ImageLoader from "../../../../util/ImageLoader";
import Red from "/assets/red.png";
import Green from "/assets/green.png";
import SkeletonRowList from "../../../UtilComponent/SkeletonRowList/SkeletonRowList";
import { SkeletonTheme } from "react-loading-skeleton";

const TableProduct = () => {
  const controllerRef = useRef();
  const [productList, setProductList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterProduct, setFilterProduct] = useState([...productList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);
  const [select, setSelect] = useState(false);
  const ids = [];
  const navigate = useNavigate();
  const deleteCode = productList.map((product) => ids.push(product.id));

  //-------------------------handleDelete--------------------
  const handleDelete = () => {
    fetch("http://mahika.foundation:8080/swp/api/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteCode),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  //------------------------Get list products--------------------
  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const handleProduct = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/product",
          { signal }
        );
        const data = await response.json();
        setProductList(data);
      } catch (err) {}
    };
    handleProduct();
  }, []);

  //-----------------------------HandleNavigate---------------------
  function handleNavigate(list) {
    navigate("/managerproductdetail", { state: { list } });
  }

  function handleAdd() {
    navigate("/manageraddproduct");
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

  //------------------------Check box----------------------------
  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      setSelect(checked);
      const tempProduct = productList.map((product) => {
        return { ...product, isChecked: checked };
      });
      setProductList(tempProduct);
    } else {
      const tempProduct = productList.map((product) => {
        return product.productCode === name
          ? { ...product, isChecked: checked }
          : product;
      });
      setProductList(tempProduct);
    }
  };

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <div className="w-10/12 h-5/6 ">
        <div className="text-3xl font-medium py-5">
          <p>Danh sách sản phẩm</p>
        </div>
        <div className="bg-white border-2 rounded-xl">
          <div>
            <button
              onChange={handleAdd}
              className="h-[50px] w-[200px] border-b-4 border-[#0088FF] text-center text-[#0088FF] font-montserrat text-[15px] cursor-pointer"
            >
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
            <Link to="/manageraddproduct">
              <button className="w-32 h-9 rounded-md bg-[#0088FF] text-white">
                + Thêm mới
              </button>
            </Link>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className={classes.tr} onChange={handleCheckbox}>
                <th className={`${classes["table-header"]} ${classes.th}`}>
                  <input
                    type="checkbox"
                    name="allSelect"
                    onChange={handleCheckbox}
                    checked={select}
                  />
                </th>
                {select && (
                  <>
                    <th colSpan="6" className={classes.th}>
                      <div className="flex">
                        <p className="font-normal pr-2">
                          Đã chọn <b>tất cả</b> sản phẩm trên trang này
                        </p>
                        <select
                          onClick={handleDelete}
                          defaultValue=""
                          className="border-2 rounded-md border-[#0088FF] text-[#0088FF] outline-none"
                        >
                          <option value="" disabled>
                            Chọn thao tác
                          </option>
                          <option onClick={handleDelete}>Xóa sản phẩm</option>
                        </select>
                      </div>
                    </th>
                  </>
                )}
                {!select && (
                  <>
                    <th className={classes.th}>Hình ảnh</th>
                    <th className={classes.th}>Mã sản phẩm</th>
                    <th className={classes.th}>Tên sản phẩm</th>
                    <th className={classes.th}>Loại sản phẩm</th>
                    <th className={classes.th}>Quầy</th>
                    <th className={classes.th}>Ngày khởi tạo</th>
                    <th className={classes.th}> </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {!currentProduct.length ? (
                <SkeletonRowList
                  amount={4}
                  style="border-b-[#dddddd] h-20 font-[400] text-center border-b-0"
                  col={8}
                />
              ) : (
                currentProduct.map((product) => {
                  return (
                    <tr
                      className={`${classes.tr} ${
                        product?.isChecked ? classes.select : ""
                      }`}
                      key={product.productCode}
                      onClick={() => handleNavigate(product)}
                    >
                      <td className={classes.td}>
                        <input
                          type="checkbox"
                          name={product.productCode}
                          onChange={handleCheckbox}
                          checked={product?.isChecked || false}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </td>
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
