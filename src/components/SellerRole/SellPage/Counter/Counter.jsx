import { useContext } from "react";
import classes from "./Counter.module.css";
import { ProductSelectionContext } from "../../../../context/ProductSelectionContext";

const Counter = ({ counter, onClick }) => {
  const { counterNo } = counter;
  const {
    counter: { selectedCounter, setSelectedCounter },
  } = useContext(ProductSelectionContext);
  function handleClick(e) {
    e.preventDefault();
    setSelectedCounter(counterNo);
    onClick();
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
