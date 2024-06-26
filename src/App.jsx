import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SellerPage from "./page/SellerPage";
import CashierPage from "./page/CashierPage";
import PurchasePage from "./page/PurchasePage/PurchasePage";
import CustomerListPage from "./page/CustomerListPage";
import StatusSellerPage from "./page/StatusSellerPage";
import CashierStatusPage from "./page/CashierStatusPage";
import "./util/reset.css";
import CashierInvoiceDetailPage from "./page/CashierInvoiceDetailPage";
import RepurchasePage from "./page/RepurchasePage";
import ManagerProductPage from "./page/ManagerProductPage";
import ManagerProductDetailPage from "./page/ManagerProductDetailPage";
import ManagerAddProductPage from "./page/ManageAddProductPage";
import { SkeletonTheme } from "react-loading-skeleton";
import ManagerGemPage from "./page/ManagerGemPage";
import ManagerGemHistoryPage from "./page/ManagerGemHistoryPage";
import ManagerGemDetailPage from "./page/ManagerGemDetailPage";
import ManagerGemInforPage from "./page/ManagerGemInforPage";
import ManagerGemAddPage from "./page/ManagerGemAddPage";
import ManagerGemInforDetailPage from "./page/ManagerGemInforDetailPage";
import ManagerGemAddPricePage from "./page/ManagerGemAddPricePage";

function App() {
  return (
    <SkeletonTheme baseColor="#DFD8D8" highlightColor="#FFFFFF">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sellpage" element={<SellerPage />} />
        <Route path="/invoicelist" element={<CashierPage />} />
        <Route path="/purchasepage" element={<PurchasePage />} />
        <Route path="/customerlist" element={<CustomerListPage />} />
        <Route path="/statuslist" element={<StatusSellerPage />} />
        <Route path="/invoicedetail" element={<CashierInvoiceDetailPage />} />
        <Route path="/repurchasepage" element={<RepurchasePage />} />
        <Route path="/statuslistcashier" element={<CashierStatusPage />} />
        <Route path="/managerproductlist" element={<ManagerProductPage />} />
        <Route
          path="/managerproductdetail"
          element={<ManagerProductDetailPage />}
        />
        <Route path="/manageraddproduct" element={<ManagerAddProductPage />} />
        <Route path="/managergemlist" element={<ManagerGemPage />} />
        <Route
          path="/manageraddgemprice"
          element={<ManagerGemAddPricePage />}
        />
        <Route path="/managergemhistory" element={<ManagerGemHistoryPage />} />
        <Route path="/managergemdetail" element={<ManagerGemDetailPage />} />
        <Route path="managergeminforlist" element={<ManagerGemInforPage />} />
        <Route
          path="/managergeminfordetail"
          element={<ManagerGemInforDetailPage />}
        />
        <Route path="/manageraddgem" element={<ManagerGemAddPage />} />
      </Routes>
    </SkeletonTheme>
  );
}

export default App;
