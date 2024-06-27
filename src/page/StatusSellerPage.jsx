import Header from "../components/SellerRole/UtilsComponent/Header/Header";
import TableStatus from "../components/SellerRole/StatusPage/TableStatus/TableStatus";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

const StatusSellerPage = () => {
  const { userRole } = useContext(LoggedInUserContext);
  return (
    <>
      {userRole === "SELLER" ? (
        <>
          <Header />
          <TableStatus />
        </>
      ) : (
        <h1>Mày phải đăng nhập đã!</h1>
      )}
    </>
  );
};

export default StatusSellerPage;
