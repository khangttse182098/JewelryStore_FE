import { useEffect, useRef, useState } from "react";
import classes from "./TableDiscount.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import AddDiscountModal from "../AddDiscountModal/AddDiscountModal";
import { useNavigate } from "react-router-dom";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import SkeletonRowList from "../../../UtilComponent/SkeletonRowList/SkeletonRowList";

const TableDiscount = () => {
  const addDiscountModalRef = useRef();
  const doneModelRef = useRef();
  const [isDisplay, setIsDisplay] = useState(null);
  const [searchField, setSearchField] = useState();
  const [discountList, setDiscountList] = useState([]);
  const [select, setSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDiscountList, setFilterDiscountList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const discountPerPage = 5;

  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    const newFilterDiscount = discountList.filter((discount) => {
      return (
        discount.code.toLowerCase().includes(searchField) ||
        discount.value.includes(searchField) ||
        discount.status.toLowerCase().includes(searchField) ||
        discount.startDate.includes(searchField) ||
        discount.endDate.includes(searchField)
      );
    });
    setFilterDiscountList(newFilterDiscount);
  }, [searchField]);

  const lastDiscountIndex = currentPage * discountPerPage;
  const firstDiscountIndex = lastDiscountIndex - discountPerPage;
  const currentDiscount = filterDiscountList.slice(
    firstDiscountIndex,
    lastDiscountIndex
  );

  const handleDiscount = async () => {
    const response = await fetch(
      "http://mahika.foundation:8080/swp/api/discount"
    );
    const data = await response.json();
    setDiscountList(data);
    setSelectedFilter("Tất cả");
    setFilterDiscountList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleDiscount();
  }, []);

  const handleClick = (discount) => {
    navigate("/manager/discount/detail", { state: { discount } });
  };

  const handleFilter = (filterStatus) => {
    setSelectedFilter(filterStatus);
    if (filterStatus === "Tất cả") {
      setFilterDiscountList(discountList);
    } else {
      setFilterDiscountList(
        discountList.filter((discount) => discount.status === filterStatus)
      );
    }
  };

  const handleAdd = () => {
    addDiscountModalRef.current.showModal();
  };

  const handleHide = () => {
    handleDiscount();
    addDiscountModalRef.current.close();
  };

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      setSelect(checked);
      const tempDiscount = discountList.map((discount) => ({
        ...discount,
        isChecked: checked,
      }));
      setDiscountList(tempDiscount);
      setFilterDiscountList(tempDiscount);
      setIsDisplay(checked);
    } else {
      const tempDiscount = discountList.map((discount) =>
        discount.code === name ? { ...discount, isChecked: checked } : discount
      );
      setDiscountList(tempDiscount);
      setFilterDiscountList(tempDiscount);
      setIsDisplay(tempDiscount.some((discount) => discount.isChecked));
    }
  };

  async function handleDeleteAll() {
    let idString = "";
    discountList.map((discount) => {
      idString = idString.concat(discount.id + ", ");
    });
    idString = idString.trim();
    idString = idString.slice(0, idString.length - 1);
    try {
      console.log(idString);
      const res = await fetch(
        `http://mahika.foundation:8080/swp/api/discount/delete-${idString}`,
        { method: "DELETE" }
      );
      handleOpen();
      handleDiscount();
    } catch (error) {}
  }

  let skeletonRowList = [];
  for (let index = 0; index < discountPerPage; index++) {
    skeletonRowList.push(
      <tr key={index}>
        <td colSpan="6">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  function handleOpen() {
    doneModelRef.current.showModal();
  }

  function handleClose() {
    doneModelRef.current.close();
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <DoneModal ref={doneModelRef} handleClose={handleClose} />
      <AddDiscountModal ref={addDiscountModalRef} onClose={handleHide} />
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-7 flex justify-between">
          <p>Danh sách mã khuyến mãi</p>
          <button
            onClick={handleAdd}
            className="h-15 w-40 rounded bg-blue-600 hover:bg-blue-700 text-slate-100 text-xl"
          >
            + Thêm mã
          </button>
        </div>

        <div className="bg-white border-2 rounded-xl drop-shadow-xl">
          <div>
            {["Tất cả", "Đang áp dụng", "Chưa áp dụng", "Ngừng áp dụng"].map(
              (status) => (
                <button
                  key={status}
                  className={`${classes.button} ${
                    status === selectedFilter ? classes.selectedFilter : ""
                  }`}
                  onClick={() => handleFilter(status)}
                  name={status}
                >
                  {status}
                </button>
              )
            )}
          </div>
          <hr />
          <div className="mt-5 mb-7">
            <input
              className="h-9 w-96 rounded-lg border-2 border-gray-300 outline-none pl-4 ml-14"
              type="search"
              placeholder="Tìm kiếm khuyến mãi"
              onChange={handleSearch}
            />
          </div>
          <table className="group w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>
                  <input
                    type="checkbox"
                    name="allSelect"
                    onChange={handleCheckbox}
                    checked={select}
                  />
                </th>

                {select ? (
                  <th colSpan="6" className={classes.th}>
                    <div className="flex">
                      <p className="font-normal pr-2">
                        Đã chọn <b>tất cả</b> mã khuyến mãi trên trang này
                      </p>
                      <select
                        onChange={handleClick}
                        defaultValue=""
                        className="border-2 rounded-md border-[#0088FF] text-[#0088FF] outline-none"
                      >
                        <option value="" disabled>
                          Chọn thao tác
                        </option>
                        <option onClick={handleDeleteAll}>
                          Xóa mã khuyến mãi
                        </option>
                      </select>
                    </div>
                  </th>
                ) : (
                  <>
                    <th className={classes.th}>Mã khuyến mãi</th>
                    <th className={classes.th}>Phần trăm</th>
                    <th className={classes.th}>Trạng thái</th>
                    <th className={classes.th}>Ngày bắt đầu</th>
                    <th className={classes.th}>Ngày kết thúc</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                skeletonRowList
              ) : !currentDiscount.length ? (
                <tr>
                  <td
                    colSpan="6"
                    className="font-medium text-red-500 text-center h-32"
                  >
                    Không tìm thấy kết quả cho "{searchField}"
                  </td>
                </tr>
              ) : (
                currentDiscount.map((discount) => {
                  const statusClass =
                    discount.status === "Chưa áp dụng"
                      ? classes["status-inProgress"]
                      : discount.status === "Đang áp dụng"
                      ? classes["status-success"]
                      : classes["status-closed"];

                  return (
                    <tr
                      className={`${classes.tr} ${
                        select && classes.selectedTr
                      }`}
                      key={discount.code}
                      onClick={() => handleClick(discount)}
                    >
                      <td className={classes.td}>
                        {isDisplay && (
                          <input
                            type="checkbox"
                            name={discount.code}
                            onChange={(event) => {
                              handleCheckbox(event);
                            }}
                            onClick={(event) => event.stopPropagation()}
                            checked={discount.isChecked || false}
                          />
                        )}
                      </td>
                      <td className={classes.td}>{discount.code}</td>
                      <td className={classes.td}>{`${discount.value}%`}</td>
                      <td className={classes.td}>
                        <p className={`${statusClass} ${classes.status}`}>
                          {discount.status}
                        </p>
                      </td>
                      <td className={classes.td}>{discount.startDate}</td>
                      <td className={classes.td}>{discount.endDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Pagination
            totalInvoice={filterDiscountList.length}
            invoicePerPage={discountPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableDiscount;
