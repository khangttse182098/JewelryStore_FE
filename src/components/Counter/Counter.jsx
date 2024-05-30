import classes from "./Counter.module.css";

const Counter = ({ counter }) => {
  const { counterNo } = counter;

  return (
    <div className={classes.counterItem}>
      <a href="#">Quầy {counterNo}</a>
    </div>
  );
};

export default Counter;
