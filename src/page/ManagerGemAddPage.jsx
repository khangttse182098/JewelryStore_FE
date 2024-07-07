import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import AddGem from "../components/ManagerRole/GemInforPage/AddGem/AddGem";

const ManagerGemAddPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar activePage="Thông tin kim cương" />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <AddGem />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerGemAddPage;
