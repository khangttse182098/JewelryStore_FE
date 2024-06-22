import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import TableInvoice from "../components/ManagerRole/InvoiceListPage/TableInvoice/TableInvoice";

const ManagerInvoicePage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar activePage="Hóa đơn" />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <TableInvoice />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerInvoicePage;
