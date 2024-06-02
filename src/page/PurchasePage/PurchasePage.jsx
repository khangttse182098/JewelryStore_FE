import React from "react";
import Header from "../../components/Header/Header";
import classes from "./PurchasePage.module.css";
import PurchaseOrderDetail from "../../components/PurchaseOrderDetail/PurchaseOrderDetail";
import PurchaseProduct from "../../components/PurchaseProduct/PurchaseProduct";
import { useState, useEffect, useContext } from "react";
import { ProductSellListContext } from "../../context/ProductSellListContext";

const PurchasePage = () => {
  const { itemSellList, setItemSellList } = useContext(ProductSellListContext);
  const handleFetch = () => {
    fetch(`http://localhost:8080/api/sell-order?sellOrderCode=SEL003`)
      .then((res) => res.json())
      .then((data) => setItemSellList(data));
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <>
      <Header />
      <p className={classes["invoice-title"]}>Mã hóa đơn: SEL003</p>
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
