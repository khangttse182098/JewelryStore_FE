import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import AddProduct from "../components/ManagerRole/ProductListPage/AddProduct/AddProduct";

const ManagerAddProductPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar activePage="Sản phẩm" />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <AddProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerAddProductPage;
