import ManagerHeader from "../components/ManagerRole/UtilsComponent/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../components/ManagerRole/UtilsComponent/ManagerSidebar/ManagerSidebar";
import TableGemInfor from "../components/ManagerRole/GemInforPage/TableGemInfor/TableGemInfor";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

const ManagerGemInforPage = () => {
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "MANAGER" ? (
      <>
        <div className="grid grid-cols-6 grid-rows-none gap-0">
          <div className="col-span-1">
            <ManagerSidebar activePage="Thông tin kim cương" />
          </div>
          <div className="col-span-5">
            <ManagerHeader />
            <div className="w-full flex justify-center">
              <TableGemInfor />
            </div>
          </div>
        </div>
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default ManagerGemInforPage;
