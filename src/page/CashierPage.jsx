import React from "react";
import TableInvoice from "../components/CashierRole/InvoiceListPage/TableInvoice/TableInvoice";
import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";

const CashierPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <CashierSidebar activePage="Danh sách hóa đơn" />
        </div>
        <div className="col-span-5">
          <CashierHeader />
          <div className="w-full flex justify-center">
            <TableInvoice />
          </div>
        </div>
      </div>
    </>
  );
};

export default CashierPage;
