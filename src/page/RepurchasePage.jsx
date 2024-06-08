import Header from "../components/SellerRole/UtilsComponent/Header/Header";
import Category from "../components/SellerRole/PurchaseNoInvoicePage/Category/Category";
import { RepurchaseProvider } from "../context/RepurchaseContext";

const RepurchasePage = () => {
  return (
    <RepurchaseProvider>
      <Header />
      <Category />
    </RepurchaseProvider>
  );
};

export default RepurchasePage;
