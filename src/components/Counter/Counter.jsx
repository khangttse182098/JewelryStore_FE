import { useContext } from "react";
import classes from "./Counter.module.css";
import { ProductSelectionContext } from "../../context/ProductSelectionContext";

const Counter = ({ counter }) => {
  const { counterNo } = counter;
  const [{ selectedCounter, setSelectedCounter }] = useContext(
    ProductSelectionContext
  );
  function handleClick(e) {
    e.preventDefault();
    setSelectedCounter(counterNo);
  }
  return (
    <div className={classes.counterItem}>
      <a onClick={handleClick} href="#">
        Quầy {counterNo}
      </a>
    </div>
  );
};

export default Counter;
