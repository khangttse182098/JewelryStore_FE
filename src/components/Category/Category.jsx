import { useState } from "react";

const Category = () => {
  return (
    <div className={classes.container}>
      <div className={classes["left-container"]}>
        <h2>Mua lại sản phẩm</h2>
        <div className={classes.frame}>
          <p>Vàng</p>
        </div>
        <div className={classes["gold-weight"]}>
          <p>Khối lượng</p>
          <input
            className={classes["input-field"]}
            placeholder="Nhập khối lượng vàng.."
            type="text"
          />
        </div>
        <div className={classes["gold-type"]}>
          <p>Loại vàng</p>
          <div className={classes["dropdown-button"]}>
            <button className={classes.dropbtn}>
              <p className={classes.text}>Chọn loại vàng</p>
              <img src={arrowDown} alt="Arrow Down" className={classes.icon} />
            </button>
            <div className={classes["dropdown-content"]}>
              <a href="#">Vàng Trắng 14k</a>
              <a href="#">Vàng Trắng Ý 14k</a>
              <a href="#">Vàng Trắng 18k</a>
              <a href="#">Vàng Trắng Ý 18k</a>
              <a href="#">Vàng Hồng</a>
            </div>
          </div>
        </div>

        <button className={classes["add-goldInvoice"]}>Thêm vào hóa đơn</button>
        <div className={classes.frame}>
          <p>Kim cương</p>
        </div>
        <div className={classes.origin}>
          <p>Nguồn gốc</p>
          <input
            className={classes["input-field"]}
            placeholder="Nhập nguồn gốc.."
            type="text"
          />
        </div>
        <div className={classes.cut}>
          <p>Độ cắt</p>
          <input
            className={classes["input-field"]}
            placeholder="Nhập độ cắt.."
            type="text"
          />
        </div>
        <div className={classes["color-dmd"]}>
          <p>Màu sắc</p>
          <input
            className={classes["input-field"]}
            placeholder="Nhập màu sắc.."
            type="text"
          />
        </div>
        <div className={classes["carat-weight"]}>
          <p>Khối lượng</p>
          <input
            className={classes["input-field"]}
            placeholder="Nhập khối lượng vàng.."
            type="text"
          />
        </div>
        <div className={classes.clarity}>
          <p>Khối lượng</p>
          <input
            className={classes["input-field"]}
            placeholder="Nhập độ trong suốt.."
            type="text"
          />
        </div>
        <button className={classes["add-diamondInvoice"]}>
          Thêm vào hóa đơn
        </button>
        <hr className={classes.hrLine} />
      </div>
      <div className={classes["right-container"]}>
        <div className={classes.frame}>
          <p>Tổng tiền</p>
        </div>
        <div className={classes.frame}>
          <p>Ưu đãi</p>
        </div>
        <div className={classes.frame}>
          <p>Số tiền phải trả</p>
        </div>
        <button className={classes.createInvoice}>TẠO HÓA ĐƠN</button>
      </div>
    </div>
  );
};

export default Category;
