import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SellerPage from "./page/SellerPage";
import CashierPage from "./page/CashierPage";
import CashierProductPage from "./page/CashierProductPage";
import CashierProductDetailPage from "./page/CashierProductDetailPage";
import PurchasePage from "./page/PurchasePage/PurchasePage";
import CustomerListPage from "./page/CustomerListPage";
import StatusSellerPage from "./page/StatusSellerPage";
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
import ManagerDiscountPage from "./page/ManagerDiscountPage";
import ManagerStaffPage from "./page/ManagerStaffPage";
import ManagerDiscountDetailPage from "./page/ManagerDiscountDetailPage";
import ManagerStaffDetailPage from "./page/ManagerStaffDetailPage";
import ManagerMaterialPage from "./page/ManagerMaterialPage";
import ManagerMaterialDetailPage from "./page/ManagerMaterialDetailPage";
import ManagerMaterialHistoryPage from "./page/ManagerMaterialHistoryPage";
import DashBoardPage from "./page/DashBoardPage";
import ManagerInvoicePage from "./page/ManagerInvoicePage";
import ManagerInvoiceDetailPage from "./page/ManagerInvoiceDetailPage";
import ManagerCustomerPage from "./page/ManagerCustomerPage";
import ManagerCustomerDetailPage from "./page/ManagerCustomerDetailPage";
import ResponsiveWrapper from "./components/UtilComponent/ResponsiveWrapper/ResponsiveWrapper";

function App() {
  return (
    <ResponsiveWrapper>
      <SkeletonTheme baseColor="#DFD8D8" highlightColor="#FFFFFF">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/seller/sellpage" element={<SellerPage />} />
          <Route path="/cashier/invoice/list" element={<CashierPage />} />
          <Route
            path="/cashier/product/list"
            element={<CashierProductPage />}
          />
          <Route
            path="/cashier/product/detail"
            element={<CashierProductDetailPage />}
          />
          <Route path="/seller/purchasepage" element={<PurchasePage />} />
          <Route path="/cashier/customer/list" element={<CustomerListPage />} />
          <Route path="/seller/status/list" element={<StatusSellerPage />} />
          <Route
            path="/cashier/invoice/detail"
            element={<CashierInvoiceDetailPage />}
          />
          <Route path="/seller/repurchasepage" element={<RepurchasePage />} />
          <Route
            path="/manager/product/list"
            element={<ManagerProductPage />}
          />
          <Route
            path="/manager/product/detail"
            element={<ManagerProductDetailPage />}
          />
          <Route
            path="/manager/product/add"
            element={<ManagerAddProductPage />}
          />
          <Route path="/manager/gem/list" element={<ManagerGemPage />} />
          <Route
            path="/manager/gem/price"
            element={<ManagerGemAddPricePage />}
          />
          <Route
            path="/manager/gem/history"
            element={<ManagerGemHistoryPage />}
          />
          <Route
            path="/manager/gem/detail"
            element={<ManagerGemDetailPage />}
          />
          <Route
            path="/manager/gem/infor/list"
            element={<ManagerGemInforPage />}
          />
          <Route
            path="/manager/gem/infor/detail"
            element={<ManagerGemInforDetailPage />}
          />
          <Route path="/manager/gem/add" element={<ManagerGemAddPage />} />
          <Route
            path="/manager/discount/list"
            element={<ManagerDiscountPage />}
          />
          <Route path="/manager/staff/list" element={<ManagerStaffPage />} />
          <Route
            path="/manager/product/detail"
            element={<ManagerProductDetailPage />}
          />
          <Route
            path="/manager/product/add"
            element={<ManagerAddProductPage />}
          />
          <Route
            path="/manager/discount/detail"
            element={<ManagerDiscountDetailPage />}
          />
          <Route
            path="/manager/staff/detail"
            element={<ManagerStaffDetailPage />}
          />
          <Route
            path="/manager/material/list"
            element={<ManagerMaterialPage />}
          />
          <Route
            path="/manager/material/detail"
            element={<ManagerMaterialDetailPage />}
          />
          <Route
            path="/manager/material/history"
            element={<ManagerMaterialHistoryPage />}
          />
          <Route path="/manager/dashboard" element={<DashBoardPage />} />
          <Route path="/manager/chart" element={<DashBoardPage />} />
          <Route
            path="/manager/invoice/list"
            element={<ManagerInvoicePage />}
          />
          <Route
            path="/manager/invoice/detail"
            element={<ManagerInvoiceDetailPage />}
          />
          <Route
            path="/manager/customer/list"
            element={<ManagerCustomerPage />}
          />
          <Route
            path="/manager/customer/detail"
            element={<ManagerCustomerDetailPage />}
          />
        </Routes>
      </SkeletonTheme>
    </ResponsiveWrapper>
  );
}

export default App;
