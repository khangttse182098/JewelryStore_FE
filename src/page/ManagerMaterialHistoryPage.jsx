import React, { useContext } from "react";
import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import MaterialHistory from "../components/ManagerRole/MaterialListPage/MaterialHistory/MaterialHistory";
import { useLocation } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const ManagerMaterialHistoryPage = () => {
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
          <div className="col-span-5">
            <ManagerHeader />
            <div className="w-full flex justify-center">
              <MaterialHistory material={state.material} />
            </div>
          </div>
        </div>
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default ManagerMaterialHistoryPage;
