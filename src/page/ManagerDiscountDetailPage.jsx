import React from "react";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import DetailDiscount from "../components/ManagerRole/DiscountListPage/DetailDiscount/DetailDiscount";
import { useLocation } from "react-router-dom";

const ManagerDiscountDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar />
        </div>
        <div className="col-span-5 flex flex-col">
          <ManagerHeader />
          <div className="w-full flex-grow">
            <DetailDiscount discount={state.discount} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerDiscountDetailPage;
