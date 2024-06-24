import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import TableProduct from "../components/ManagerRole/ProductListPage/TableProduct/TableProduct";

const ManagerProductPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <TableProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerProductPage;
