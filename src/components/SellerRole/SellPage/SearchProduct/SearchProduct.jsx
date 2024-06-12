/* eslint-disable react/prop-types */
import classes from "./SearchProduct.module.css";
import SearchIcon from "./Vector.png";
import BarCode from "/assets/barcode.png";
import { useRef } from "react";
import ScanningPage from "../../ScanningPage/ScanningPage";

const SearchProduct = ({ placeholder, onChangeHandler }) => {
  const ScanningPageRef = useRef();
  function handleClick() {
    ScanningPageRef.current.showModal();
  }

  function hanleHide() {
    ScanningPageRef.current.close();
  }

  return (
    <>
      <ScanningPage ref={ScanningPageRef} hanleHide={hanleHide} />
      <div className={classes.container}>
        <img
          src={SearchIcon}
          alt="Search Icon"
          className={classes["search-icon"]}
        />
        <input
          className={classes["search-box"]}
          type="search"
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
        <img
          src={BarCode}
          alt="Bar Code Scanner"
          className={classes["barcode-scanner"]}
          onClick={handleClick}
        />
      </div>
    </>
  );
};

export default SearchProduct;
