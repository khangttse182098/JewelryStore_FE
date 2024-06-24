import { forwardRef, useState, useEffect } from "react";
import classes from "./CustomerModal.module.css";

const CustomerModal = forwardRef(
  ({ handleHide, customer, onChangeCustomer }, ref) => {
    const [customerInfor, setCustomerInfor] = useState({ ...customer });

    useEffect(() => {
      if (customer) {
        setCustomerInfor(customer);
        console.log(customerInfor);
      }
    }, [customer]);

    function handleSubmitCustomer() {
      fetch("http://mahika.foundation:8080/swp/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerInfor),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          onChangeCustomer(data);
        })
        .catch((err) => err);
      handleHide();
    }

    const handleChange = (event) => {
      const { name, value } = event.target;
      setCustomerInfor({ ...customerInfor, [name]: value });
    };

    return (
      <dialog ref={ref} className={classes.container}>
        <div className={classes.header}>
          <p className={classes.title}>Sửa thông tin khách hàng</p>
          <p className={classes.close} onClick={handleHide}>
            &times;
          </p>
        </div>
        <hr className={classes.hr} />
        <div className={classes["form-container"]}>
          <div className={classes["first-container"]}>
            <div className={classes["input-field"]}>
              <label>Tên khách hàng</label> <br />
              <input
                className={classes.box}
                placeholder="Nhập tên khách hàng"
                type="text"
                name="fullName"
                value={customerInfor.fullName}
                onChange={handleChange}
              />
            </div>
            <div className={classes["input-field"]}>
              <label>Số điện thoại</label> <br />
              <input
                className={classes.box}
                type="text"
                name="phoneNumber"
                value={customerInfor.phoneNumber}
                placeholder="Nhập số điện thoại"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes["second-container"]}>
            <div className={classes["input-field"]}>
              <label>Địa chỉ</label> <br />
              <input
                className={classes.box}
                type="text"
                name="address"
                value={customerInfor.address}
                placeholder="Nhập địa chỉ"
                onChange={handleChange}
              />
            </div>
            <div className={classes["radio-field"]}>
              <label>Giới tính</label> <br />
              <div className={classes.range}>
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={customerInfor.gender === "Nam"}
                  onChange={handleChange}
                />
                <label>Nam</label>
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={customerInfor.gender === "Nữ"}
                  onChange={handleChange}
                />
                <label>Nữ</label>
                <input
                  type="radio"
                  name="gender"
                  value="Giới tính khác"
                  checked={customerInfor.gender === "Giới tính khác"}
                  onChange={handleChange}
                />
                <label>Giới tính khác</label>
              </div>
            </div>
          </div>
          <form method="dialog">
            <div className={classes["position-button"]}>
              <button
                className={classes.button}
                type="button"
                onClick={handleSubmitCustomer}
              >
                <span>Lưu thông tin</span>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);

export default CustomerModal;
