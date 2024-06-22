import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SellerPage from "./page/SellerPage";
import CashierPage from "./page/CashierPage";
import PurchasePage from "./page/PurchasePage/PurchasePage";
import CustomerListPage from "./page/CustomerListPage";
import StatusSellerPage from "./page/StatusSellerPage";
import "./util/reset.css";
import CashierInvoiceDetailPage from "./page/CashierInvoiceDetailPage";
import RepurchasePage from "./page/RepurchasePage";
import ManagerProductPage from "./page/ManagerProductPage";
import { SkeletonTheme } from "react-loading-skeleton";
import ManagerDiscountPage from "./page/ManagerDiscountPage";
import ManagerStaffPage from "./page/ManagerStaffPage";
import ManagerDiscountDetailPage from "./page/ManagerDiscountDetailPage";
import ManagerStaffDetailPage from "./page/ManagerStaffDetailPage";
import ManagerCustomerPage from "./page/ManagerCustomerPage";
import ManagerCustomerDetailPage from "./page/ManagerCustomerDetailPage";

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
        <Route path="/managerproductlist" element={<ManagerProductPage />} />
        <Route path="/managerdiscountlist" element={<ManagerDiscountPage />} />
        <Route path="/managerstafflist" element={<ManagerStaffPage />} />
        <Route
          path="/managerdiscountdetail"
          element={<ManagerDiscountDetailPage />}
        />
        <Route
          path="/managerstaffdetail"
          element={<ManagerStaffDetailPage />}
        />
        <Route path="/managercustomerlist" element={<ManagerCustomerPage />} />
        <Route
          path="/managercustomerdetail"
          element={<ManagerCustomerDetailPage />}
        />
      </Routes>
    </SkeletonTheme>
  );
}

export default App;
