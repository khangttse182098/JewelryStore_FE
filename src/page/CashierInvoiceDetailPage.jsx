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
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <CashierSidebar activePage="Danh sách hóa đơn" />
        </div>
        <div className="col-span-5">
          <CashierHeader />
          <div className="w-full flex justify-center">
            <InvoiceDetail invoice={state} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CashierInvoiceDetailPage;
