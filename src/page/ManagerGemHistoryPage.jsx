import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import GemHistory from "../components/ManagerRole/GemDisplayPage/GemHistory/GemHistory";
import { useLocation } from "react-router-dom";

const ManagerGemHistoryPage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar activePage="Giá kim cương" />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <GemHistory gem={state.gem} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerGemHistoryPage;
