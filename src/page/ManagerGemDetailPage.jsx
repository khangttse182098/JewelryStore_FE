import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import DetailGem from "../components/ManagerRole/GemDisplayPage/DetailGem/DetailGem";
import { useLocation } from "react-router-dom";

const ManagerGemDetailPage = () => {
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
            <DetailGem gem={state.gem} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerGemDetailPage;
