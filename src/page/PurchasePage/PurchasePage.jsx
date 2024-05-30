import React from "react";
import Header from "../../components/Header/Header";
import classes from "./PurchasePage.module.css";
import PurchaseOrderDetail from "../../components/PurchaseOrderDetail/PurchaseOrderDetail";
import PurchaseProduct from "../../components/PurchaseProduct/PurchaseProduct";
import { useState, useEffect } from "react";

const PurchasePage = () => {
  const [productList, setProductList] = useState([]);
  const [showPurchaseProduct, setShowPurchaseProduct] = useState(true);
  const [showPurchaseProductInvoice, setShowPurchaseProductInvoice] =
    useState(false);
  http: useEffect(() => {
    fetch(`http://localhost:8080/api/product`)
      .then((res) => res.json())
      .then((data) => setProductList(data));
  }, [productList]);
  return (
    <>
      <Header />
      <p className={classes["invoice-title"]}>Mã hóa đơn: INV001</p>
      <div className={classes.container}>
        <div className={classes["left-container"]}>
          {productList.map((product, productIndex) => {
            return (
              <PurchaseProduct
                showPurchaseProduct={showPurchaseProduct}
                setShowPurchaseProductInvoice={setShowPurchaseProductInvoice}
                key={productIndex}
                product={product}
              />
            );
          })}
        </div>
        <PurchaseOrderDetail
          showPurchaseProductInvoice={showPurchaseProductInvoice}
          setShowPurchaseProduct={setShowPurchaseProduct}
          productList={productList}
        />
      </div>
    </>
  );
};

export default PurchasePage;
