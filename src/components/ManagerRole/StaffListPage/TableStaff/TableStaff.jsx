import { useEffect, useState, useRef, Fragment } from "react";
import classes from "./TableStaff.module.css";
import { formatter } from "../../../../util/formatter";
import PaginationStaffList from "./../PaginationStaffList/PaginationStaffList";
import AddStaffModal from "../AddStaffModal/AddStaffModal";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [filterStaff, setFilterStaff] = useState([...staffList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage, setStaffPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const lastStaffIndex = currentPage * staffPerPage;
  const firstStaffIndex = lastStaffIndex - staffPerPage;
  const currentStaff = filterStaff.slice(firstStaffIndex, lastStaffIndex);
  const staffInputFormRef = useRef();
  const [select, setSelect] = useState(false);
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Tất cả");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const handleStaff = async () => {
      const response = await fetch(
        "http://mahika.foundation:8080/swp/api/user"
      );
      const data = await response.json();
      let temp = data?.map((e) => ({ ...e, isChecked: false })) || [];
      setStaffList(temp);
      setFilterStaff(temp);
      setIsLoading(false);
    };
    return await handleStaff();
  };

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
    const deletePromises = selectedIds.map(
      async (id) =>
        await fetch(`http://mahika.foundation:8080/swp/api/user/delete-${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
    );
    await Promise.all(deletePromises);
    await getData();
    // clear filter's parameters
    setSelectedIds([]);
    setSelect(false);
  };

  function handleClick() {
    staffInputFormRef.current.showModal();
  }

  function handleHide() {
    staffInputFormRef.current.close();
    getData();
  }

  function handleNavigate(staff) {
    navigate("/manager/staff/detail", { state: { staff } });
  }

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    const tempStaff = filterStaff.map((staff) => {
      if (staff.id == name) {
        if (checked) {
          setSelectedIds((prevIds) => [...prevIds, staff.id]);
        } else {
          setSelectedIds((prevIds) => prevIds.filter((id) => id !== staff.id));
        }
        return { ...staff, isChecked: checked };
      }
      return staff;
    });
    setFilterStaff(tempStaff);
  };

  const handleCheckAll = (event) => {
    const { name, checked } = event.target;
    setSelect(checked);
    const tempStaff = filterStaff.map((staff) => {
      return { ...staff, isChecked: checked };
    });
    setFilterStaff(tempStaff);
    if (checked) {
      setSelectedIds(filterStaff.map((staff) => staff.id));
    } else {
      setSelectedIds([]);
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
        staff.role.toLowerCase().includes(searchField) ||
        staff.status.toLowerCase().includes(searchField) ||
        staff.personalIncome.toString().toLowerCase().includes(searchField)
      );
    });
    setFilterStaff(newFilterStaff);
  }, [searchField, staffList]);

  let skeletonRowList = [];
  for (let index = 0; index < staffPerPage; index++) {
    skeletonRowList.push(
      <tr key={index}>
        <td colSpan="6">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <AddStaffModal onClose={handleHide} ref={staffInputFormRef} />
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-7">
          <p>Danh sách nhân viên</p>
        </div>

        <div className="bg-white border-2 border-white rounded-xl shadow-lg">
          <div>
            <button
              className={`${classes.button}
              ${currentStatus === "Tất cả" ? classes.current : ""}`}
              status="Tất cả"
              onClick={handleStatusOption}
            >
              Tất cả
            </button>

            {["Đang làm việc", "Đang tạm nghỉ"].map((status) => (
              <button
                key={status}
                className={`${classes.button}
                  ${currentStatus === status ? classes.current : ""}
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
              className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11 ml-14 mr-4"
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
                <th className={`${classes["table-header"]} ${classes.th}`}>
                  <input
                    type="checkbox"
                    name="allSelect"
                    onChange={handleCheckAll}
                    checked={select}
                    key={selectedIds.length}
                  />
                </th>
                {select ? (
                  <>
                    <th colSpan="6" className={classes.th}>
                      <div className="flex">
                        <p className="font-normal pr-2">
                          Đã chọn <b>tất cả</b> nhân viên trên trang này
                        </p>
                        <select
                          onChange={(e) =>
                            e.target.value === "delete" && handleDelete()
                          }
                          defaultValue=""
                          className="border-2 rounded-md border-[#0088FF] text-[#0088FF] outline-none"
                        >
                          <option value="">Chọn thao tác</option>
                          <option value="delete">Xóa nhân viên</option>
                        </select>
                      </div>
                    </th>
                  </>
                ) : selectedIds.length ? (
                  <>
                    <th colSpan="6" className={classes.th}>
                      <div className="flex">
                        <p className="font-normal pr-2">
                          Đã chọn <b>{selectedIds.length}</b> nhân viên trên
                          trang này
                        </p>
                        <select
                          onChange={(e) =>
                            e.target.value === "delete" && handleDelete()
                          }
                          defaultValue=""
                          className="border-2 rounded-md border-[#0088FF] text-[#0088FF] outline-none"
                        >
                          <option value="">Chọn thao tác</option>
                          <option value="delete">Xóa nhân viên</option>
                        </select>
                      </div>
                    </th>
                  </>
                ) : (
                  <>
                    <th className={classes.th}>Họ và tên</th>
                    <th className={classes.th}>Vị trí làm việc</th>
                    <th className={classes.th}>Số điện thoại</th>
                    <th className={classes.th}>Doanh thu</th>
                    <th className={classes.th}>Trạng thái</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                skeletonRowList
              ) : !currentStaff.length ? (
                <tr>
                  <td
                    colSpan="6"
                    className="font-medium text-red-500 text-center h-32"
                  >
                    Không tìm thấy kết quả cho "{searchField}"
                  </td>
                </tr>
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
                        staff?.isChecked ? classes.select : ""
                      }`}
                      key={staff.id}
                    >
                      <td className={classes.td}>
                        <input
                          type="checkbox"
                          name={staff.id}
                          onClick={handleCheckbox}
                          onChange={(event) => event.stopPropagation()}
                          checked={staff?.isChecked}
                        />
                      </td>
                      <td
                        className={classes.td}
                        onClick={() => handleNavigate(staff)}
                      >
                        {staff.fullName}
                      </td>
                      <td
                        className={classes.td}
                        onClick={() => handleNavigate(staff)}
                      >
                        {staff.role}
                      </td>
                      <td
                        className={classes.td}
                        onClick={() => handleNavigate(staff)}
                      >
                        {staff.phone}
                      </td>
                      <td
                        className={classes.td}
                        onClick={() => handleNavigate(staff)}
                      >
                        {formatter.format(staff.personalIncome)}
                      </td>
                      <td
                        className={classes.td}
                        onClick={() => handleNavigate(staff)}
                      >
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
