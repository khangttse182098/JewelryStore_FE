import { useEffect, useRef, useState } from "react";
import classes from "./TableDiscount.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import AddDiscountModal from "../AddDiscountModal/AddDiscountModal";
import { useNavigate } from "react-router-dom";

const TableDiscount = () => {
  const addDiscountModalRef = useRef();
  const [discountList, setDiscountList] = useState([]);
  const [filterDiscountList, setFilterDiscountList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const discountPerPage = 4;

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
  };
  useEffect(() => {
    handleDiscount();
  }, []);

  const handleClick = (discount) => {
    navigate("/managerdiscountdetail", { state: { discount } });
  };

  function handleFilter(filterStatus) {
    setSelectedFilter(filterStatus);
    if (filterStatus === "Tất cả") {
      setFilterDiscountList(discountList);
    } else {
      setFilterDiscountList(
        discountList.filter((discount) => {
          return discount.status === filterStatus;
        })
      );
    }
  }

  function handleAdd() {
    addDiscountModalRef.current.showModal();
  }

  function handleHide() {
    handleDiscount();
    addDiscountModalRef.current.close();
  }

  let skeletonRowList = [];
  for (let index = 0; index < discountPerPage; index++) {
    skeletonRowList.push(
      <tr>
        <td colSpan="6">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <AddDiscountModal ref={addDiscountModalRef} onClose={handleHide} />
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-10 flex justify-between">
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
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>
                  <input type="checkbox" name="allSelect" />
                </th>
                <th className={classes.th}>Mã khuyễn mãi</th>
                <th className={classes.th}>Phần trăm</th>
                <th className={classes.th}>Trạng thái</th>
                <th className={classes.th}>Ngày bắt đầu</th>
                <th className={classes.th}>Ngày kết thúc</th>
              </tr>
            </thead>
            <tbody>
              {!currentDiscount.length
                ? skeletonRowList
                : currentDiscount.map((discount) => {
                    const statusClass =
                      discount.status === "Chưa áp dụng"
                        ? classes["status-inProgress"]
                        : discount.status === "Đang áp dụng"
                        ? classes["status-success"]
                        : classes["status-closed"];

                    return (
                      <tr
                        className={classes.tr}
                        key={discount.code}
                        onClick={() => handleClick(discount)}
                      >
                        <td className={classes.td}>
                          <input type="checkbox" name="allSelect" />
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
                  })}
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
