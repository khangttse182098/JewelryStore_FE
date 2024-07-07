import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import AddGemCriteria from "../components/ManagerRole/GemDisplayPage/AddGemCriteria/AddGemCriteria";
import { useLocation } from "react-router-dom";

const ManagerGemAddPricePage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar activePage="Thông tin kim cương" />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <AddGemCriteria gem={state.gem} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerGemAddPricePage;
