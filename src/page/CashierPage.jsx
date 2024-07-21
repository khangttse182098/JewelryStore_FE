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
        <div className="grid grid-cols-6 grid-rows-none gap-0 h-[145vh]">
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
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default CashierPage;
