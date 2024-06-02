import { forwardRef, useState } from "react";
import classes from "./CusctomerInputForm.module.css";

const CustomerInputForm = forwardRef(function CustomerInputForm(
  { handleHide },
  ref
) {
  const [customerInfor, setCustomerInfor] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

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
    //customer api from backend (implement later)
    // fetch("http://localhost:5000/customer", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(customerInfor),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    //reset customerInfor
    setCustomerInfor({
      name: "",
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
            value={customerInfor.name}
            onChange={(event) => handleChange("name", event)}
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
