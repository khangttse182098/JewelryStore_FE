/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classes from "./PurchaseOrderDetail.module.css";
import PurchaseOrderProduct from "../PurchaseOrderProduct/PurchaseOrderProduct";
import { useContext, useState, useEffect, useRef } from "react";
import { ProductSellInvoiceContext } from "../../../../context/ProductSellInvoiceContext";
import { formatter } from "../../../../util/formatter";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";
import { ProductSellListContext } from "../../../../context/ProductSellListContext";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const PurchaseOrderDetail = ({ sellOrderCode }) => {
  const { itemSellInvoice, setItemSellInvoice } = useContext(
    ProductSellInvoiceContext
  );
  const { itemSellList } = useContext(ProductSellListContext);
  const { userId } = useContext(LoggedInUserContext);
  const [price, setPrice] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [purchaseDiscountPrice, setPurchaseDiscountPrice] = useState(null);
  const [differenceInPrice, setDifferenceInPrice] = useState(0);
  const doneModalRef = useRef();

  useEffect(() => {
    const total = itemSellInvoice.reduce((sum, item) => sum + item.price, 0);
    setPrice(total);
  }, [itemSellInvoice]);

  const productSellInvoiceListId = [];
  itemSellInvoice.map((item, index) => productSellInvoiceListId.push(item.id));

  const reqBodySellInvoicePrice = {
    productId: [...productSellInvoiceListId],
  };
  // receive price from BE

  useEffect(() => {
    const handleFetch = () => {
      fetch(
        "http://mahika.foundation:8080/swp/api/purchase-order/product-price",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBodySellInvoicePrice),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setItemSellInvoice(
            itemSellInvoice.reduce((acc, curr) => {
              const resInvoice = data.find(
                (element) => element.productId === curr.id
              );

              setPurchaseDiscountPrice(resInvoice.discountPrice);
              return [
                ...acc,
                {
                  ...curr,
                  price: resInvoice.purchasePrice,
                  discountPrice: resInvoice.discountPrice,
                  originalPrice: resInvoice.soldPrice,
                },
              ];
            }, [])
          );
        });
    };

    handleFetch();
  }, [itemSellList]);

  useEffect(() => {
    setTotalDiscountPrice(
      itemSellInvoice.reduce((acc, curr) => {
        return acc + curr.discountPrice;
      }, 0)
    );
  }, [itemSellList, purchaseDiscountPrice]);

  // send purhchase order to BE
  const reqBody = {
    sellOrderCode: sellOrderCode,
    userId: userId,
    productId: [...productSellInvoiceListId],
  };
  function handleClick() {
    fetch("http://mahika.foundation:8080/swp/api/purchase-order/have-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }).then((res) => {
      setItemSellInvoice([]);
      handleOpenDoneModal();
    });
  }

  function handleOpenDoneModal() {
    doneModalRef.current.showModal();
  }
  function handleCloseDoneModal() {
    doneModalRef.current.close();
  }
  useEffect(() => {
    if (itemSellInvoice.length) {
      console.log(
        itemSellInvoice.reduce(
          (acc, curr) => acc + curr.originalPrice - curr.discountPrice,
          0
        )
      );
      function handleDifferenceInPrice() {
        setDifferenceInPrice(
          itemSellInvoice.reduce(
            (acc, curr) => acc + curr.originalPrice - curr.price,
            0
          )
        );
      }
      handleDifferenceInPrice();
    }
  }, [itemSellInvoice]);

  return (
    <>
      <DoneModal ref={doneModalRef} handleClose={handleCloseDoneModal} />
      <div className={classes.container}>
        <di>
          <div className={classes.title}>Thông tin đơn hàng</div>
          <div className={classes["container-order"]}>
            {itemSellInvoice.map((product, productIndex) => {
              return (
                <PurchaseOrderProduct
                  sellOrderCode={sellOrderCode}
                  key={productIndex}
                  product={product}
                />
              );
            })}
          </div>
        </di>
        <div className={classes["information-bar"]}>
          <div className={classes.frame}>
            <p className={classes.p}>Tổng số lượng</p>
            <p className={classes.p}>{itemSellInvoice.length ?? ""}</p>
          </div>
          <div className={classes.frame}>
            <p className={classes.p}>Tổng tiền</p>
            <p className={classes.p}>
              {itemSellInvoice.length ? formatter.format(price) : ""}
            </p>
          </div>
          <div className={classes.frame}>
            <p className={classes.p}>Khuyến mãi</p>
            <p className={classes.p}>
              {totalDiscountPrice >= 0
                ? `+${formatter.format(totalDiscountPrice)}`
                : `${formatter.format(totalDiscountPrice)}`}
            </p>
          </div>

          <div className={classes.frame}>
            <p className={classes.total}>Thanh toán</p>
            <p className={classes.total}>
              {itemSellInvoice.length
                ? formatter.format(price + totalDiscountPrice)
                : ""}
            </p>
          </div>
          <button className={classes.createInvoice} onClick={handleClick}>
            THANH TOÁN
          </button>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrderDetail;
