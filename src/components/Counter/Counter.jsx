import classes from "./Counter.module.css";

const Counter = ({ counter }) => {
  const { counterId, counterNo, counterDescription } = counter;

  return (
    <div className={classes["dropdown-content"]}>
      <a href="#">Quay {counterNo}</a>
    </div>
  );
};

export default Counter;
