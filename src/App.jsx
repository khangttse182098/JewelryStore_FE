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

function App() {
  return (
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
    </Routes>
  );
}

export default App;
