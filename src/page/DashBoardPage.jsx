import React from "react";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import DashboardChart from "../components/ManagerRole/Dashboard/DashboardChart";

const DashBoardPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar />
        </div>
        <div className="col-span-5 flex flex-col">
          <ManagerHeader />
          <div className="w-full flex-grow">
            <DashboardChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardPage;
