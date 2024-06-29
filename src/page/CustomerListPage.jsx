import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import TableCustomer from "../components/CashierRole/CustomerListPage/TableCustomer/TableCustomer";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const CustomerListPage = () => {
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
