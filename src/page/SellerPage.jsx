import Header from "../components/Header/Header";
import CategoryType from "../components/CategoryType/CategoryType";
import { ProductSelectionProvider } from "../context/ProductSelectionContext";
const SellerPage = () => {
  return (
    <ProductSelectionProvider>
      <Header />
      <CategoryType />
    </ProductSelectionProvider>
  );
};

export default SellerPage;
