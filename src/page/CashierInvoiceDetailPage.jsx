import React from "react";
import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import InvoiceDetail from "../components/CashierRole/InvoiceListPage/InvoiceDetail/InvoiceDetail";
import { useLocation } from "react-router-dom";

const CashierInvoiceDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <>
      <CashierHeader />
      <CashierSidebar />
      <InvoiceDetail invoice={state} />
    </>
  );
};

export default CashierInvoiceDetailPage;
