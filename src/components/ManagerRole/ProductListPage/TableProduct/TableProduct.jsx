import { useEffect, useRef, useState } from "react";
import classes from "./TableProduct.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import ImageLoader from "../../../../util/ImageLoader";
import Red from "/assets/red.png";
import Green from "/assets/green.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ErrorModal from "../../../UtilComponent/ErrorModal/ErrorModal";

const TableProduct = () => {
  const errorModalRef = useRef();
  const controllerRef = useRef();
  const [isDisplay, setIsDisplay] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [productList, setProductList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterProduct, setFilterProduct] = useState([...productList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [select, setSelect] = useState(false);
  const ids = [];
  const navigate = useNavigate();
  const deleteCode = productList.map((product) => ids.push(product.id));

  function handleOpenErrorModal() {
    errorModalRef.current.showModal();
  }

  function handleCLoseErrorModal() {
    errorModalRef.current.close();
  }
  //-------------------------handleDelete--------------------
  const handleDelete = async () => {
    try {
      const res = await fetch("http://mahika.foundation:8080/swp/api/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteCode),
      });
      const obj = await res.json();
      console.log(obj);
      handleOpenErrorModal();
    } catch (error) {
      console.log(error.message);
    }
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
        setIsLoading(false);
      } catch (err) {}
    };
    handleProduct();
  }, []);

  //-----------------------------HandleNavigate---------------------
  function handleNavigate(list) {
    navigate("/manager/product/detail", { state: { list } });
  }

  function handleAdd() {
    navigate("/manager/product/add");
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
        product.categoryName.toLowerCase().includes(searchField) ||
        product.counterNo.toLowerCase().includes(searchField) ||
        product.createdDate.toLowerCase().includes(searchField)
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
      setIsDisplay(checked);
    } else {
      const tempProduct = productList.map((product) => {
        return product.productCode === name
          ? { ...product, isChecked: checked }
          : product;
      });
      setProductList(tempProduct);
      setIsDisplay(tempProduct.some((product) => product.isChecked));
    }
  };

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
      <ErrorModal
        ref={errorModalRef}
        handleClose={handleCLoseErrorModal}
        msg={"Không xóa được sản phẩm trong hóa đơn"}
      />
      <div className="w-10/12 h-5/6 ">
        <div className="text-3xl font-medium py-7">
          <p>Danh sách sản phẩm</p>
        </div>
        <div className="bg-white border-2 rounded-xl">
          <div>
            <button
              onChange={handleAdd}
              className="h-[50px] w-[200px] border-b-4 border-b-[#2661ec]  text-center text-[#2661ec] font-semibold font-montserrat  cursor-pointer"
            >
              Tất cả
            </button>
          </div>
          <hr />
          <div className="my-5">
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
                    <th colSpan="7" className={classes.th}>
                      <div className="flex">
                        <p className="font-normal pr-2">
                          Đã chọn <b>tất cả</b> sản phẩm trên trang này
                        </p>
                        <select
                          defaultValue=""
                          className="cursor-pointer border-2 rounded-md border-[#0088FF] text-[#0088FF] outline-none"
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
                      className={`${classes.tr} ${
                        product?.isChecked ? classes.select : ""
                      }`}
                      key={product.productCode}
                      onClick={() => handleNavigate(product)}
                    >
                      <td className={classes.td}>
                        {isDisplay && (
                          <input
                            type="checkbox"
                            name={product.productCode}
                            onChange={handleCheckbox}
                            checked={product?.isChecked || false}
                            onClick={(event) => event.stopPropagation()}
                          />
                        )}
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
