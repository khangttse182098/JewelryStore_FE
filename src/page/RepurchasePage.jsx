import Header from "../components/SellerRole/UtilsComponent/Header/Header";
import Category from "../components/SellerRole/PurchaseNoInvoicePage/Category/Category";
import NotAllowed from "../components/UtilComponent/NotAllowed/NotAllowed";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { useContext } from "react";

const RepurchasePage = () => {
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "SELLER" ? (
      <>
        <Header />
        <Category />
      </>
    ) : (
      <NotAllowed />
    );
  return <>{renderContent}</>;
};

export default RepurchasePage;
