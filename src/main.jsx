import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./util/reset.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ProductSellListProvider } from "./context/ProductSellListContext.jsx";
import { ProductSellInvoiceProvider } from "./context/ProductSellInvoiceContext.jsx";
import { LoggedInUserProvider } from "./context/LoggedInUserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <LoggedInUserProvider>
        <ProductSellListProvider>
          <ProductSellInvoiceProvider>
            <App />
          </ProductSellInvoiceProvider>
        </ProductSellListProvider>
      </LoggedInUserProvider>
    </React.StrictMode>
  </BrowserRouter>
);
