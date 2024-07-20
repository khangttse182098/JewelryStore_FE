import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import TableCustomer from "../components/CashierRole/CustomerListPage/TableCustomer/TableCustomer";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const CustomerListPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0 h-[144vh]">
        <div className="col-span-1">
          <CashierSidebar activePage="Khách hàng" />
        </div>
        <div className="col-span-5">
          <CashierHeader />
          <div className="w-full flex justify-center">
            <TableCustomer />
          </div>
        </div>
      </div>
    </>
  );
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "CASHIER" ? (
      <>
        <CashierHeader />
        <CashierSidebar />
        <TableCustomer />
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default CustomerListPage;
