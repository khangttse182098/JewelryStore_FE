import { useEffect, useState } from "react";
import classes from "./TableStaff.module.css";
import { formatter } from "../../../../util/formatter";
import PaginationStaffList from "./../PaginationStaffList/PaginationStaffList";

const TableStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [filterStaff, setFilterStaff] = useState([...staffList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage, setStaffPerPage] = useState(5);
  const lastStaffIndex = currentPage * staffPerPage;
  const firstStaffIndex = lastStaffIndex - staffPerPage;
  const currentStaff = filterStaff.slice(firstStaffIndex, lastStaffIndex);
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

  const [currentStatus, setCurrentStatus] = useState("Tất cả");
  const handleStatusOption = (event) => {
    const status = event.target.getAttribute("status");
    setCurrentStatus(status);
    if (status === "Tất cả") {
      setFilterStaff([...staffList]);
    } else {
      const statusStaff = staffList.filter((staff) => staff.status === status);
      setFilterStaff(statusStaff);
    }
  };
  return (
    <div className="w-10/12 h-5/6 mx-auto">
      <div className="text-3xl font-medium py-10">
        <p>Danh sách nhân viên</p>
      </div>

      <div className="bg-white border-2 border-white rounded-xl shadow-lg">
        <div>
          <button
            className={`${"h-12 w-48 rounded-t-lg border-white border-b-2  bg-white text-center text-gray-500 font-montserrat text-base hover:border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer"}
              ${currentStaff === "Tất cả" ? classes.current : ""}`}
            status="Tất cả"
            onClick={handleStatusOption}
          >
            Tất cả
          </button>

          {["Đang làm việc"].map((status) => (
            <button
              key={status}
              className="h-12 w-48 rounded-t-lg border-white border-b-2  bg-white text-center text-gray-500 font-montserrat text-base hover:border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer"
              status="Đang làm việc"
              onClick={handleStatusOption}
            >
              {status}
            </button>
          ))}
          {["Đang tạm nghỉ"].map((status) => (
            <button
              key={status}
              className="h-12 w-48 rounded-t-lg border-white border-b-2  bg-white text-center text-gray-500 font-montserrat text-base hover:border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer"
              status="Đang tạm nghỉ"
              onClick={handleStatusOption}
            >
              {status}
            </button>
          ))}
        </div>

        <hr />
        <div className="mt-5 mb-7 ">
          <input
            className="h-37 w-583 rounded-10 border-double border-[#dfd8d8] outline-none pl-11"
            type="search"
            placeholder="Tìm kiếm nhân viên"
          />
          <button className="w-40 h-10 bg-blue-600 rounded-md text-white ml-10 hover:bg-blue-900 text-xl">
            + Thêm mới
          </button>
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
            {currentStaff.map((staff) => {
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
                  <td className={classes.td}>
                    {formatter.format(staff.personalIncome)}
                  </td>
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
        <PaginationStaffList
          totalStaff={filterStaff.length}
          staffPerPage={staffPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
export default TableStaff;
