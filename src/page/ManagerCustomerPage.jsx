import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import TableCustomer from "../components/ManagerRole/CustomerListPage/TableCustomer/TableCustomer";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const ManagerProductPage = () => {
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "MANAGER" ? (
      <>
        <div className="grid grid-cols-6 grid-rows-none gap-0">
          <div className="col-span-1">
            <ManagerSidebar activePage="Khách hàng" />
          </div>
          <div className="col-span-5">
            <ManagerHeader />
            <div className="w-full flex justify-center">
              <TableCustomer />
            </div>
          </div>
        </div>
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default ManagerProductPage;
