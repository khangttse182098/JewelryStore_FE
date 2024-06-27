import React, { useContext } from "react";
import Header from "../components/SellerRole/UtilsComponent/Header/Header";
import CategoryType from "../components/SellerRole/SellPage/CategoryType/CategoryType";
import { ProductSelectionProvider } from "../context/ProductSelectionContext";
import { ProductPurchaseProvider } from "../context/ProductPurchaseContext";
import { ProductPurchaseListProvider } from "../context/ProductPurchaseListContext";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
const SellerPage = () => {
  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "SELLER" ? (
      <ProductPurchaseProvider>
        <ProductSelectionProvider>
          <ProductPurchaseListProvider>
            <Header />
            <CategoryType />
          </ProductPurchaseListProvider>
        </ProductSelectionProvider>
      </ProductPurchaseProvider>
    ) : (
      <h1>Mày phải đăng nhập đã!</h1>
    );
  return <div>{renderContent}</div>;
};

export default SellerPage;
