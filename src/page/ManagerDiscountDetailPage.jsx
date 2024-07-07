import React, { useContext } from "react";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import DetailDiscount from "../components/ManagerRole/DiscountListPage/DetailDiscount/DetailDiscount";
import { useLocation } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const ManagerDiscountDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "MANAGER" ? (
      <>
        <div className="grid grid-cols-6 grid-rows-none gap-0">
          <div className="col-span-1">
            <ManagerSidebar activePage="Khuyến mãi" />
          </div>
          <div className="col-span-5 flex flex-col">
            <ManagerHeader />
            <div className="w-full flex-grow">
              <DetailDiscount discount={state.discount} />
            </div>
          </div>
        </div>
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default ManagerDiscountDetailPage;
