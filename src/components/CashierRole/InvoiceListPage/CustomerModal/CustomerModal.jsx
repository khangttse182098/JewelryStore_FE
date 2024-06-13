import { forwardRef } from "react";
import classes from "./CustomerModal.module.css";

const CustomerModal = forwardRef(({ handleHide, customer }, ref) => {
  const handleChange = (event) => {
    v = event.target.value;
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
              type="text"
              value={customer.fullName}
              placeholder="Nhập tên khách hàng"
            />
          </div>
          <div className={classes["input-field"]}>
            <label>Số điện thoại</label> <br />
            <input
              className={classes.box}
              type="text"
              value={customer.phoneNumber}
              placeholder="Nhập tên khách hàng"
            />
          </div>
        </div>
        <div className={classes["second-container"]}>
          <div className={classes["input-field"]}>
            <label>Địa chỉ</label> <br />
            <input
              className={classes.box}
              type="text"
              value={customer.address}
              placeholder="Nhập địa chỉ"
            />  
          </div>
          <div className={classes["radio-field"]}>
            <label>Giới tính</label> <br />
            <div className={classes.range}>
              <input type="radio" />
              <label>Nam</label>
              <input type="radio" />
              <label>Nữ</label>
              <input type="radio" />
              <label>Giới tính khác</label>
            </div>
          </div>
        </div>
        <form method="dialog">
          <div className={classes["position-button"]}>
            <button className={classes.button}>
              <span>Lưu thông tin</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default CustomerModal;
