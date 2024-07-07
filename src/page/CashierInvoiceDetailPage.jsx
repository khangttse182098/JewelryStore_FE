import React, { useContext } from "react";
import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import InvoiceDetail from "../components/CashierRole/InvoiceListPage/InvoiceDetail/InvoiceDetail";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const CashierInvoiceDetailPage = () => {
  const { userRole } = useContext(LoggedInUserContext);

  const renderContent =
    userRole === "CASHIER" ? (
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
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default CashierInvoiceDetailPage;
