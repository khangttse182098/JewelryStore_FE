import classes from "./SearchSellOrderCode.module.css";
import SearchIcon from "/assets/Vector.png";

const SearchSellOrderCode = ({ setSearchResult }) => {
  function handleChange(event) {
    setSearchResult(event.target.value);
    event.preventDefault();
  }

  return (
    <div className={classes.container}>
      <img
        src={SearchIcon}
        alt="Search Icon"
        className={`${classes["search-icon"]} ${classes.img}`}
      />
      <input
        type="search"
        placeholder="Nhập mã đơn hàng..."
        className={classes.search}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchSellOrderCode;
