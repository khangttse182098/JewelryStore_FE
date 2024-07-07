/* eslint-disable no-unused-vars */
import Header from "../../components/SellerRole/UtilsComponent/Header/Header";
import classes from "./PurchasePage.module.css";
import PurchaseOrderDetail from "../../components/SellerRole/PurchasePage/PurchaseOrderDetail/PurchaseOrderDetail";
import InvoiceProductList from "../../components/SellerRole/PurchasePage/InvoiceProductList/InvoiceProductList";
import { useState, useEffect, useContext, useRef } from "react";
import { ProductSellListContext } from "../../context/ProductSellListContext";
import SearchInvoice from "../../components/SellerRole/PurchasePage/SearchInvoice/SearchInvoice";
import { ProductSellInvoiceContext } from "../../context/ProductSellInvoiceContext";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import NotAllowed from "../../components/UtilComponent/NotAllowed/NotAllowed";

const PurchasePage = () => {
  const controllerRef = useRef();
  const { itemSellList, setItemSellList } = useContext(ProductSellListContext);
  const [searchResult, setSearchResult] = useState("");
  const { itemSellInvoice } = useContext(ProductSellInvoiceContext);

  const { userRole } = useContext(LoggedInUserContext);
  const renderContent =
    userRole === "SELLER" ? (
      <>
        <Header />
        <div className={classes["container-all"]}>
          <div>
            <SearchInvoice setSearchResult={setSearchResult} />
            {itemSellList.length ? (
              <p className={classes["invoice-title"]}>
                Mã hóa đơn: {searchResult}
              </p>
            ) : undefined}
            {!itemSellList.length ? (
              <button
                className={classes["not-found-btn"]}
                onClick={handleClick}
              >
                Không tìm thấy hóa đơn
              </button>
            ) : undefined}
            <div className={classes["left-container"]}>
              {itemSellList.map((product, productIndex) => {
                return (
                  <InvoiceProductList key={productIndex} product={product} />
                );
              })}
            </div>
          </div>

          <div className={classes.container}>
            <PurchaseOrderDetail sellOrderCode={searchResult} />
          </div>
        </div>
      </>
    ) : (
      <NotAllowed />
    );
  //fetch order by sell order code
  const navigate = useNavigate();

  function handleClick() {
    navigate("/repurchasepage");
  }

  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const handleFetch = async () => {
      try {
        const res = await fetch(
          `http://mahika.foundation:8080/swp/api/sell-order?sellOrderCode=${searchResult}`,
          { signal }
        );
        const data = await res.json();
        const filteredData = await data.filter(
          (item) => !itemSellInvoice.find((sellItem) => sellItem.id === item.id)
        );
        setItemSellList(filteredData);
      } catch (error) {
        setItemSellList([]);
      }
    };
    handleFetch();
  }, [searchResult]);

  return <>{renderContent}</>;
};

export default PurchasePage;
