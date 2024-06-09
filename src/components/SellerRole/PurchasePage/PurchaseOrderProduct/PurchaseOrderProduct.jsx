/* eslint-disable react/prop-types */
import classes from "./PurchaseOrderProduct.module.css";
import RingImg from "/assets/ring.png";
import { useContext } from "react";
import { ProductSellInvoiceContext } from "../../../../context/ProductSellInvoiceContext";
import { ProductSellListContext } from "../../../../context/ProductSellListContext";
import { formatter } from "../../../../util/formatter";

const PurchaseOrderProduct = ({ product, sellOrderCode }) => {
  const { removeItemFromSellInvoice } = useContext(ProductSellInvoiceContext);
  const { addItemToSellList } = useContext(ProductSellListContext);
  //fetch get sell order by sell order code
  const handleFetch = () => {
    fetch(
      `http://mahika.foundation:8080/swp/api/sell-order?sellOrderCode=${sellOrderCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        const oldProduct = data.find((item) => item.id === product.id);

        //change product price back to old price
        product = { ...product, price: oldProduct.price };
        addItemToSellList(product);
        removeItemFromSellInvoice(product);
      });
  };

  function handleClick() {
    handleFetch();
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>{product.productName}</h1>
      <div className={classes["content-container"]}>
        <div className={classes["img-container"]}>
          <img src={RingImg} alt="ring img" />
        </div>
        <div className={classes["product-info"]}>
          <p>Mã sản phẩm: {product.productCode}</p>
          <p>Giá: {formatter.format(product.price)}</p>
        </div>
        <button className={classes.btn} onClick={handleClick}>
          -
        </button>
      </div>
    </div>
  );
};

export default PurchaseOrderProduct;
