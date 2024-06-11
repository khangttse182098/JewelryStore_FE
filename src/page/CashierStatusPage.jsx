import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import TableStatusCashier from "../components/CashierRole/InvoiceListPage/TableStatusCashier/TableStatusCashier";

const CashierStatusPage = () => {
  return (
    <>
      <CashierHeader />
      <CashierSidebar />
      <TableStatusCashier />
    </>
  );
};

export default CashierStatusPage;
