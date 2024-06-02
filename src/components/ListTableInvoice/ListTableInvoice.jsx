import classes from "./ListTableInvoice.module.css";
import settingIcon from "/assets/setting.png";

const ListTableInvoice = () => {
  return (
    <div className={classes.container}>
      <div className={classes["infor-bar"]}>
        <button className={classes.button}>Tất cả</button>
        <button className={classes.button}>Đã thanh toán</button>
        <button className={classes.button}>Chưa thanh toán</button>
      </div>
      <hr />
      <div className={classes["search-container"]}>
        <input
          className={classes.search}
          type="search"
          placeholder="Tìm kiếm theo mã hóa đơn"
        />
      </div>
      <table>
        <tr>
          <th className={classes["table-header"]}>
            <img
              src={settingIcon}
              alt="Setting Icon"
              className={classes.settingIcon}
            />
            <input type="checkbox" />
          </th>
          <th>Mã hóa đơn</th>
          <th>Ngày tạo</th>
          <th>Khách hàng</th>
          <th>Loại hóa đơn</th>
          <th>Nhân viên bán hàng</th>
          <th>Thành tiền</th>
          <th>Trạng thái thanh toán</th>
        </tr>
        <tr>
          <td className={classes.checkbox}>
            <input type="checkbox" />
          </td>
          <td>INV301</td>
          <td>16/05/2024 17:51</td>
          <td>Hoàng Phúc</td>
          <td>Bán</td>
          <td>Hàng Nguyên Khoang</td>
          <td>23,000,000đ</td>
          <td>Đã thanh toán</td>
        </tr>
        <tr>
          <td className={classes.checkbox}>
            <input type="checkbox" />
          </td>
          <td>INV300</td>
          <td>15/05/2024 17:51</td>
          <td>Đức Minh</td>
          <td>Mua lại</td>
          <td>CissCo Trần</td>
          <td>18,000,000đ</td>
          <td>Chưa thanh toán</td>
        </tr>
        <tr>
          <td className={classes.checkbox}>
            <input type="checkbox" />
          </td>
          <td>INV299</td>
          <td>15/05/2024 17:51</td>
          <td>Trần Thái Yeah</td>
          <td>Mua lại</td>
          <td>Lâm Đình Pha</td>
          <td>20,000,000đ</td>
          <td>Chưa thanh toán</td>
        </tr>
      </table>
    </div>
  );
};

export default ListTableInvoice;
