import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./util/reset.css";
import "./index.css";
import { ProductSellListProvider } from "./context/ProductSellListContext.jsx";
import { ProductSellInvoiceProvider } from "./context/ProductSellInvoiceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductSellListProvider>
      <ProductSellInvoiceProvider>
        <App />
      </ProductSellInvoiceProvider>
    </ProductSellListProvider>
  </React.StrictMode>
);
