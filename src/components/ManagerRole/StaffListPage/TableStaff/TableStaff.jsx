import { useEffect, useState, useRef, Fragment } from "react";
import classes from "./TableStaff.module.css";
import { formatter } from "../../../../util/formatter";
import PaginationStaffList from "./../PaginationStaffList/PaginationStaffList";
import AddStaffModal from "../AddStaffModal/AddStaffModal";
import { Link, useNavigate } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import SkeletonRowList from "../../../UtilComponent/SkeletonRowList/SkeletonRowList";

const TableStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [filterStaff, setFilterStaff] = useState([...staffList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage, setStaffPerPage] = useState(5);
  const lastStaffIndex = currentPage * staffPerPage;
  const firstStaffIndex = lastStaffIndex - staffPerPage;
  const currentStaff = filterStaff.slice(firstStaffIndex, lastStaffIndex);
  const [showModal, setShowModal] = useState(false);
  const staffInputFormRef = useRef();
  const [select, setSelect] = useState(false);
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Tất cả");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const handleStaff = async () => {
      const response = await fetch(
        "http://mahika.foundation:8080/swp/api/user"
      );
      const data = await response.json();
      setStaffList(data);
      setFilterStaff(data);
    };
    handleStaff();
  }, []);

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

  const handleDelete = async () => {
    const deletePromises = selectedIds.map((id) =>
      fetch(`http://mahika.foundation:8080/swp/api/user/delete-${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    await Promise.all(deletePromises);
    setStaffList((prevList) =>
      prevList.filter((staff) => !selectedIds.includes(staff.id))
    );
    setFilterStaff((prevList) =>
      prevList.filter((staff) => !selectedIds.includes(staff.id))
    );
    setSelectedIds([]);
    setSelect(false);
  };

  function handleClick() {
    staffInputFormRef.current.showModal();
  }

  function handleHide() {
    staffInputFormRef.current.close();
  }

  function handleNavigate(staff) {
    navigate("/managerstaffdetail", { state: { staff } });
  }

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      setSelect(checked);
      setSelectedIds(checked ? filterStaff.map((staff) => staff.id) : []);
    } else {
      setSelectedIds((prevSelectedIds) =>
        checked
          ? [...prevSelectedIds, name]
          : prevSelectedIds.filter((id) => id !== name)
      );
    }
  };

  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    const newFilterStaff = staffList.filter((staff) => {
      return (
        staff.fullName.toLowerCase().includes(searchField) ||
        staff.phone.toLowerCase().includes(searchField) ||
        staff.role.toLowerCase().includes(searchField)
      );
    });
    setFilterStaff(newFilterStaff);
  }, [searchField, staffList]);

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <AddStaffModal onClose={handleHide} ref={staffInputFormRef} />
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-10">
          <p>Danh sách nhân viên</p>
        </div>

        <div className="bg-white border-2 border-white rounded-xl shadow-lg">
          <div>
            <button
              className={`${"h-12 w-48 rounded-t-lg border-white border-b-2  bg-white text-center text-gray-500 font-montserrat text-base hover:border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer"}
              ${currentStatus === "Tất cả" ? classes.current : ""}`}
              status="Tất cả"
              onClick={handleStatusOption}
            >
              Tất cả
            </button>

            {["Đang làm việc", "Đang tạm nghỉ"].map((status) => (
              <button
                key={status}
                className={`h-12 w-48 rounded-t-lg border-white border-b-2  bg-white text-center text-gray-500 font-montserrat text-base hover:border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer ${
                  currentStatus === status ? classes.current : ""
                }`}
                status={status}
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
              onChange={handleSearch}
            />
            <button
              className="w-40 h-10 bg-blue-600 rounded-md text-white ml-10 hover:bg-blue-900 text-xl"
              onClick={handleClick}
            >
              + Thêm mới
            </button>
          </div>
          <table className="w-full border-collapse">
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
                {selectedIds.length > 0 ? (
                  <th colSpan="5" className={classes.th}>
                    <div className="flex">
                      <p className="font-normal pr-2">
                        Đã chọn <b>{selectedIds.length}</b> nhân viên
                      </p>
                      <button
                        onClick={handleDelete}
                        className="border-2 rounded-md border-[#0088FF] text-[#0088FF] outline-none px-2"
                      >
                        Xóa nhân viên
                      </button>
                    </div>
                  </th>
                ) : (
                  <>
                    <th className={classes.th}>Tên nhân viên</th>
                    <th className={classes.th}>Vị trí</th>
                    <th className={classes.th}>Số điện thoại</th>
                    <th className={classes.th}>Doanh thu cá nhân</th>
                    <th className={classes.th}>Trạng thái</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {!currentStaff.length ? (
                <SkeletonRowList
                  amount={5}
                  style="border-b-[#dddddd] h-20 font-[400] text-center border-b-0"
                />
              ) : (
                currentStaff.map((staff) => {
                  const statusClass =
                    staff.status === "Đang tạm nghỉ"
                      ? classes["status-inProgress"]
                      : staff.status === "Đang làm việc"
                      ? classes["status-success"]
                      : classes["status-closed"];

                  return (
                    <tr
                      className={`${classes.tr} ${
                        selectedIds.includes(staff.id) ? classes.select : ""
                      }`}
                      key={staff.id}
                      onClick={() => handleNavigate(staff)}
                    >
                      <td className={classes.td}>
                        <input
                          type="checkbox"
                          name={staff.id}
                          onChange={handleCheckbox}
                          checked={selectedIds.includes(staff.id)}
                          onClick={(event) => event.stopPropagation()}
                        />
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
                })
              )}
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
    </SkeletonTheme>
  );
};

export default TableStaff;
