import ListTableInvoice from "../components/ListTableInvoice/ListTableInvoice";
import Header from "../components/Header/Header";
import CashierSidebar from "../components/CashierSidebar/CashierSidebar";

const CashierPage = () => {
  return (
    <>
      <Header />
      <CashierSidebar />
      <ListTableInvoice />
    </>
  );
};

export default CashierPage;
