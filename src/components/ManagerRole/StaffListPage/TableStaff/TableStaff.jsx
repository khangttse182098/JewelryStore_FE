import { useEffect, useState } from "react";
import classes from "./TableStaff.module.css";

const TableStaff = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const handleProduct = async () => {
      const response = await fetch(
        "http://mahika.foundation:8080/swp/api/user"
      );
      const data = await response.json();
      setStaffList(data);
    };
    handleProduct();
  }, []);

  return (
    <div className="w-10/12 h-5/6 mx-auto">
      <div className="text-3xl font-medium py-10">
        <p>Danh sách nhân viên</p>
      </div>
      <div className="bg-white border-2 rounded-xl">
        <div>
          {["Tất cả"].map((status) => (
            <button
              key={status}
              className="h-12 w-48 border-2 bg-white text-center text-gray-500 font-montserrat text-base hover:border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer"
              status="All"
            >
              {status}
            </button>
          ))}
        </div>
        <hr />
        <div className="mt-5 mb-7">
          <input
            className="h-37 w-583 rounded-10 border-double border-[#dfd8d8] outline-none pl-11"
            type="search"
            placeholder="Tìm kiếm nhân viên"
          />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className={classes.tr}>
              <th className={classes.th}>
                <input type="checkbox" name="allSelect" />
              </th>
              <th className={classes.th}>Tên nhân viên</th>
              <th className={classes.th}>Vị trí</th>
              <th className={classes.th}>Số điện thoại</th>
              <th className={classes.th}>Doanh thu cá nhân</th>
              <th className={classes.th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => {
              const statusClass =
                staff.status === "Đang tạm nghỉ"
                  ? classes["status-inProgress"]
                  : staff.status === "Đang làm việc"
                  ? classes["status-success"]
                  : classes["status-closed"];

              return (
                <tr className={classes.tr} key={staff.fullName}>
                  <td className={classes.td}>
                    <input type="checkbox" name="allSelect" />
                  </td>
                  <td className={classes.td}>{staff.fullName}</td>
                  <td className={classes.td}>{staff.role}</td>
                  <td className={classes.td}>{staff.phone}</td>
                  <td className={classes.td}>{staff.personalIncome}</td>
                  <td className={classes.td}>
                    <p className={`${statusClass} ${classes.status}`}>
                      {staff.status}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TableStaff;
