import SearchIcon from "./Vector.png";
import BarCode from "/assets/barcode.png";
import { useRef } from "react";
import ScanningPage from "../../ScanningPage/ScanningPage";
import classes from "./SearchProduct.module.css";

const SearchProduct = ({ placeholder, onChangeHandler }) => {
  const ScanningPageRef = useRef();
  const searchInputRef = useRef();

  function handleClick() {
    ScanningPageRef.current.showModal();
  }

  function handleHide() {
    ScanningPageRef.current.close();
  }

  // Function to set the input value and trigger the onChange event
  function setInputValue(value) {
    const input = searchInputRef.current;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(input, value);
    const event = new Event("input", { bubbles: true });
    input.dispatchEvent(event);
  }

  return (
    <>
      <ScanningPage
        ref={ScanningPageRef}
        handleHide={handleHide}
        setInputValue={setInputValue}
      />
      <div className={classes.container}>
        <img
          src={SearchIcon}
          alt="Search Icon"
          className={classes["search-icon"]}
        />
        <input
          ref={searchInputRef}
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
