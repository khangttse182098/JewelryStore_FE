import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";
import TableCustomer from "../components/CashierRole/CustomerListPage/TableCustomer/TableCustomer";

const CustomerListPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <CashierSidebar activePage="Khách hàng" />
        </div>
        <div className="col-span-5">
          <CashierHeader />
          <div className="w-full flex justify-center">
            <TableCustomer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerListPage;
