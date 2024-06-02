import classes from "./SearchSellOrderCode.module.css";
import SearchIcon from "/assets/Vector.png";

const SearchSellOrderCode = () => {
  return (
    <div className={classes.container}>
      <img
        src={SearchIcon}
        alt="Search Icon"
        className={classes["search-icon"]}
      />
      <input
        type="search"
        placeholder="Nhập mã đơn hàng..."
        className={classes.search}
      />
    </div>
  );
};

export default SearchSellOrderCode;
