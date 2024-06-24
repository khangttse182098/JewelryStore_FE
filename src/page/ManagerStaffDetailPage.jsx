import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import StaffDetail from "../components/ManagerRole/StaffListPage/StaffDetail/StaffDetail";

const ManagerStaffDetailPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar activePage="Nhân viên" />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <StaffDetail />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerStaffDetailPage;
