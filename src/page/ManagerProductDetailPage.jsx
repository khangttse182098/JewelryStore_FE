import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import ProductDetail from "../components/ManagerRole/ProductListPage/ProductDetail/ProductDetail";
import { useLocation } from "react-router-dom";

const ManagerProductDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <ProductDetail product={state} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerProductDetailPage;
