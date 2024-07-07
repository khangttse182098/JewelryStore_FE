/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { forwardRef, useContext, useRef, useState } from "react";
import classes from "./CusctomerInputForm.module.css";
import { ProductPurchaseContext } from "../../../../context/ProductPurchaseContext";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";
import { RepurchaseContext } from "../../../../context/RepurchaseContext";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const CustomerInputForm = forwardRef(function CustomerInputForm(
  { handleHide, isPurchase, discountId },
  ref
) {
  const { itemPurchase, setItemPurchase } = useContext(ProductPurchaseContext);
  const { userId } = useContext(LoggedInUserContext);
  const doneModalRef = useRef();
  const {
    itemPurchase: itemPurchaseNoInvoice,
    setItemPurchase: setItemPurchaseNoInvoice,
  } = useContext(RepurchaseContext);

  const productIdList = [];
  const productPriceList = [];
  itemPurchase.map((item) => {
    productIdList.push(item.id);
    productPriceList.push(item.price);
  });
  const [customerInfor, setCustomerInfor] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
  });

  const sellOrderBody = {
    discountId,
    productId: [...productIdList],
    fullName: customerInfor.fullName,
    phoneNumber: customerInfor.phoneNumber,
    userId: userId,
    sellOrderStatus: "Chưa thanh toán",
    price: [...productPriceList],
  };

  const purchaseOrderBody = {
    ...customerInfor,
    userId,
    purchaseOrderStatus: "Chưa thanh toán",
    criteria: {
      diamondCriteriaResponseDTO: itemPurchaseNoInvoice
        .filter((item) => item.type === "diamond")
        .map((obj) => {
          return {
            ...obj.data,
          };
        }),

      goldCriteriaResponseDTO: itemPurchaseNoInvoice
        .filter((item) => item.type === "gold")
        .map((obj) => {
          return {
            weight: parseInt(obj.data.weight),
            ...obj.data,
          };
        }),
    },
  };

  async function handleSearchCustomerByPhone(phoneNumber) {
    if (phoneNumber.length === 10) {
      const res = await fetch(
        `http://64.227.1.44:8080/swp/api/customer/list?phoneNumber=${phoneNumber}`
      );
      const customerData = await res.json();
      if (customerData.length) {
        setCustomerInfor({
          address: customerData[0].address,
          fullName: customerData[0].fullName,
          phoneNumber: customerData[0].phoneNumber,
        });
      }
    }
  }

  function handleChange(customerAttribute, event) {
    setCustomerInfor((prevCustomerInfor) => {
      return {
        ...prevCustomerInfor,
        [customerAttribute]: event.target.value,
      };
    });
  }

  const URL = !isPurchase
    ? "http://mahika.foundation:8080/swp/api/sell-order/information"
    : "http://mahika.foundation:8080/swp/api/purchase-order/no-invoice";

  const REQ_BODY = !isPurchase ? sellOrderBody : purchaseOrderBody;

  function handleSubmit(event) {
    //prevent reload page
    event.preventDefault();
    console.log(REQ_BODY);
    //customer api from backend
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(REQ_BODY),
    })
      .then((res) => {
        isPurchase ? setItemPurchaseNoInvoice([]) : setItemPurchase([]);
        handleOpenDoneModal();
        return res.json();
      })
      .catch((er) => "");

    //reset customerInfor
    setCustomerInfor({
      fullName: "",
      address: "",
      phoneNumber: "",
    });

    handleHide();
  }

  function handleOpenDoneModal() {
    doneModalRef.current.showModal();
  }
  function handleCloseDoneModal() {
    doneModalRef.current.close();
  }

  return (
    <>
      <DoneModal ref={doneModalRef} handleClose={handleCloseDoneModal} />
      <dialog ref={ref} className={classes.container}>
        <p>Nhập thông tin khách hàng</p>
        <div className={classes["info-container"]}>
          <div>
            <label>Tên khách hàng</label>
            <input
              type="text"
              value={customerInfor.fullName}
              onChange={(event) => handleChange("fullName", event)}
              required
            />
          </div>
          <div>
            <label>Địa chỉ</label>
            <input
              type="text"
              value={customerInfor.address}
              onChange={(event) => handleChange("address", event)}
              required
            />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input
              type="text"
              value={customerInfor.phoneNumber}
              onChange={(event) => {
                handleChange("phoneNumber", event);
                handleSearchCustomerByPhone(event.target.value);
              }}
              required
            />
          </div>
          <form method="dialog">
            <button className={classes["save-button"]} onClick={handleSubmit}>
              <span>Lưu</span>
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
});

export default CustomerInputForm;
