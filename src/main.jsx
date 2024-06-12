import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./util/reset.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ProductSellListProvider } from "./context/ProductSellListContext.jsx";
import { ProductSellInvoiceProvider } from "./context/ProductSellInvoiceContext.jsx";
import { LoggedInUserProvider } from "./context/LoggedInUserContext.jsx";
import { RepurchaseProvider } from "./context/RepurchaseContext.jsx";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <RepurchaseProvider>
        <LoggedInUserProvider>
          <ProductSellListProvider>
            <ProductSellInvoiceProvider>
              <App />
            </ProductSellInvoiceProvider>
          </ProductSellListProvider>
        </LoggedInUserProvider>
      </RepurchaseProvider>
    </React.StrictMode>
  </BrowserRouter>
);
