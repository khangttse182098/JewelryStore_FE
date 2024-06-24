import React from "react";
import TableInvoice from "../components/CashierRole/InvoiceListPage/TableInvoice/TableInvoice";
import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";

const CashierPage = () => {
  return (
    <>
      <CashierHeader />
      <CashierSidebar />
      <TableInvoice />
    </>
  );
};

export default CashierPage;
