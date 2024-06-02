import Header from "../components/Header/Header";
import CategoryType from "../components/CategoryType/CategoryType";
import { ProductSelectionProvider } from "../context/ProductSelectionContext";
import { ProductPurchaseProvider } from "../context/ProductPurchaseContext";
const SellerPage = () => {
  return (
    <ProductPurchaseProvider>
      <ProductSelectionProvider>
        <Header />
        <CategoryType />
      </ProductSelectionProvider>
    </ProductPurchaseProvider>
  );
};

export default SellerPage;
