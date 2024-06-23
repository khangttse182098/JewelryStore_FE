import React from "react";
import Header from "../components/SellerRole/UtilsComponent/Header/Header";
import CategoryType from "../components/SellerRole/SellPage/CategoryType/CategoryType";
import { ProductSelectionProvider } from "../context/ProductSelectionContext";
import { ProductPurchaseProvider } from "../context/ProductPurchaseContext";
import { ProductPurchaseListProvider } from "../context/ProductPurchaseListContext";
const SellerPage = () => {
  return (
    <ProductPurchaseProvider>
      <ProductSelectionProvider>
        <ProductPurchaseListProvider>
          <Header />
          <CategoryType />
        </ProductPurchaseListProvider>
      </ProductSelectionProvider>
    </ProductPurchaseProvider>
  );
};

export default SellerPage;
