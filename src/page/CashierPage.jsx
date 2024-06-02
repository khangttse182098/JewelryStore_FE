import ListTableInvoice from "../components/ListTableInvoice/ListTableInvoice";
import HeaderCashier from "../components/HeaderCashier/HeaderCashier";
import CashierSidebar from "../components/CashierSidebar/CashierSidebar";

const CashierPage = () => {
  return (
    <>
      <HeaderCashier />
      <CashierSidebar />
      <ListTableInvoice />
    </>
  );
};

export default CashierPage;
