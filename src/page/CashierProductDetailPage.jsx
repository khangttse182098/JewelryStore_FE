import { useLocation } from "react-router-dom";
import ProductDetail from "../components/CashierRole/ProductListPage/ProductDetail/ProductDetail";
import CashierHeader from "../components/CashierRole/UtilsComponent/CashierHeader/CashierHeader";
import CashierSidebar from "../components/CashierRole/UtilsComponent/CashierSidebar/CashierSidebar";

const CashierProductDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0 h-[145vh]">
        <div className="col-span-1">
          <CashierSidebar activePage="Sản phẩm" />
        </div>
        <div className="col-span-5">
          <CashierHeader />
          <div className="w-full flex justify-center">
            <ProductDetail product={state.product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CashierProductDetailPage;
