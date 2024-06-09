import { forwardRef, useContext, useState } from "react";
import classes from "./CusctomerInputForm.module.css";
import { ProductPurchaseContext } from "../../../../context/ProductPurchaseContext";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";

const CustomerInputForm = forwardRef(function CustomerInputForm(
  { handleHide },
  ref
) {
  const { itemPurchase } = useContext(ProductPurchaseContext);
  const { userId } = useContext(LoggedInUserContext);
  const productIdList = [];
  const productPriceList = [];
  itemPurchase.map((item, index) => {
    productIdList.push(item.id);
    productPriceList.push(item.price);
  });
  const [customerInfor, setCustomerInfor] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
  });

  const sellOrderBody = {
    productId: [...productIdList],
    fullName: customerInfor.fullName,
    phoneNumber: customerInfor.phoneNumber,
    userId: userId,
    sellOrderStatus: "Chưa thanh toán",
    price: [...productPriceList],
  };

  function handleChange(customerAttribute, event) {
    setCustomerInfor((prevCustomerInfor) => {
      return {
        ...prevCustomerInfor,
        [customerAttribute]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    //prevent reload page
    event.preventDefault();
    console.log(sellOrderBody);
    //customer api from backend
    fetch("http://mahika.foundation:8080/swp/api/sell-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sellOrderBody),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    //reset customerInfor
    setCustomerInfor({
      fullName: "",
      address: "",
      phoneNumber: "",
    });

    handleHide();
  }

  return (
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
            onChange={(event) => handleChange("phoneNumber", event)}
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
  );
});

export default CustomerInputForm;
