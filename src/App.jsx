import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SellerPage from "./page/SellerPage";
import CashierPage from "./page/CashierPage";
import PurchasePage from "./page/PurchasePage/PurchasePage";
import CashierStatusPage from "./page/CashierStatusPage";
import "./util/reset.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sellpage" element={<SellerPage />} />
      <Route path="/invoicelist" element={<CashierPage />} />
      <Route path="/purchasepage" element={<PurchasePage />} />
      <Route path="/statuslistcashier" element={<CashierStatusPage />} />
    </Routes>
  );
}

export default App;
