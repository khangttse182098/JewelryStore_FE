import classes from "./InformationBar.module.css";

const InformationBar = () => {
  return (
    <div>
      <div className={classes.frame}>
        <p>Tổng số lượng</p>
        <p>2</p>
      </div>
      <div className={classes.frame}>
        <p>Tổng tiền</p>
        <p>177.617.000đ</p>
      </div>
      <div className={classes.frame}>
        <p>Giảm giá</p>
        <p>-17.761.700đ</p>
      </div>
      <div className={classes.frame}>
        <p className={classes.total}>Thanh toán</p>
        <p className={classes.total}>159.855.300đ</p>
      </div>
      <button className={classes.createInvoice}>TẠO HÓA ĐƠN</button>
    </div>
  );
};

export default InformationBar;
