import TableProduct from "../components/CashierRole/ProductListPage/TableProduct/TableProduct";
import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";

const CashierProductPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0 h-[145vh]">
        <div className="col-span-1">
          <CashierSidebar activePage="Sản phẩm" />
        </div>
        <div className="col-span-5">
          <CashierHeader />
          <div className="w-full flex justify-center">
            <TableProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default CashierProductPage;
