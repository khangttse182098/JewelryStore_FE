import React, { useContext } from "react";
import TableInvoice from "../components/CashierRole/InvoiceListPage/TableInvoice/TableInvoice";
import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

const CashierPage = () => {
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "CASHIER" ? (
      <>
        <CashierHeader />
        <CashierSidebar />
        <TableInvoice />
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default CashierPage;
