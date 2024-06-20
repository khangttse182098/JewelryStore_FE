import React from "react";
import TableDiscount from "../components/ManagerRole/DiscountListPage/TableDiscount/TableDiscount";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";

export const ManagerDiscountPage = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-none gap-0">
        <div className="col-span-1">
          <ManagerSidebar />
        </div>
        <div className="col-span-5">
          <ManagerHeader />
          <div className="w-full flex justify-center">
            <TableDiscount />
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagerDiscountPage;
