import { useState } from "react";
import classes from "./CusctomerInputForm.module.css";

const CustomerInputForm = () => {
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
  }

  return (
    <div className={classes.container}>
      <p>Nhập thông tin khách hàng</p>
      <form>
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
        <button type="submit" onClick={handleSubmit}>
          Lưu
        </button>
      </form>
    </div>
  );
};

export default CustomerInputForm;
