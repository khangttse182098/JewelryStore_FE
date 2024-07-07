import React, { useContext } from "react";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import { useLocation } from "react-router-dom";
import DetailMaterial from "../components/ManagerRole/MaterialListPage/DetailMaterial/DetailMaterial";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const ManagerMaterialDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "MANAGER" ? (
      <>
        <div className="grid grid-cols-6 grid-rows-none gap-0">
          <div className="col-span-1">
            <ManagerSidebar activePage="Giá vàng" />
          </div>
          <div className="col-span-5 flex flex-col">
            <ManagerHeader />
            <div className="w-full flex-grow">
              <DetailMaterial material={state.material} />
            </div>
          </div>
        </div>
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default ManagerMaterialDetailPage;
