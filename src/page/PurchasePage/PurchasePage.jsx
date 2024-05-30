import React from "react";
import Header from "../../components/Header/Header";
import classes from "./PurchasePage.module.css";
import PurchaseOrderDetail from "../../components/PurchaseOrderDetail/PurchaseOrderDetail";

const PurchasePage = () => {
  return (
    <>
      <Header />
      {/* search bar */}
      <div className={classes.container}>
        <div
          style={{
            margin: "23px",
            width: "789px",
            height: "53px",
            borderRadius: "20px",
            backgroundColor: "#DFD8D8",
            textAlign: "center",
            marginTop: "42px",
          }}
        ></div>
        {/* purchase product list */}
        <PurchaseOrderDetail />
      </div>
    </>
  );
};

export default PurchasePage;
