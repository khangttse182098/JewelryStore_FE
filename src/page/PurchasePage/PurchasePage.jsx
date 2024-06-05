import React from "react";
import Header from "../../components/SellerRole/UtilsComponent/Header/Header";
import classes from "./PurchasePage.module.css";
import PurchaseOrderDetail from "../../components/PurchaseOrderDetail/PurchaseOrderDetail";
import PurchaseProduct from "../../components/PurchaseProduct/PurchaseProduct";
import { useState, useEffect, useContext } from "react";
import { ProductSellListContext } from "../../context/ProductSellListContext";
import SearchSellOrderCode from "../../components/SearchSellOrderCode/SearchSellOrderCode";

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
      <SearchSellOrderCode setSearchResult={setSearchResult} />
      <p className={classes["invoice-title"]}>Mã hóa đơn: {searchResult}</p>
      <div className={classes.container}>
        <div className={classes["left-container"]}>
          {itemSellList.map((product, productIndex) => {
            return <PurchaseProduct key={productIndex} product={product} />;
          })}
        </div>
        <PurchaseOrderDetail />
      </div>
    </>
  );
};

export default PurchasePage;
