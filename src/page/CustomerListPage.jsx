import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import TableCustomer from "../components/CashierRole/CustomerListPage/TableCustomer/TableCustomer";

const CustomerListPage = () => {
  return (
    <>
      <CashierHeader />
      <CashierSidebar />
      <TableCustomer />
    </>
  );
};

export default CustomerListPage;
