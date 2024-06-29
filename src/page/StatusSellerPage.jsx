import Header from "../components/SellerRole/UtilsComponent/Header/Header";
import TableStatus from "../components/SellerRole/StatusPage/TableStatus/TableStatus";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";

const StatusSellerPage = () => {
  const { userRole } = useContext(LoggedInUserContext);

  const renderContent =
    userRole === "SELLER" ? (
      <>
        <Header />
        <TableStatus />
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default StatusSellerPage;
