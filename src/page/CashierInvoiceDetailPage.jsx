import React, { useContext } from "react";
import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import InvoiceDetail from "../components/CashierRole/InvoiceListPage/InvoiceDetail/InvoiceDetail";
import { useLocation } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const CashierInvoiceDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  const { userRole } = useContext(LoggedInUserContext);

  const renderContent =
    userRole === "CASHIER" ? (
      <>
        <CashierHeader />
        <CashierSidebar />
        <InvoiceDetail invoice={state} />
      </>
    ) : (
      <NotAllowed />
    );
  return <>{NotAllowed}</>;
};

export default CashierInvoiceDetailPage;
