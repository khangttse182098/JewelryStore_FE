/* eslint-disable no-unused-vars */
import Header from "../../components/SellerRole/UtilsComponent/Header/Header";
import classes from "./PurchasePage.module.css";
import PurchaseOrderDetail from "../../components/SellerRole/PurchasePage/PurchaseOrderDetail/PurchaseOrderDetail";
import InvoiceProductList from "../../components/SellerRole/PurchasePage/InvoiceProductList/InvoiceProductList";
import { useState, useEffect, useContext } from "react";
import { ProductSellListContext } from "../../context/ProductSellListContext";
import SearchInvoice from "../../components/SellerRole/PurchasePage/SearchInvoice/SearchInvoice";
import { ProductSellInvoiceContext } from "../../context/ProductSellInvoiceContext";
import { useNavigate } from "react-router-dom";

const PurchasePage = () => {
  const { itemSellList, setItemSellList } = useContext(ProductSellListContext);
  const [searchResult, setSearchResult] = useState("");
  const { itemSellInvoice } = useContext(ProductSellInvoiceContext);
  //fetch order by sell order code
  const navigate = useNavigate();
  const handleFetch = () => {
    fetch(
      `http://mahika.foundation:8080/swp/api/sell-order?sellOrderCode=${searchResult}`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => !itemSellInvoice.find((sellItem) => sellItem.id === item.id)
        );
        setItemSellList(filteredData);
      })
      .catch((err) => {
        setItemSellList([]);
        return "";
      });
  };

  function handleClick() {
    navigate("/repurchasepage");
  }

  useEffect(() => {
    handleFetch();
  }, [searchResult]);

  return (
    <>
      <Header />
      <SearchInvoice setSearchResult={setSearchResult} />
      {itemSellList.length ? (
        <p className={classes["invoice-title"]}>Mã hóa đơn: {searchResult}</p>
      ) : undefined}
      {!itemSellList.length ? (
        <button className={classes["not-found-btn"]} onClick={handleClick}>
          Không tìm thấy hóa đơn
        </button>
      ) : undefined}
      <div className={classes.container}>
        <div className={classes["left-container"]}>
          {itemSellList.map((product, productIndex) => {
            return <InvoiceProductList key={productIndex} product={product} />;
          })}
        </div>
        <PurchaseOrderDetail sellOrderCode={searchResult} />
      </div>
    </>
  );
};

export default PurchasePage;
