import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import GemInforDetail from "../components/ManagerRole/GemInforPage/GemInforDetail/GemInforDetail";
import { useLocation } from "react-router-dom";

const ManagerGemInforDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar activePage="Kim cương" />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <GemInforDetail gem={state.gem} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerGemInforDetailPage;
