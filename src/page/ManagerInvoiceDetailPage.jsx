import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import InvoiceDetail from "../components/ManagerRole/InvoiceListPage/InvoiceDetail/InvoiceDetail";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const ManagerInvoiceDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "MANAGER" ? (
      <>
        <div className="grid grid-cols-6 grid-rows-none gap-0">
          <div className="col-span-1">
            <ManagerSidebar activePage="Danh sách hóa đơn" />
          </div>
          <div className="col-span-5">
            <ManagerHeader />
            <div className="w-full flex justify-center">
              <InvoiceDetail order={state.order} />
            </div>
          </div>
        </div>
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default ManagerInvoiceDetailPage;
