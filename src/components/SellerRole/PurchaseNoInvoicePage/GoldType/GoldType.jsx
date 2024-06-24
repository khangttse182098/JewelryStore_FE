import classes from "./GoldType.module.css";

const GoldType = ({ type, onClick }) => {
  const { id, name } = type;

  return (
    <div className={classes.goldType} onClick={() => onClick(name)}>
      <span role="button">{name}</span>
    </div>
  );
};

export default GoldType;
