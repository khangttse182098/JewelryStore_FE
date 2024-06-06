import React from "react";
import Header from "../../components/SellerRole/UtilsComponent/Header/Header";
import classes from "./PurchasePage.module.css";
import PurchaseOrderDetail from "../../components/SellerRole/PurchasePage/PurchaseOrderDetail/PurchaseOrderDetail"
import InvoiceProductList from "../../components/SellerRole/PurchasePage/InvoiceProductList/InvoiceProductList";
import { useState, useEffect, useContext } from "react";
import { ProductSellListContext } from "../../context/ProductSellListContext";
import SearchInvoice from "../../components/SellerRole/PurchasePage/SearchInvoice/SearchInvoice"

const PurchasePage = () => {
  const { itemSellList, setItemSellList } = useContext(ProductSellListContext);
  const [searchResult, setSearchResult] = useState("");
  const handleFetch = () => {
    fetch(
      `http://mahika.foundation:8080/swp/api/sell-order?sellOrderCode=${searchResult}`
    )
      .then((res) => res.json())
      .then((data) => setItemSellList(data));
  };

  useEffect(() => {
    handleFetch();
  }, [searchResult]);
  return (
    <>
      <Header />
      <SearchInvoice setSearchResult={setSearchResult} />
      <p className={classes["invoice-title"]}>Mã hóa đơn: {searchResult}</p>
      <div className={classes.container}>
        <div className={classes["left-container"]}>
          {itemSellList.map((product, productIndex) => {
            return <InvoiceProductList key={productIndex} product={product} />;
          })}
        </div>
        <PurchaseOrderDetail />
      </div>
    </>
  );
};

export default PurchasePage;
