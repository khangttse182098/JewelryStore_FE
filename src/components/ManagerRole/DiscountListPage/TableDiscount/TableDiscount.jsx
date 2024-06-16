import { useEffect, useState } from "react";
import classes from "./TableDiscount.module.css";

const TableDiscount = () => {
  const [discountList, setDiscountList] = useState([]);

  useEffect(() => {
    const handleDiscount = async () => {
      const response = await fetch(
        "http://mahika.foundation:8080/swp/api/discount"
      );
      const data = await response.json();
      setDiscountList(data);
    };

    handleDiscount();
  }, []);

  return (
    <div className="w-10/12 h-5/6 mx-auto">
      <div className="text-3xl font-medium py-10">
        <p>Danh sách mã khuyến mãi</p>
      </div>
      <div className="bg-white border-2 rounded-xl">
        <div>
          {["Tất cả", "Đang áp dụng", "Chưa áp dụng", "Ngừng áp dụng"].map(
            (status) => (
              <button
                key={status}
                className="h-12 w-48 border-none bg-white text-center text-gray-500 font-montserrat text-base hover:border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer"
                status="All"
              >
                {status}
              </button>
            )
          )}
        </div>
        <hr />
        <div className="mt-5 mb-7">
          <input
            className="h-37 w-583 rounded-10 border-double border-[#dfd8d8] outline-none pl-11"
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
              <th className={classes.th}>Trạng thái</th>
              <th className={classes.th}>Ngày bắt đầu</th>
              <th className={classes.th}>Ngày kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {discountList.map((discount) => {
              const statusClass =
                discount.status === "Chưa áp dụng"
                  ? classes["status-inProgress"]
                  : discount.status === "Đang áp dụng"
                  ? classes["status-success"]
                  : classes["status-closed"];

              return (
                <tr className={classes.tr} key={discount.code}>
                  <td className={classes.td}>
                    <input type="checkbox" name="allSelect" />
                  </td>
                  <td className={classes.td}>{discount.code}</td>
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
      </div>
    </div>
  );
};

export default TableDiscount;
